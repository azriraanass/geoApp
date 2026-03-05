import React from "react";
import MapView from "react-native-maps";
import { StatusBar, StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
