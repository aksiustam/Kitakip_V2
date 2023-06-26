import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login.js";

const Stack = createStackNavigator();

export const AuthTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "KiTakip",
        }}
      />
    </Stack.Navigator>
  );
};
