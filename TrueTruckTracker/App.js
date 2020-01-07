import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView  from "react-native-maps";

export default class App extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 38.316867,
          longitude:  -85.835306,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}
