import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, reset } from "@react-navigation/native";
import { useAuth } from "../../../contexts/Auth";

import Colors from "../../../constants/Colors";

const Home = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const navigateto = (location) => {
    switch (location) {
      case "ayarlar":
        navigation.navigate("Ayarlar");
        break;
      case "bagis":
        navigation.navigate("Bagis");
        break;
      case "derssohbet":
        navigation.navigate("DersSohbet");
        break;
      case "favori":
        navigation.navigate("Favori");
        break;
      case "hikaye":
        navigation.navigate("Hikaye");
        break;
      case "kisasohbet":
        navigation.navigate("KisaSohbet");
        break;
      case "kitapistek":
        navigation.navigate("Kitapİstek");
        break;
      case "kutuphane":
        navigation.navigate("Kutuphane");
        break;
      case "ozelhayat":
        navigation.navigate("OzelHayat");
        break;
      case "profile":
        navigation.navigate("Profile");
        break;
    }
  };

  const logOut = () => {
    auth.signOut();
  };

  return (
    <>
      <TouchableOpacity style={styles.exitbox} onPress={logOut}>
        <Feather name="x" size={50} color={Colors.light.tint} />
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("favori")}
          >
            <Image
              source={require("../../../assets/Icon/star.png")}
              style={styles.image}
            />
            <Text style={styles.text}>FAVORİLERİM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("profile")}
          >
            <Image
              source={require("../../../assets/Icon/profile.png")}
              style={styles.image}
            />
            <Text style={styles.text}>PROFİLİM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("kutuphane")}
          >
            <Image
              source={require("../../../assets/Icon/bookshelf.png")}
              style={styles.image}
            />
            <Text style={styles.text}>KÜTÜPHANE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("kitapistek")}
          >
            <Image
              source={require("../../../assets/Icon/openbook.png")}
              style={styles.image}
            />
            <Text style={styles.text}>KİTAP İSTEĞİ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("bagis")}
          >
            <Image
              source={require("../../../assets/Icon/destek.png")}
              style={styles.image}
            />
            <Text style={styles.text}>BAĞIŞ YAP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("ozelhayat")}
          >
            <Image
              source={require("../../../assets/Icon/ozel.png")}
              style={styles.image}
            />
            <Text style={styles.text}>ÖZEL HAYATLAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("kisasohbet")}
          >
            <Image
              source={require("../../../assets/Icon/video.png")}
              style={styles.image}
            />
            <Text style={styles.text}>KISA SOHBETLER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("derssohbet")}
          >
            <Image
              source={require("../../../assets/Icon/ders.png")}
              style={styles.image}
            />
            <Text style={styles.text}>DERS SOHBETLERİ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("hikaye")}
          >
            <Image
              source={require("../../../assets/Icon/hikaye.png")}
              style={styles.image}
            />
            <Text style={styles.text}>HİKAYE İÇİN İNDİR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateto("ayarlar")}
          >
            <Image
              source={require("../../../assets/Icon/settings.png")}
              style={styles.image}
            />
            <Text style={styles.text}>AYARLAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowcontainer: {
    flexDirection: "row",
  },
  text: {
    marginTop: 10,
    color: "#FBE116",
    fontFamily: "sans-serif-condensed",
    fontSize: 12,
  },
  image: {
    width: 55,
    height: 55,
  },
  exitbox: {
    position: "relative",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 15,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
});
