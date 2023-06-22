import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Favori from "../screens/Main/Home/Favori.js";
import Ayarlar from "../screens/Main/Home/Ayarlar.js";
import Bagis from "../screens/Main/Home/Bagis.js";
import DersSohbet from "../screens/Main/Home/DersSohbet.js";
import Hikaye from "../screens/Main/Home/Hikaye.js";
import KisaSohbet from "../screens/Main/Home/KisaSohbet.js";
import Kitapİstek from "../screens/Main/Home/Kitapİstek.js";
import Kutuphane from "../screens/Main/Home/Kutuphane.js";
import OzelHayat from "../screens/Main/Home/OzelHayat.js";
import Profile from "../screens/Main/Home/Profile.js";
import Home from "../screens/Main/Home/Home.js";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export function MenuTabNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="Ayarlar" component={Ayarlar} />
      <Drawer.Screen name="Bagis" component={Bagis} />
      <Drawer.Screen name="DersSohbet" component={DersSohbet} />
      <Drawer.Screen name="Favori" component={Favori} />
      <Drawer.Screen name="Hikaye" component={Hikaye} />
      <Drawer.Screen name="KisaSohbet" component={KisaSohbet} />
      <Drawer.Screen name="Kitapİstek" component={Kitapİstek} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Kutuphane" component={Kutuphane} />
      <Drawer.Screen name="OzelHayat" component={OzelHayat} />
    </Drawer.Navigator>
  );
}
