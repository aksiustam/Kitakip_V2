import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Bagis = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Bagıs!</Text>
      </View>
    </View>
  );
};

export default Bagis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
