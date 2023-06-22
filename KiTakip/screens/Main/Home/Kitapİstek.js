import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Kitapİstek = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Kitapİstek!</Text>
      </View>
    </View>
  );
};

export default Kitapİstek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
