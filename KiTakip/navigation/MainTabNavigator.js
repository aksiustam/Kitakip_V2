import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BookDetail from "../screens/Main/BookDetail.js";
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
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
};
