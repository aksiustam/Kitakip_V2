import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { WEB_URL, API_URL } from "../../../constants/Settings";
import axios from "axios";
const KisaSohbet = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };
  const videoRef = useRef([]);
  const [videodata, setVideoData] = useState([]);

  const [play, setPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      pauseVideo();
    }
  }, [isFocused]);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const height = Dimensions.get("window").height * 1.1;
    const index = Math.round(contentOffsetY / height);
    setCurrentIndex(index);
  };

  const handleScrollEnd = () => {
    const newIndex = currentIndex;
    if (newIndex < videodata.length) {
      scrollViewRef.current.scrollTo({
        y: newIndex * (Dimensions.get("window").height * 1.1),
      });
    }
  };

  const getVideos = async () => {
    await axios
      .get(API_URL + "/api/Video/Kisa")
      .then((response) => {
        const data = response.data;

        setVideoData(data);
      })
      .catch((err) => console.log("Hata " + err));
  };

  const playVideo = () => {
    if (play) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };
  const pauseVideo = () => {
    setPlay(false);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.menubox} onPress={menubar}>
          <Feather name="menu" size={50} color="white" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          vertical
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {videodata.map((mapvideo, index) => (
            <View key={index} style={styles.videoContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={playVideo}
                style={{ flex: 1 }}
              >
                <Video
                  ref={(ref) => {
                    videoRef[index] == ref;
                  }}
                  style={styles.video}
                  source={{
                    uri: `${WEB_URL}/UploadedFiles/Video/Kisa/${mapvideo.videoUrl}`,
                  }}
                  resizeMode={ResizeMode.COVER}
                  isLooping={true}
                  onLoadStart={() => setPlay(true)}
                  shouldPlay={index === currentIndex && play}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  videoContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 1.1,
  },
  video: {
    flex: 1,
    /* alignSelf: "center",
    flexGrow: 1,
    maxHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width, */
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
