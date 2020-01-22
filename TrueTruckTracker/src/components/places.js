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
            testArray: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.findCoordinates();
    }


    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                this.setState({ userLatitude: latitude, userLongitude: longitude });
                console.log('Latitude: ' + this.state.userLatitude + ' Longitude: ' + this.state.userLongitude);
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
                let markersArray = this.state.markers;
                for (let i = 0; i < json.businesses.length; i++) {
                    markersArray.push({
                        index: i,
                        name: json.businesses[i].name,
                        truckLatitude: json.businesses[i].coordinates.latitude,
                        truckLongitude: json.businesses[i].coordinates.longitude,
                        rating: json.businesses[i].rating,
                        price: json.businesses[i].price,
                        id: json.businesses[i].id,
                        image_url: json.businesses[i].image_url,
                        phone: json.businesses[i].phones
                    });
                }
                this.setState({ isLoading: false });
                console.log(this.state.markers);
            }),
            error => Alert.alert(error.message.name),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    }

    renderTrucks() {
        if (this.state.markers[0].truckLatitude == null) {
            console.log("this is null: " + this.state.markers[0].truckLatitude);
            return null;
        } else {
            // this.state.markers.map((index, markersArray))
            return (
                <Marker
                    key={this.state.markers.index}
                    coordinate={{ latitude: this.state.markers[1].truckLatitude, longitude: this.state.markers[1].truckLongitude }}
                    title={this.state.markers[1].name}
                    description={"Price: " + this.state.markers[1].price}
                    pinColor='yellow'
                />
            )
        }
    }

    render() {
        if (this.state.isLoading == true) {
            return null;
        } else {
            return (
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: this.state.userLatitude,
                        longitude: this.state.userLongitude,
                        latitudeDelta: 0.0115,
                        longitudeDelta: 0.0115
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
}