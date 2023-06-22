import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../contexts/Auth";
import axios from "axios";
import BookBox from "../../../components/BookBox";
const Kutuphane = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  const auth = useAuth();

  const imageSources = [
    require("../../../assets/Book/image2.png"),
    require("../../../assets/Book/image4.png"),
    require("../../../assets/Book/image3.png"),
    require("../../../assets/Book/image1.png"),
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    await axios
      .get(WEB_URL + "/api/Book", {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setBooks(data);
      })
      .catch((err) => console.log("Hata " + err));
  };

  const gotoRead = async (id) => {
    await axios
      .post(
        WEB_URL + `/api/UserBook?UserId=${auth.authData.id}&BookId=${book.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          navigation.navigate("BookRead", books[id]);
        }
      })
      .catch((err) => console.log("Hata " + err));
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
        <View>
          <View style={styles.topbar}>
            <Text style={styles.topbartext}>KÜTÜPHANE</Text>
          </View>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
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
            {books.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => gotoRead(item.id)} key={index}>
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

export default Kutuphane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  header: { paddingTop: 140 },
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
