import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo/logo.png")} />
      <View style={{ marginTop: 30 }}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textbig}>
          Kolay Okuma
        </Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textsmall}>
          UYGULAMASI
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  textbig: { fontSize: 36, color: "white", fontWeight: "bold" },
  textsmall: {
    position: "relative",
    transform: [{ translateX: 102 }, { translateY: -10 }],
    letterSpacing: 3,
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
});

export default Page;
