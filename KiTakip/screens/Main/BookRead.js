import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  Button,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import { dark } from "../../constants/ReaderTheme/Dark";
import { light } from "../../constants/ReaderTheme/Light";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Inner() {
  const route = useRoute();
  const book = route.params;
  const { width, height } = useWindowDimensions();
  const [page, setPage] = useState();
  const [font, setFont] = useState(0);
  const [theme, setTheme] = useState(0);
  const { changeFontSize, getCurrentLocation, changeTheme } = useReader();

  //#region Page Load

  const Pageupcount = async () => {
    const cfi = getCurrentLocation();

    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  const Pagedowncount = async () => {
    const cfi = getCurrentLocation();

    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const loadcfi = await AsyncStorage.getItem(`@BookData&${book.id}`);
        setPage(JSON.parse(loadcfi));
      } catch (error) {
        console.error("Error loading counter from AsyncStorage:", error);
      }
    };
    loadPage();
  }, []);
  //#endregion

  const FontSize = () => {
    if (font == 0) {
      changeFontSize("10px");
      setFont(font + 1);
    } else if (font == 1) {
      changeFontSize("16px");
      setFont(font + 1);
    } else if (font == 2) {
      changeFontSize("20px");
      setFont(font + 1);
    } else if (font == 3) {
      changeFontSize("10px");
      setFont(0);
    }
  };

  const Theme = () => {
    if (theme == 0) {
      changeTheme(dark);
      setTheme(theme + 1);
    } else {
      changeTheme(light);
      setTheme(0);
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
      display: "spinner",
      mode: currentMode,
      is24Hour: true,
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
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View>
              <Feather name="save" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={FontSize}>
            <View>
              <AntDesign name="filetext1" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={Theme}>
            <View>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
        <Reader
          src={WEB_URL + `/api/Book/Download/${book.id}.epub`}
          width={width}
          height={height * 0.9}
          fileSystem={useFileSystem}
          onSwipeLeft={Pageupcount}
          onSwipeRight={Pagedowncount}
          initialLocation={page}
        />
      </SafeAreaView>
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
          <Text>Your expo push token: {expoPushToken}</Text>
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
    </>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "KiTakip Uygulaması",
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
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
const BookRead = () => {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
};

export default BookRead;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light.tint,
    justifyContent: "space-between",
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalcontainer: {
    width: 200,
    height: 260,
    backgroundColor: "white",
    position: "relative",
    alignSelf: "center",
    fontWeight: "bold",
    padding: 8,
    justifyContent: "space-between",
    flexDirection: "column",
  },
});
