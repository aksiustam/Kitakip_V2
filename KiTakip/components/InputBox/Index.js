import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const InputBox = (props) => {
  const { onPress, buttonText, placeholder } = props;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          multiline={false}
          value={buttonText}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          InputProps={{ disableUnderline: true }}
          onChangeText={(text) => onPress(text)}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderColor: "transparent",
    flex: 1,
    marginHorizontal: 10,
  },
});

export default InputBox;
