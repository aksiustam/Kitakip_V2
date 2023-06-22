import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useAuth } from "../../contexts/Auth";
import { useRoute } from "@react-navigation/native";
import WEB_URL from "../../constants/Settings";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

/* Object {
  "desc": "Geçmişi kontrol eden, geleceği de kontrol eder: Şimdiyi kontrol eden, geçmişi de kontrol eder.",
  "id": 1,
  "name": "Bin Dokuz Yüz Seksen Dört - 1984",
  "page": 296,
  "pub": "KAPRA YAYINCILIK",
  "pubdate": "202r1-01-05T14:31:13.805",
  "url": "George Orwell - Bin Dokuz Yüz Seksen Dört.epub",
  "writer": "George Orwell",
} */

const BookDetail = (props) => {
  const route = useRoute();

  const book = route.params;

  const navigation = useNavigation();
  const auth = useAuth();
  const onClick = async () => {
    const formData = {
      mark: null,
      markdate: null,
      live: true,
    };

    await axios
      .post(
        WEB_URL + `/api/UserBook?UserId=${auth.authData.id}&BookId=${book.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.authData.token}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          navigation.navigate("BookRead", book);
        }
      })
      .catch((err) => console.log("Hata " + err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.upcontainer}>
        <Text style={styles.text}>{book.name}</Text>
      </View>
      <View>
        <Text>{book.desc}</Text>
      </View>
      <View style={styles.midcontainer}>
        <Text>{book.writer}</Text>
        <Text>{book.page} Sayfa</Text>
      </View>
      <Button title="Kitaba Başla" onPress={onClick}></Button>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    padding: 10,
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: "column",
  },
  midcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  upcontainer: { marginBottom: 25 },

  text: {
    fontSize: 20,
  },
});
