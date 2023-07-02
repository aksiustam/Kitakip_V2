import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BookRead from "../screens/Main/BookRead.js";

const Stack = createStackNavigator();

export const MenuTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BookRead" component={BookRead} />
    </Stack.Navigator>
  );
};
