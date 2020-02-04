import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, Button } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const navigator = createDrawerNavigator({
  Home: { screen: Places }
},
  {
    drawerType: 'slide',
    drawerWidth: 200
  }
);

class Place extends React.Component {
  static navigationOptions = {

    headerShown: false
  }
  render() {
    return (
      <Places />
    );
  }
}

class Truck extends React.Component {
  static navigationOptions = {
    title: 'Truck Information',
    headerShown: true,
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#FF4531',
      elevation: 0,
    }
  }
  render() {
    return (
      <TruckInformation />
    )
  }
}

class Settings extends React.Component {
  static navigationOptions = {
    headerShown: false
  }
  render() {
    return (
      <View>
        <Text>This is the settings page</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Place: Place,
  Truck: Truck,
  Setting: Settings
},
  {
    initialRouteName: 'Place',
  });

export default createAppContainer(AppNavigator);