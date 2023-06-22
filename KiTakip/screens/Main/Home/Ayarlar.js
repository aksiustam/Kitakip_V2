import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Modal from "react-native-modal";

import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Ayarlar = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  const { width, height } = useWindowDimensions();
  const [font, setFont] = useState("10px");
  const [index, setIndex] = useState(0);
  const FontSize = async () => {
    if (index == 0) {
      setIndex(index + 1);
      await AsyncStorage.setItem(`@FontSize`, "10px");
      setFont("10px");
    } else if (index == 1) {
      setIndex(index + 1);
      await AsyncStorage.setItem(`@FontSize`, "16px");
      setFont("16px");
    } else if (index == 2) {
      setIndex(0);
      await AsyncStorage.setItem(`@FontSize`, "20px");
      setFont("20px");
    }
  };
  //#region DATE

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      display: "default",
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  //#endregion

  const [isModalVisible, setModalVisible] = useState(false);

  //#region Notification

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //#endregion

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={{ paddingTop: 140 }}>
          <View style={styles.topbar}>
            <Text style={styles.topbartext}>AYARLAR</Text>
          </View>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.menucontainer}>
              <Text style={styles.menutext}>Bildirimler</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={FontSize}>
            <View style={styles.menucontainer}>
              <Text style={styles.menutext}>Yazı Boyutu = {font}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menucontainer}>
              <Text style={styles.menutext}>Ses Ayarları</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.35}
        style={{ margin: 0 }}
        statusBarTranslucent
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        deviceWidth={width}
        deviceHeight={height * 2}
      >
        <View style={styles.modalcontainer}>
          <Text style={{ textAlign: "center" }}>HATIRLATICI!</Text>
          <Button onPress={showDatepicker} title="Tarih" />
          <Button onPress={showTimepicker} title="Saat" />

          <Text>{date.toLocaleString()} a Bildirim Oluştur</Text>
          <Button
            title="Bildirim Oluştur"
            onPress={async () => {
              setModalVisible(false);
              await schedulePushNotification();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Kolay Okuma",
      body: "Kitap okuma zamanınız geldi",
    },
    trigger: { seconds: 3 },
  });
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default Ayarlar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalcontainer: {
    width: 220,
    height: 280,
    backgroundColor: "white",
    position: "relative",
    alignSelf: "center",
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "column",
    borderRadius: 30,
  },

  //#region MENU
  menucontainer: {
    width: 300,
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
  },
  menutext: { color: "#005259", fontSize: 24 },
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 45,
    borderBottomEndRadius: 50,
  },
  topbartext: { fontSize: 36, color: "#005259", fontWeight: "600" },
  menubox: {
    position: "absolute",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  //#endregion
});
