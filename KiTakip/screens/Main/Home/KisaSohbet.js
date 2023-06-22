import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
const KisaSohbet = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      pauseVideo();
    });

    return unsubscribe;
  }, [navigation]);

  const playVideo = () => {
    if (play) {
      video.current.pauseAsync();
      setPlay(false);
    } else {
      video.current.playAsync();
      setPlay(true);
    }
  };
  const pauseVideo = () => {
    if (video) {
      video.current.pauseAsync();
      setPlay(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={playVideo}>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>

          <Video
            ref={video}
            style={styles.video}
            source={require("../../../assets/Video/EnderGençlikvideo1.mp4")}
            resizeMode={ResizeMode.COVER}
            isLooping={true}
            shouldPlay={true}
            //onLoadStart={() => video.current.playAsync()}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default KisaSohbet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    flexGrow: 1,
    maxHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
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
