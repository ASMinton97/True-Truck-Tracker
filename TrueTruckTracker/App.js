import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from "react-native";
import { List, ListItem } from 'react-native-elements';
import MapView from "react-native-maps";
import Places from './src/components/places';
var _ = require('lodash');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  };

  render() {
    return (
      <Places/>
    );
  }
}
