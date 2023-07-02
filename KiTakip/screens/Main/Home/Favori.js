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

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/Auth";
import axios from "axios";
import { WEB_URL, API_URL } from "../../../constants/Settings";
const Favori = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  const auth = useAuth();
  const isFocused = useIsFocused();
  const [userbook, setUserBook] = useState([]);

  useEffect(() => {
    getUserBooks();
  }, []);
  useEffect(() => {
    if (isFocused) {
      getUserBooks();
    }
  }, [isFocused]);

  const getUserBooks = async () => {
    await axios
      .get(API_URL + `/api/UserBook/${auth.authData.id}`)
      .then((response) => {
        setUserBook(response.data);
      })
      .catch((err) => console.log("Hata " + err));
  };

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
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.topbartext}
          >
            FAVORİLERİM
          </Text>
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
                <View key={index} style={styles.view}>
                  <TouchableOpacity onPress={() => onClick(index)}>
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
                          uri: `${WEB_URL}/uploadedfiles/Image/${item.book.photoUrl}`,
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
