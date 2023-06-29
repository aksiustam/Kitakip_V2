import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useAuth } from "../../contexts/Auth";
const Bildirim = ({ start, setStartValue }) => {
  const [page, setPage] = useState(2);
  const [date, setDate] = useState(new Date());
  const auth = useAuth();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      datePickerModeAndroid: "default",
      onChange,
      display: "default",
      mode: "time",
    });
  };

  useEffect(() => {
    if (start) {
      auth.signIn(date.toString(), page);
    }
  }, [start]);

  return (
    <View style={styles.container}>
      <View style={styles.upcontainer}>
        <Text style={{ paddingBottom: 15, fontSize: 26, fontWeight: "bold" }}>
          SAAT
        </Text>
        <TouchableOpacity style={styles.box} onPress={showTimepicker}>
          <Text style={{ fontSize: 26 }}>
            {date.getHours()}:{date.getMinutes()}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.upcontainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ paddingBottom: 15, fontSize: 26, fontWeight: "bold" }}
        >
          SAYFA SAYISI
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: page === 2 ? "#086D65" : "white" },
            ]}
            onPress={() => setPage(2)}
          >
            <Text style={{ fontSize: 26 }}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: page === 3 ? "#086D65" : "white" },
            ]}
            onPress={() => setPage(3)}
          >
            <Text style={{ fontSize: 26 }}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: page === 5 ? "#086D65" : "white" },
            ]}
            onPress={() => setPage(5)}
          >
            <Text style={{ fontSize: 26 }}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: page === 10 ? "#086D65" : "white" },
            ]}
            onPress={() => setPage(10)}
          >
            <Text style={{ fontSize: 26 }}>10</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upcontainer: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Bildirim;
