import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { useAuth } from "../../contexts/Auth";
import axios from "axios";
import BookBox from "../../components/BookBox";
const UserBooks = () => {
  const auth = useAuth();

  const [userbook, setUserBook] = useState([]);

  useEffect(() => {
    getUserBooks();
  }, []);

  const getUserBooks = async () => {
    await axios
      .get(WEB_URL + `/api/UserBook/${auth.authData.id}`, {
        headers: {
          Authorization: `Bearer ${auth.authData.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setUserBook(response.data);
        }
      })
      .catch((err) => console.log("Hata " + err));
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={userbook}
        renderItem={({ item }) => <BookBox book={item.book} user={true} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
