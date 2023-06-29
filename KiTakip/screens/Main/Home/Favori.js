import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/Auth";
import axios from "axios";
import { API_URL } from "../../../constants/Settings";
const Favori = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  const auth = useAuth();

  const [userbook, setUserBook] = useState([]);

  useEffect(() => {
    getUserBooks();
  }, []);

  const getUserBooks = async () => {
    await axios
      .get(API_URL + `/api/UserBook/${auth.authData.id}`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setUserBook(response.data);
        }
      })
      .catch((err) => console.log("Hata " + err));
  };

  const imageSources = [
    require("../../../assets/Book/image1.png"),
    require("../../../assets/Book/image4.png"),
    require("../../../assets/Book/image2.png"),
    require("../../../assets/Book/image3.png"),
  ];

  const onClick = (index) => {
    navigation.navigate("BookRead", userbook[index].book);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={styles.topbar}>
          <Text style={styles.topbartext}>FAVORİLERİM</Text>
        </View>
        <TouchableOpacity style={styles.menubox} onPress={menubar}>
          <Feather name="menu" size={50} color="white" />
        </TouchableOpacity>

        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{
              flexGrow: 1,
              flexWrap: "wrap",
              width: "100%",
              marginTop: 130,
              marginLeft: 20,
            }}
          >
            {userbook.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => onClick(index)} key={index}>
                  <Image
                    source={imageSources[index]}
                    style={{
                      width: 100,
                      height: 120,
                      marginVertical: 5,
                      marginHorizontal: 3,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Favori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 25,
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
});
