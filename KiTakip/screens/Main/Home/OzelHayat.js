import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const OzelHayat = () => {
  const navigation = useNavigation();
  const menubar = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        <View style={styles.header}>
          <View style={styles.topbar}>
            <Text style={styles.topbartext}>ÖZEL HAYATLAR</Text>
          </View>
          <TouchableOpacity style={styles.menubox} onPress={menubar}>
            <Feather name="menu" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottombar}>
          <Text style={{ fontSize: 28, color: "white" }}>İMAM-I AZAM</Text>
          <Text style={{ fontSize: 16, color: "white" }}>
            İslâm’da hukukî düşüncenn ve cthad anlayışının gelşmesnde öneml payı
            olup daha çok Ebû Hanîfe veya İmâm-ı Âzam dye şöhret bulmuştur. Ebû
            Hanîfe onun künyes olarak zkredlyorsa da Hanîfe adında br kızının,
            hatta oğlu Hammâd’dan başka çocuğunun bulunmadığı blnmektedr. Bu
            şeklde anılması, Iraklılar arasında hanîfe denlen br tür dvt veya
            yazı hokkasını devamlı yanında taşıması veya hanîf kelmesnn sözlük
            anlamından hareketle haktan ve stkametten ayrılmayan br kmse
            olmasıyla zah edlmştr (İbn Hacer elHeytemî, s. 32). Buna göre “Ebû
            Hanîfe”y gerçek anlamda künye değl br lakap ve sıfat olarak kabul
            etmek gerekr. Onun öncülüğünde başlayan ve talebelernn gayretyle
            gelşp yaygınlaşan Irak fıkıh ekolü de mamın bu künyesne nsbetle
            “Hanefî mezheb” adını almıştır. “Büyük mam” anlamına gelen İmâm-ı
            Âzam sıfatının verlmes de çağdaşları arasında seçkn br yere sahp
            bulunması, hukukî düşünce ve cthad metodunda bell br çığır açması,
            dönemnden tbaren brçok fakhn onun görüşler ve metodu etrafında
            kümelenmş olması gb sebeplerle açıklanablr.
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OzelHayat;

const styles = StyleSheet.create({
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
  bottombar: { marginHorizontal: 20 },
  topbartext: { fontSize: 30, color: "#005259", fontWeight: "600" },
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
