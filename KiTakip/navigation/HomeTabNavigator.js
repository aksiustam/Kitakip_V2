import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Main/Home.js";
import Favori from "../screens/Main/Favori.js";
import UserBooks from "../screens/Main/UserBooks.js";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors.js";

const Stack = createMaterialTopTabNavigator();

export const HomeTabNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home Screen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
          padding: 7,
          showIcon: true,
        },
      }}
    >
      <Stack.Screen
        name="Favori Screen"
        component={Favori}
        options={{
          tabBarIcon: () => <FontAwesome name="star" size={24} color="white" />,
          tabBarLabel: () => null,
        }}
      />
      <Stack.Screen
        name="Home Screen"
        component={Home}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="search" size={24} color="white" />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Stack.Screen
        name="UserBooks Screen"
        component={UserBooks}
        options={{
          tabBarIcon: () => <AntDesign name="book" size={24} color="white" />,
          tabBarLabel: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
