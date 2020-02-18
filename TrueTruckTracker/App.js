import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import Settings from './src/components/settings';
import TruckList from './src/components/truckList';
import Login from './src/components/login';
import Register from './src/components/register';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const myDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Places
  },
  Settings: {
    screen: Settings
  },
  TruckList: {
    screen: TruckList
  }
},
  {
    initialRouteName: 'Register',
    navigationOptions: navigationOptionsHeader,
    edgeWidth: 30,
    drawerType: 'front'
  }
);

const LoginNavigator = createStackNavigator({
    Login: {
      screen: Login
    },
    Register:{
      screen: Register
    }
})

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


class Place extends React.Component {
  render() {
    return (
      <Places />
    );
  }
}

class Truck extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TruckInformation />
      </View>
    )
  }
}

class Setting extends React.Component {
  static navigationOptions = {
    headerShown: false
  }
  render() {
    return (
      <Settings />
    )
  }
}

class TruckListPage extends React.Component {
  render () {
    return(
      <TruckList/>
    )
  }
}

const AppContainer = createAppContainer(myDrawerNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default App;