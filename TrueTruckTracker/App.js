// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import MapView from "react-native-maps";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null
//     }
//   };

//   componentDidMount() {
//     findCoordinates = () => {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const latitude = Number(position.coords.latitude.toFixed(6));
//           const longitude = Number(position.coords.longitude.toFixed(6));
//           const locationofUser = JSON.stringify(position);

//           this.setState({ location: locationofUser });
//         },
//         error => Alert.alert(error.message),
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//       );
//     }
//   }

//   render() {
//     return (
//       <MapView
//         style={{
//           flex: 1
//         }}
//         initialRegion={{
//           latitude: this.location,
//           longitude: this.location,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         }}
//       />
//     );
//   }
// }


import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
 
import { List, ListItem } from "react-native-elements";
var _ = require('lodash');
 
export default class ResturantList extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: ''
    };
  }
 
  componentDidMount() {
 
    this.fetchData();
  }
 
  fetchData = () => {
 
    navigator.geolocation.getCurrentPosition(
            (position) => {
    const latitude = Number(position.coords.latitude.toFixed(6));
    const longitude = Number(position.coords.longitude.toFixed(6));
    const { pageToken } = this.state;
    const urlFirst = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyBiBHHoqdnd4k6tX4W_qmGl9n1_6N8Z4Os
    `
    const urlNext = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyBiBHHoqdnd4k6tX4W_qmGl9n1_6N8Z4Os&pagetoken=${pageToken}`;
 
    let url = pageToken === '' ? urlFirst : urlNext
    console.log(url);
    console.log("url");
    this.setState({ loading: true });
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
 
        const arrayData = _.uniqBy( [...this.state.data, ...res.results] , 'id' )
 
        this.setState({
          siteTitle: "Resturants Near By",
          data: pageToken === '' ? res.results : arrayData,
          loading: false,
          refreshing: false,
          pageToken: res.next_page_token
        });
 
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    })
  };
  renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "86%",
         backgroundColor: "#CED0CE",
         marginLeft: "14%"
       }}
     />
   );
  };
  renderHeader = () => {
    return (<Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10}}>{this.state.siteTitle}</Text>)
  };
  renderFooter = () => {
 
    if (this.state.pageToken === undefined) return null;
 
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
 
  handleRefresh = () => {
    this.setState(
      {
        pageToken: '',
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };
 
  handleLoadMore = () => {
    this.fetchData();
  };
  render() {
  
    return (
      <View>    
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }} >
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item }) =>{
   
          const rating = item.rating ? item.rating : 'na'
 
          return (<View><ListItem
              roundAvatar
              title={`${item.name}`+" ("+`${rating}`+")"}
              subtitle={`${item.vicinity}` }
              avatar={{ uri: item.icon }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%"
              }}
            /></View>
          )
        }}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
      </List>
      </View>
    );
  }
}