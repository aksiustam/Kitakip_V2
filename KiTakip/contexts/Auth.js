import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants/Settings";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
const AuthContext = createContext({
  authData: undefined,
  notiData: undefined,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState("");
  const [notiData, setNotiData] = useState("");

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.

    loadStorageData();
    loadNotiData();
    loadNotification();
  }, []);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //loading finished
      setLoading(false);
    }
  }
  async function loadNotiData() {
    try {
      //Try get the data from Async Storage
      const notiDataSerialized = await AsyncStorage.getItem("@Bildirim");
      if (notiDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _notiData = JSON.parse(notiDataSerialized);
        setNotiData(_notiData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //loading finished
      setLoading(false);
    }
  }
  async function loadNotification() {
    console.log("Notifi içinde " + notiData.send);

    if (!notiData.send) {
      const selectedDateTime = new Date(notiData.date);
      const Hour = selectedDateTime.getHours();
      const Minute = selectedDateTime.getMinutes();
      setNotiData({
        date: notiData.date,
        page: notiData.page,
        send: true,
      });
      await schedulePushNotification(Hour, Minute, notiData.page).then(
        AsyncStorage.setItem("@Bildirim", JSON.stringify(notiData))
      );
    }
  }
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (response) => {
        setNotification(response);
        setNotiData({
          date: notiData.date,
          page: notiData.page,
          send: false,
        });
        console.log("Send = false");
        await AsyncStorage.setItem("@Bildirim", JSON.stringify(notiData));
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

  const signIn = async (date, page) => {
    setNotiData({
      date: date,
      page: page,
      send: true,
    });
    const selectedDateTime = new Date(notiData.date);
    const Hour = selectedDateTime.getHours();
    const Minute = selectedDateTime.getMinutes();
    await schedulePushNotification(Hour, Minute, notiData.page).then(
      AsyncStorage.setItem("@Bildirim", JSON.stringify(notiData))
    );

    const formData = {
      name: Device.deviceName,
      deviceId: expoPushToken,
    };
    await axios
      .post(API_URL + "/api/User/UserLogin", formData)
      .then((response) => {
        const data = response.data;

        setAuthData({
          id: data,
          name: Device.deviceName,
          token: expoPushToken,
        });
        AsyncStorage.setItem(
          "@AuthData",
          JSON.stringify({
            id: data,
            name: Device.deviceName,
            token: expoPushToken,
          })
        );
      })
      .catch((err) => console.log("Hata" + err));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    await AsyncStorage.removeItem("@AuthData");
  };

  async function schedulePushNotification(hour, min, page) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Kolay Okuma",
        body: `Kitap Okuma Vakti.${page} Sayfanız Hazır.Hemen Okuyun`,
      },
      trigger: { hour: hour, minute: min, repeats: true },
    })
      .then(
        setNotiData({
          date: notiData.date,
          page: notiData.page,
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

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{ authData, notiData, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
