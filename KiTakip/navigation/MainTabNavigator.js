import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetail from "../screens/Main/BookDetail.js";
import ModalMenu from "../components/Modal/index.js";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { HomeTabNavigator } from "./HomeTabNavigator.js";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/Auth.js";
import BookRead from "../screens/Main/BookRead.js";

const Stack = createStackNavigator();
const modalStack = createStackNavigator();

export const MainTabNavigator = () => {
  return (
    <modalStack.Navigator
      presentation="Modal"
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
    >
      <modalStack.Screen name="MyModal" component={ModalScreen} />
      <modalStack.Screen name="Root" component={RootNavigator} />
    </modalStack.Navigator>
  );
};

function ModalScreen() {
  return <ModalMenu />;
}

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "500",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          title: "KiTakip",
          headerRight: () => {
            const auth = useAuth();
            const signOut = () => {
              auth.signOut();
            };
            return (
              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                <TouchableOpacity onPress={signOut}>
                  <Ionicons name="exit-outline" size={24} color="white" />
                </TouchableOpacity>
              </SafeAreaView>
            );
          },
        }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetail}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <SafeAreaView
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text>BookDetail</Text>
            </SafeAreaView>
          ),
        })}
      />
      <Stack.Screen
        name="BookRead"
        component={BookRead}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <SafeAreaView
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text>Book Read</Text>
            </SafeAreaView>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
