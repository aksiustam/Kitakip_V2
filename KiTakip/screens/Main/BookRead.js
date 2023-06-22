import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
function Inner() {
  const route = useRoute();
  const book = route.params;
  const { width, height } = useWindowDimensions();
  const [page, setPage] = useState();
  const [font, setFont] = useState("16px");
  const { changeFontSize, getCurrentLocation } = useReader();

  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };

  //#region Page Load

  const Pageupcount = async () => {
    const cfi = getCurrentLocation();

    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  const Pagedowncount = async () => {
    const cfi = getCurrentLocation();

    await AsyncStorage.setItem(
      `@BookData&${book.id}`,
      JSON.stringify(cfi.start.cfi)
    );
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const loadcfi = await AsyncStorage.getItem(`@BookData&${book.id}`);
        const loadfont = await AsyncStorage.getItem(`@FontSize`);

        setFont(loadfont);
        setPage(JSON.parse(loadcfi));
      } catch (error) {
        console.error("Error loading counter from AsyncStorage:", error);
      }
    };
    loadPage();
  }, []);
  //#endregion

  return (
    <>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.topbartext}
          >
            {book.name}{" "}
          </Text>
        </View>
        <TouchableOpacity style={styles.menubox} onPress={menubar}>
          <Feather name="menu" size={50} color="#0B4455" />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <Reader
          src={WEB_URL + `/api/Book/Download/${book.id}.epub`}
          width={width}
          height={height * 0.93}
          fileSystem={useFileSystem}
          onSwipeLeft={Pageupcount}
          onSwipeRight={Pagedowncount}
          initialLocation={page}
          onReady={() => changeFontSize(font)}
        />
      </SafeAreaView>
    </>
  );
}

const BookRead = () => {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
};

export default BookRead;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -5,
  },
  header: { paddingTop: Dimensions.get("window").height * 0.08 },
  topbar: {
    position: "absolute",
    backgroundColor: "#0B4455",
    marginTop: 44,
    width: Dimensions.get("window").width * 0.76,
    height: Dimensions.get("window").height * 0.066,
    paddingLeft: 10,
    justifyContent: "center",
  },
  topbartext: { fontSize: 24, color: "yellow", fontWeight: "600" },
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
