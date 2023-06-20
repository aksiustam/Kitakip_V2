import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login.js";
import Register from "../screens/Auth/Register.js";

const Stack = createStackNavigator();

export const AuthTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "KiTakip",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "KiTakip",
        }}
      />
    </Stack.Navigator>
  );
};
