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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../constants/Settings";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import axios from "axios";

const DersSohbet = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };
  const [videodata, setVideoData] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    await axios
      .get(API_URL + "/api/Video/Ders")
      .then((response) => {
        const data = response.data;
        setVideoData(data);
      })
      .catch((err) => console.log("Hata " + err));
  };

  const gotoVideo = (index) => {
    navigation.navigate("VideoPage", videodata[index]);
  };

  const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={{ paddingTop: 130 }}>
          <View style={styles.topbar}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topbartext}
            >
              DERS VİDEOLARI
            </Text>
          </View>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerwrap}>
          {videodata.map((item, index) => {
            return (
              <View style={styles.box} key={index}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => gotoVideo(index)}
                >
                  <Image
                    source={require("../../../assets/Icon/video.png")}
                    style={styles.image}
                  />
                  <Text adjustsFontSizeToFit style={styles.text}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DersSohbet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  containerwrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    marginTop: 10,
    color: "#FBE116",
    fontFamily: "sans-serif-condensed",
    fontSize: 12,
    textAlign: "center",
  },
  image: {
    width: 55,
    height: 55,
  },
  box: {
    width: 100,
    height: 100,
    margin: 9,
    borderRadius: 15,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
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
  topbartext: { fontSize: 30, color: "#005259", fontWeight: "600" },
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
