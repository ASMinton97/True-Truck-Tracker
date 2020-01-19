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
            markers: [],
            isLoading: true,
        }
    }

    componentWillMount() {
        this.findCoordinates();
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                this.setState({ userLatitude: latitude, userLongitude: longitude });
                console.log('Latitude: ' + this.state.userLatitude + ' Longitude: ' + this.state.userLongitude);
                this.forceUpdate();
                this.getData();
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
                let markersArray = [];
                for (let i = 0; i < json.businesses.length; i++) {
                    console.log(json.businesses[i]);
                    markersArray.push({
                        test: i,
                        name: json.businesses[i].name,
                        truckLatitude: json.businesses[i].coordinates.latitude,
                        truckLongitude: json.businesses[i].coordinates.longitude,
                        rating: json.businesses[i].rating,
                        price: json.businesses[i].price,
                        // id: json.businesses[i].id,
                        // image_url: json.business[i].image_url,
                        // phone: json.businesses[i].phone
                    });
                    console.log("This is a food truck: " + i);
                }
                this.setState({ isLoading: false, markers: [...this.state.markers, markersArray] });
                console.log(this.state.markers[0]);
            }),
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    }

    renderTrucks() {
        return this.state.isLoading ?
            null : this.state.markers.map((marker, index) => {
                const coords = {
                    latitude: marker.truckLatitude,
                    longitude: marker.truckLongitude
                };

                return (
                    <Marker
                        key={index}
                        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
                        title={this.state.markers[0].name}
                        description={"Price: " + this.state.markers.price}
                    />
                )

            })
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
                {this.renderTrucks()}
            </MapView>
        )
    }
}