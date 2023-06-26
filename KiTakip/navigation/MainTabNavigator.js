import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MenuTabNavigator } from "./MenuTabNavigator.js";
import BookRead from "../screens/Main/BookRead.js";

const Stack = createStackNavigator();

export const MainTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Root" component={MenuTabNavigator} />
      <Stack.Screen name="BookRead" component={BookRead} />
    </Stack.Navigator>
  );
};
