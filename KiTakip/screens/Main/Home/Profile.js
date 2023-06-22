import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/Auth";

const Profile = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={styles.header}>
          <View style={styles.topbar}>
            <Text style={styles.topbartext}>PROFİLİM </Text>
          </View>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.upbox}>
          <View style={styles.circle}>
            <MaterialIcons name="add-photo-alternate" size={50} color="black" />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 12 }}>
            <Text style={{ fontSize: 36, color: "white" }}>
              {auth.authData.name}
            </Text>
          </View>
        </View>
        <View style={styles.downbox}>
          <Text style={{ marginTop: 10, fontSize: 30, color: "black" }}>
            BİLGİLERİM
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <View
              style={{
                marginRight: 30,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                Okunan Sayfa
              </Text>
              <Text style={{ fontSize: 20 }}>1327</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                Okunan Kitap
              </Text>
              <Text style={{ fontSize: 20 }}>3</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <View
              style={{
                marginRight: 30,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                Düzenli Okuma
              </Text>
              <Text style={{ fontSize: 20 }}>%89</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                Gelişme Oranı
              </Text>
              <Text style={{ fontSize: 20 }}>%93</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>
                Genel Oran
              </Text>
              <Text style={{ fontSize: 20 }}>%91</Text>
            </View>
          </View>
          <View
            style={{
              padding: 12,
              borderWidth: 1.3,
              borderColor: "black",
              backgroundColor: "#0E756C",
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              Hata, İstek veya Şikayet İçin;
            </Text>
          </View>
          <View
            style={{
              padding: 13,
              backgroundColor: "#0E756C",
              borderWidth: 1.3,
              borderColor: "black",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Tıklayınız</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  upbox: {
    height: 150,
    flexDirection: "row",
  },
  circle: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    marginLeft: 30,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "black",
  },
  downbox: {
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "gray",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  header: { paddingTop: 140 },
  topbar: {
    position: "absolute",
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 25,
    borderBottomEndRadius: 50,
  },
  topbartext: { fontSize: 36, color: "#005259", fontWeight: "600" },
  menubox: {
    position: "absolute",
    zIndex: 5,
    top: Dimensions.get("window").height * 0.06,
    left: Dimensions.get("window").width * 0.81,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
