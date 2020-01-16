import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class places extends Component {
    state = {
        apiKey: '2zReQTlfVvoUM_NeXqba2jiYfbYN3e4LksUiFuivMlv_CsJc8hlMYvrVbZuM0ruv8sjpj-R6aljRzyyWBNVKvMyEEgPQI1oCadbsGV-kmpxACjunydwkOdVZmSwaXnYx',
        userLatitude: 0,
        userLongitude: 0,
        markers: []
    };

    componentWillMount() {
        this.findCoordinates();
    }

    componentDidMount(){
        this.getData();
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                this.setState({ userLatitude: latitude, userLongitude: longitude });
                console.log("Latitude: " + this.state.userLatitude + " Longitude: " + this.state.userLongitude + " When is this happening");
                this.forceUpdate();
            });
    };

    getData(){
        let url = `https://api.yelp.com/v3/foodtrucks/search?latitude=${this.state.userLatitude}&longitude=${this.state.userLongitude}&radius_filter=500`;
        fetch(url, {
            method: 'GET',
            headers: { Authorization: 'Bearer ', apiKey: this.state.apiKey}
        })
            .then(response => response.json())
            .then(json => {
                for(let i=0; i < json.body.businesses.length; i++){
                    console.log(i);
                    this.state.markers.push({
                        name: json.body.businesses[i].name,
                        coordinates: json.body.businesses[i].coordinates,
                        rating: json.body.businesses[i].rating,
                        price: json.body.businesses[i].price,
                        id: json.body.businesses[i].id,
                        image_url: json.body.business[i].image_url,
                        phone: json.body.businesses[i].phone
                    })
                }
                //this.setState({url: json.body.businesses})
                console.log("IS THIS HAPPENING AT ALL?")
                console.log(markers);
            }),
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    }

    render() {
        console.log("Latitude: " + this.state.userLatitude + " Longitude: " + this.state.userLongitude)
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
                    coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude}}
                    title='Here I am!'
                    description="Here is how description works"
                />
            </MapView>
        )
    }
}