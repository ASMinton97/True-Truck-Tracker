import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button, Image } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import Settings from './src/components/settings';
import TruckList from './src/components/truckList';
import Login from './src/components/login';
import Register from './src/components/register';
import Account from './src/components/account';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const myDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Places
  },
  Account: {
    screen: Account
  },
  Settings: {
    screen: Settings
  },
  Trucks: {
    screen: TruckList
  }
},
{
  initialRouteName: 'Home',
  navigationOptions: navigationOptionsHeader,
  edgeWidth: 30,
  drawerType: 'front'
}
);


const navigationOptionsHeader = ({ navigation }) => {
  return {
    headerTitle: 'Screen',
    headerShown: true,
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#FF4531',
      elevation: 0,
    },

  };
};

const AppContainer = createAppContainer(myDrawerNavigator);


class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default App;