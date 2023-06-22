import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Hikaye = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hikaye!</Text>
      </View>
    </View>
  );
};

export default Hikaye;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
