import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import axios from "axios";
import WEB_URL from "../../constants/Settings";
import { useAuth } from "../../contexts/Auth";
import BookBox from "../../components/BookBox";

const Home = () => {
  const [books, setBooks] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    await axios
      .get(WEB_URL + "/api/Book", {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setBooks(data);
      })
      .catch((err) => console.log("Hata " + err));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={books}
        renderItem={({ item }) => <BookBox book={item} user={false} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
