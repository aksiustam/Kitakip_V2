import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../contexts/Auth";
import InputBox from "../../components/InputBox/Index";

const Register = () => {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  const register = async () => {
    isLoading(true);
    const data = await auth.register(name, email, pass);
    setError(data);
    isLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <InputBox
        placeholder={"Adınızı giriniz."}
        buttonText={name}
        onPress={setName}
      />
      <InputBox
        placeholder={"Email giriniz."}
        buttonText={email}
        onPress={setEmail}
      />
      <InputBox
        placeholder={"Şifre giriniz."}
        buttonText={pass}
        onPress={setPass}
      />
      {loading ? (
        <ActivityIndicator color={"#000"} animating={true} size="small" />
      ) : (
        <Button title="Register" onPress={register} />
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
