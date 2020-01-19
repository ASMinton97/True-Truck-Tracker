import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '2zReQTlfVvoUM_NeXqba2jiYfbYN3e4LksUiFuivMlv_CsJc8hlMYvrVbZuM0ruv8sjpj-R6aljRzyyWBNVKvMyEEgPQI1oCadbsGV-kmpxACjunydwkOdVZmSwaXnYx',
            userLatitude: 1,
            userLongitude: 1,
            markers: []
        }
    }
    componentDidMount() {
        this.getData();
    }

    componentWillMount(){
        this.findCoordinates();
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                this.setState({ userLatitude: latitude, userLongitude: longitude });
                this.forceUpdate();
            });
    };

    getData() {
        let url = `https://api.yelp.com/v3/businesses/search?term=foodtrucks&latitude=${this.state.userLatitude}&longitude=${this.state.userLongitude}&radius_filter=500`;
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.state.apiKey}` }
        })
            .then(response => response.json())
            .then(json => {
                console.log("This is how many Foodtrucks are around: " + json.businesses.length);
                console.log(json.body.businesses[0]);
                for (let i = 0; i < json.businesses.length; i++) {
                    console.log(i);
                    this.state.markers.push({
                        name: json.businesses[i].name,
                        coordinates: json.businesses[i].coordinates,
                        rating: json.businesses[i].rating,
                        price: json.businesses[i].price,
                        id: json.businesses[i].id,
                        image_url: json.business[i].image_url,
                        phone: json.businesses[i].phone
                    });
                    this.setState({});
                    console.log("This is a food truck: " + i);
                }
            }),
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: this.state.userLatitude,
                    longitude: this.state.userLongitude,
                    latitudeDelta: 0.1292,
                    longitudeDelta: 0.1292
                }}
            >
                <Marker
                    coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }}
                    title='Here I am!'
                    description="Here is how description works"
                />
            </MapView>
        )
    }
}