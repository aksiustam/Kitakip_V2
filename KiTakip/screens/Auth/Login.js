import React, { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";
import InputBox from "../../components/InputBox/Index";
import { useAuth } from "../../contexts/Auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState("a@gmail.com");
  const [pass, setPass] = useState("1234");
  const [error, setError] = useState("");
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    const data = await auth.signIn(email, pass);
    setError(data);
    isLoading(false);
  };
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("Register");
  return (
    <View style={styles.container}>
      <Text>{error}</Text>
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
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{ color: "blue", textDecorationLine: "underline", margin: 10 }}
        >
          Kayıt olmak için tıklayınız
        </Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator color={"#000"} animating={true} size="small" />
      ) : (
        <Button title="Sign In" onPress={signIn} />
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
