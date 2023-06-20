import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import WEB_URL from "../constants/Settings";

const AuthContext = createContext({
  authData: undefined,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
  register: async () => {},
});

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState("");
  const [error, setError] = useState("Error");
  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
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

  const signIn = async (email, pass) => {
    if (email === null || email === "") return "Email boş olamaz";

    if (pass === null || pass === "") return "Password boş olamaz";

    const formData = {
      email: email,
      pass: pass,
    };

    await axios
      .post(WEB_URL + "/api/User/Login", formData)
      .then((response) => {
        const data = response.data;
        setAuthData({
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token,
        });
        AsyncStorage.setItem("@AuthData", JSON.stringify(data));
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

  const register = async (name, email, pass) => {
    if (name === null || name === "") return "Ad boş olamaz";

    if (email === null || email === "") return "Email boş olamaz";

    if (pass === null || pass === "") return "Password boş olamaz";

    const formData = {
      name: name,
      email: email,
      pass: pass,
    };

    await axios
      .post(WEB_URL + "/api/User", formData)
      .then((response) => {
        const data = response.data;
        setError(data);
      })
      .catch((error) => {
        const err = error.response.data;
        setError(err);
      });

    return "Mesaj : " + error;
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{ authData, loading, signIn, signOut, register }}
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
