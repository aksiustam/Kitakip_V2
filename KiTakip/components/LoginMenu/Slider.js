import React from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";

const Slider = (props) => {
  const { item, index } = props;
  const cards = [
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
    {
      title: "Item 5",
      text: "Text 5",
    },
  ];

  const ITEM_WIDTH = Dimensions.get("window").width;
  return (
    <>
      <View style={styles.fullcontainer}>
        <View style={styles.fixcontainer}>
          <Text>HEY</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal={true}
            decelerationRate={0.09}
            snapToInterval={ITEM_WIDTH}
            bounces={false}
            scrollEventThrottle={6}
          >
            {cards.map((item, index) => {
              return (
                <>
                  <View style={styles.upcontainer}>
                    <View style={styles.container}>
                      <Text>HEY</Text>
                    </View>
                  </View>
                </>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fullcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fixcontainer: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width / 1.6,
    height: Dimensions.get("window").height / 9,
    backgroundColor: "white",
  },
  upcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 3,
    borderColor: "lightgrey",
    borderWidth: 11,
    borderRadius: 30,
  },
});

export default Slider;
