import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


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