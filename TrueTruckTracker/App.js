import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from "react-native";
import { List, ListItem } from 'react-native-elements';
import MapView from "react-native-maps";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  };

  render() {
    return (
      <Places />
    );
  }
}