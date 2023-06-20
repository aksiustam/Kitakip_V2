import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import Modal from "react-native-modal";
const ModalMenu = (props) => {
  const { isVisibleFunc } = props;
  return (
    <Modal isVisible={isvisible}>
      <View>
        <Text>HEY</Text>
      </View>
    </Modal>
  );
};

export default ModalMenu;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    //backgroundColor: "#505050",

    position: "relative",
    alignSelf: "center",
    fontWeight: "bold",
    padding: 8,
  },
});
