import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useAuth } from "../../contexts/Auth";
import Modal from "react-native-modal";
const Favori = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      <Text>Favoriler : {auth.authData?.name}</Text>
    </View>
  );
};

export default Favori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
