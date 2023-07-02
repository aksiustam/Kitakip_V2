import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { WEB_URL } from "../../constants/Settings";
import { Video, ResizeMode } from "expo-av";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPage = (props) => {
  const route = useRoute();
  const video = route.params;
  const videoRef = useRef();
  const navigation = useNavigation();
  const [play, setPlay] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      setPlay(true);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setPlay(false);
    }
  }, [isFocused]);

  return (
    <Video
      ref={videoRef}
      useNativeControls
      style={{ flex: 1 }}
      source={{
        uri: `${WEB_URL}/UploadedFiles/Video/Ders/${video.videoUrl}`,
        //uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      }}
      resizeMode={ResizeMode.COVER}
      isLooping={false}
      shouldPlay={play}

      //onLoadStart={() => video.current.playAsync()}
    />
  );
};

export default VideoPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
