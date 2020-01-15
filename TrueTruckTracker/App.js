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
      positionLatitude: null,
      positionLongitude: null,
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: ''
    }
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));
        const { pageToken } = this.state;
        const urlOne = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=AIzaSyBiBHHoqdnd4k6tX4W_qmGl9n1_6N8Z4Os`;
        const urlSecond = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=Your_Api_Key&pagetoken=${pageToken}`;

        let url = pageToken === '' ? urlOne : urlSecond;
        console.log(url);
        console.log("url");
        this.setState({ loading: true });
        fetch(url)
          .then(res => {
            return res.json()
          })
          .then(res => {

            const arrayData = _.uniqBy([...this.state.data, ...res.results], 'id');

            this.setState({
              siteTitle: "Restaurants Nearby",
              data: pageToken === '' ? res.results : arrayData,
              loading: false,
              refreshing: false,
              pageToken: res.next_page_token,
              positionLatitude: latitude,
              positionLongitude: longitude
            });

          })
          .catch(error => {
            console.log(error);
            this.setState({ loading: false });
          });
      }
    );
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "86%", backgroundColor: '#CED0CE', marginLeft: "14%" }} />
    );
  };

  renderHeader = () => {
    return (
      <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>{this.state.siteTitle}</Text>
    )
  };

  renderFooter = () => {
    if (this.state.pageToken === undefined) return null;

    return (
      <View style={{ paddingVertical: 20, borderTopWidth: '#CDE0CE' }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  };

  handleRefresh = () => {
    this.state({
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
    console.log("Latitude: " + this.state.positionLatitude + " Longitude: " + this.state.positionLongitude)
    return (
      <MapView style={{ flex: 1 }}
        initialRegion={{
            latitude: this.state.positionLatitude,
            longitude: this.state.positionLongitude,
            latitudeDelta: 0.1292,
            longitudeDelta: 0.1292
        }}
      />
    );
  }
}
