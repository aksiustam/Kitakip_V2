import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const BookBox = (props) => {
  const { book, user } = props;

  const navigation = useNavigation();
  const onClick = () => {
    if (user) navigation.navigate("BookRead", book);
    else navigation.navigate("BookDetails", book);
  };
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.bookName}>{book.name}</Text>
          <Text numberOfLines={1} style={styles.bookWriter}>
            {book.writer}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.BookPub}>{book.pub}</Text>
          <Text style={styles.BookPub}>{book.page} Sayfa</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.5,
  },
  leftContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "flex-end",
  },
  bookName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bookWriter: {
    color: "gray",
    fontSize: 16,
  },
  BookPub: {
    color: "gray",
    fontSize: 14,
  },
});
export default BookBox;
