import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Places from './src/components/places';
import TruckInformation from './src/components/truckInformation';
import Settings from './src/components/settings'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const myDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Places
  },
  TruckInfo: {
    screen: TruckInformation
  },
  Settings: {
    screen: Settings
  }
},
  {
    initialRouteName: 'TruckInfo',
    navigationOptions: navigationOptionsHeader
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
          <Text> Can I put text here?</Text>
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
        <Settings/>
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