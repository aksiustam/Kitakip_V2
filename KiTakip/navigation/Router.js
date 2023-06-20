import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useAuth } from "../contexts/Auth";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthTabNavigator } from "./AuthTabNavigator";

export const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {authData ? <MainTabNavigator /> : <AuthTabNavigator />}
    </NavigationContainer>
  );
};
