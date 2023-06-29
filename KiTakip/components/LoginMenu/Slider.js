import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import Bildirim from "./Bildirim";
const Slider = () => {
  const cards = [
    {
      text: "Text 1",
    },
    {
      text: "Text 2",
    },
    {
      text: "Text 3",
    },
    {
      text: "Text 4",
    },
    {
      text: "Text 5",
    },
  ];

  const ITEM_WIDTH = Dimensions.get("window").width;
  const ITEM_HEIGHT = Dimensions.get("window").height;

  const carRef = useRef();
  const [text, setText] = useState("ATLA");
  const [start, setStart] = useState(false);
  const [carindex, setCarIndex] = useState(0);

  useEffect(() => {
    if (carindex === 4) {
      setText("BAŞLA");
    } else {
      setText("ATLA");
    }
  }, [carindex]);

  const pagetext = () => {
    if (text === "BAŞLA") {
      setStart(true);
    } else {
      setStart(false);
      carRef.current?.scrollTo({ index: 4, animated: true });
      setCarIndex(4);
    }
  };
  return (
    <>
      <View style={styles.fullcontainer}>
        <View style={styles.fixcontainer}>
          <View style={{ marginTop: 27 }}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.textbig}>
              Kolay Okuma
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.textsmall}
            >
              UYGULAMASI
            </Text>
          </View>
        </View>

        <Carousel
          width={ITEM_WIDTH / 1.3}
          height={ITEM_HEIGHT}
          data={cards}
          loop={false}
          ref={carRef}
          onSnapToItem={(index) => {
            setCarIndex(index);
          }}
          overscrollEnabled={false}
          renderItem={({ index }) => (
            <View style={styles.upcontainer}>
              <View style={styles.container}>
                {index === 0 && (
                  <Text
                    numberOfLines={3}
                    adjustsFontSizeToFit
                    style={styles.text}
                  >
                    Kolay Okuma Uygulaması Ne İşe Yarar?
                  </Text>
                )}
                {index === 1 && (
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={styles.text}
                  >
                    İşimiz ve Dünya Telaşımız Bizi Okumaktan ve Öğrenmekten
                    Alıkoyuyor
                  </Text>
                )}
                {index === 2 && (
                  <Text
                    numberOfLines={7}
                    adjustsFontSizeToFit
                    style={styles.text}
                  >
                    Kolay Okuma Uygulamasında Günlük Belirlediğiniz Kitap
                    Üzerinden En az 2 Sayfa ile Sizlerle Yılda 730 Sayfa
                    OkuyaBiliriz.
                  </Text>
                )}
                {index === 3 && (
                  <View
                    style={{ paddingVertical: 12, justifyContent: "center" }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[{ marginBottom: 15 }, styles.text]}
                    >
                      HADİ BAŞLAYALIM
                    </Text>
                    <FlatList
                      data={[
                        { key: "\u2022 Bildirimleri Aç" },
                        { key: "\u2022 Kitap Seç" },
                        { key: "\u2022 Saatini Belirle" },
                        { key: "\u2022 O Saatte Bildirimini Al" },
                        { key: "\u2022 Kitap Okumaya Başla" },
                      ]}
                      renderItem={({ item }) => (
                        <Text numberOfLines={1} style={styles.listtext}>
                          {item.key}
                        </Text>
                      )}
                    />
                  </View>
                )}
                {index === 4 && <Bildirim start={start} />}
              </View>
            </View>
          )}
        />

        <TouchableOpacity style={styles.touchabletext} onPress={pagetext}>
          <Text
            style={{
              fontSize: 32,
              color: "white",
              textDecorationLine: "underline",
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
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
    width: Dimensions.get("window").width,
  },
  touchabletext: {
    transform: [{ translateY: -(Dimensions.get("window").height / 3.6) }],
  },
  text: {
    fontSize: 36,
    fontWeight: "100",
    fontFamily: "sans-serif-condensed",
    letterSpacing: -1.5,
    textAlign: "center",
  },
  listtext: {
    fontSize: 23,
    fontWeight: "100",
    fontFamily: "sans-serif-condensed",
    letterSpacing: -1.5,
  },
  fixcontainer: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width / 1.4,
    height: Dimensions.get("window").height / 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  textbig: { fontSize: 36, color: "black", fontWeight: "bold" },
  textsmall: {
    position: "relative",
    transform: [{ translateX: 102 }, { translateY: -10 }],
    letterSpacing: 3,
    fontSize: 13,
    color: "#086D65",
    fontWeight: "bold",
  },
  upcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.3,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2.6,
    borderColor: "lightgrey",
    paddingHorizontal: 20,
    borderWidth: 11,
    borderRadius: 30,
  },
});

export default Slider;
