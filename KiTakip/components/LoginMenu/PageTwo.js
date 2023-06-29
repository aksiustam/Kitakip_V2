import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

const PageTwo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fixcontainer}>
        <View style={{ marginTop: 27 }}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textbig}>
            Kolay Okuma
          </Text>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textsmall}>
            UYGULAMASI
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.textdotup}>...</Text>
        <Text style={styles.textmid}>HOŞGELDİNİZ</Text>
        <Text style={styles.textdotdown}>...</Text>
      </View>
      <Image
        style={styles.image}
        source={require("../../assets/Logo/logo.png")}
      />
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
  textmid: { fontSize: 42, color: "white", fontFamily: "sans-serif-condensed" },
  textdotup: {
    fontSize: 62,
    color: "white",
    fontFamily: "sans-serif-condensed",
  },
  textdotdown: {
    fontSize: 62,
    color: "white",
    fontFamily: "sans-serif-condensed",
    transform: [{ translateY: -34 }],
  },
  image: {
    position: "absolute",
    bottom: 30,
    width: 200,
    height: 200,
  },
  fixcontainer: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width / 1.4,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  textbig: { fontSize: 36, color: "black", fontWeight: "bold" },
  textsmall: {
    position: "relative",
    transform: [{ translateX: 102 }, { translateY: -10 }],
    letterSpacing: 3,
    fontSize: 13,
    color: "#086D65",
    fontWeight: "bold",
  },
});

export default PageTwo;
