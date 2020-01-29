import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


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

class Truck extends React.Component{
  static navigationOptions = {
    title: 'Truck Information',
    headerShown: true,
    headerTintColor: '#FFF',
    headerStyle:{
      backgroundColor: '#FF4531',
      elevation: 0,
    }
  }
  render(){
    return(
      <TruckInformation/>
    )
  }
}

const AppNavigator = createStackNavigator({
  Place: Place,
  Truck: Truck
},
  {
    initialRouteName: 'Place',
  });

export default createAppContainer(AppNavigator);