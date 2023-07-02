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
import { WEB_URL, API_URL } from "../../../constants/Settings";
import { useAuth } from "../../../contexts/Auth";
import axios from "axios";

const Kutuphane = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  const auth = useAuth();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    await axios
      .get(API_URL + "/api/Book")
      .then((response) => {
        const data = response.data;
        setBooks(data);
      })
      .catch((err) => console.log("Hata " + err));
  };

  const gotoRead = async (id) => {
    const formData = { userId: auth.authData.id, bookId: id, live: true };
    await axios
      .post(
        API_URL +
          `/api/UserBook?UserId=${auth.authData.id}&BookId=${books[id].id}`,
        formData
      )
      .then((response) => {
        if (response.status == 200) {
          navigation.navigate("BookRead", books[id]);
        }
      })
      .catch((err) => {
        if (err.response.status == 422) {
          navigation.navigate("BookRead", books[id]);
        } else console.log("Hata " + err);
      });
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
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topbartext}
            >
              KÜTÜPHANE
            </Text>
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
                <View key={index} style={styles.view}>
                  <TouchableOpacity onPress={() => gotoRead(index)}>
                    <View
                      style={{
                        width: 104,
                        height: 120,
                        justifyContent: "center",
                        alignItems: "stretch",
                      }}
                    >
                      <Image
                        source={{
                          uri: `${WEB_URL}/uploadedfiles/Image/${item.photoUrl}`,
                        }}
                        style={{
                          flex: 1,
                          flexGrow: 1,
                          resizeMode: "center",
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
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
  view: {
    height: 120,
    width: 100,
    justifyContent: "center",

    marginVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  header: { paddingTop: 140 },
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.4,
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
