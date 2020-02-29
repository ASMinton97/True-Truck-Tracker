import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, Text, ScrollView, AsyncStorage, Image, ImageBackground, Dimensions, Linking } from "react-native";
import { Avatar, Icon } from 'react-native-elements';

const FavoriteTruck = ({ name, rating, price, image, phone, reviewCount, url, favorite }) => {
 // if (favorite == true) {
  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "center", borderBottomWidth: 1, borderColor: "#525252", marginTop: 20, paddingBottom: 20 }}>
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
      >
        <Image source={{ uri: image }} style={{ resizeMode: "contain", height: 100, width: 100, marginLeft: 10 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "column", marginLeft: 15 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(url)}
        >
          <Text style={{ fontSize: 20, fontFamily: "Roboto", fontWeight: "bold" }}> {name} </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", marginLeft: 7 }}>
          <Text style={{ fontSize: 13 }}>Rating: {rating} / 5</Text>
          <Text style={{ fontSize: 13 }}>Review Count: {reviewCount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("tel:" + phone);
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}> Phone: {phone} </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginTop: 5 }}> Price: {price} </Text>
      </View>
    </View>
  )
 // }
}

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Guest",
      favoriteTrucks: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("Username").then(value => {
      if (!value) {
        value = "Guest";
      } else {
        console.log("We got a username");
      }
      this.setState({ username: value });
      console.log(value);
    });

    AsyncStorage.getItem("Favorites").then(valParsed => {
      if (!valParsed) {
        valParsed = [];
      } else {
        valParsed = JSON.parse(valParsed);
        console.log("We have trucks");
      }
      this.setState({ favoriteTrucks: valParsed });
      console.log(valParsed);
      AsyncStorage.removeItem("Favorites");
    });
  }

  render() {
    let favorites = [];

    for (let i = 0; i < this.state.favoriteTrucks.length; i++) {
      favorites.push(
        <FavoriteTruck
          image={this.state.favoriteTrucks[i].image_url}
          name={this.state.favoriteTrucks[i].name}
          phone={this.state.favoriteTrucks[i].phone}
          rating={this.state.favoriteTrucks[i].rating}
          reviewCount={this.state.favoriteTrucks[i].reviewCount}
          price={this.state.favoriteTrucks[i].price}
          url={this.state.favoriteTrucks[i].url}
          favorite={this.state.favoriteTrucks[i].favorite}
        />
      );
    }

    return (
      <View >
        <StatusBar hidden={true} />
        <View>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/cc/d2/da/ccd2da4b83fba486cc61ed248db8bf57.jpg' }} style={{ width: Dimensions.get("window").width, height: 120 }} />
        </View>
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 150, marginLeft: 20, top: 30, position: 'absolute' }}>
          <Avatar
            rounded
            icon={{ name: "person-outline" }}
            size='large'
          />
        </View>
        <ScrollView stickyHeaderIndices={[0]}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#c8c7cc', backgroundColor: '#f7f7f8', paddingBottom: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 22 }}>Favorite Trucks!</Text>
          </View>
          {favorites}
        </ScrollView>
      </View>
    );
  }
}
