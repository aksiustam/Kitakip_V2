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
  const [page, setPage] = useState(2);
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

  const PushNoti = async () => {
    await AsyncStorage.setItem(
      "@Bildirim",
      JSON.stringify({
        date: date.toString(),
        page: page,
        send: true,
      })
    );

    const currentDate = new Date();
    const selectedDateTime = new Date(date);
    const remainingMilliseconds =
      selectedDateTime.getTime() - currentDate.getTime();
    var remainingSeconds = Math.floor(remainingMilliseconds / 1000);
    if (remainingSeconds < 0) remainingSeconds += 86400;
    await schedulePushNotification(remainingSeconds, page);
  };
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
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topbartext}
            >
              AYARLAR
            </Text>
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
          <View style={styles.container}>
            <View style={styles.upcontainer}>
              <Text
                style={{ paddingBottom: 15, fontSize: 26, fontWeight: "bold" }}
              >
                SAAT
              </Text>
              <TouchableOpacity style={styles.box} onPress={showTimepicker}>
                <Text style={{ fontSize: 26 }}>
                  {date.getHours()}:{date.getMinutes()}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.upcontainer}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ paddingBottom: 15, fontSize: 26, fontWeight: "bold" }}
              >
                SAYFA SAYISI
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[
                    styles.box,
                    { backgroundColor: page === 2 ? "#086D65" : "white" },
                  ]}
                  onPress={() => setPage(2)}
                >
                  <Text style={{ fontSize: 26 }}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.box,
                    { backgroundColor: page === 3 ? "#086D65" : "white" },
                  ]}
                  onPress={() => setPage(3)}
                >
                  <Text style={{ fontSize: 26 }}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.box,
                    { backgroundColor: page === 5 ? "#086D65" : "white" },
                  ]}
                  onPress={() => setPage(5)}
                >
                  <Text style={{ fontSize: 26 }}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.box,
                    { backgroundColor: page === 10 ? "#086D65" : "white" },
                  ]}
                  onPress={() => setPage(10)}
                >
                  <Text style={{ fontSize: 26 }}>10</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Button
                title="Bildirim Oluştur"
                onPress={async () => {
                  setModalVisible(false);
                  await PushNoti();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

async function schedulePushNotification(time, page) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Kolay Okuma",
      body: `Kitap Okuma Vakti.${page} Sayfanız Hazır.Hemen Okuyun`,
    },
    trigger: { seconds: time },
  })
    .then(
      setNotData({
        date: notdata.date,
        page: notdata.page,
        send: true,
      })
    )
    .then(console.log("Notification send..."));
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
  upcontainer: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
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
    width: Dimensions.get("window").width / 1.4,
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
