import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';

export default class places extends Component{
    state = {
        apiKey: '2zReQTlfVvoUM_NeXqba2jiYfbYN3e4LksUiFuivMlv_CsJc8hlMYvrVbZuM0ruv8sjpj-R6aljRzyyWBNVKvMyEEgPQI1oCadbsGV-kmpxACjunydwkOdVZmSwaXnYx',

    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                this.setState({ location });
                const url = `https://api.yelp.com/v3/foodtrucks/search?latitude=${latitude}&${longitude}&radius_filter=500`;
            
            fetch(url, {
                method: 'GET',
                headers: {Authorization: 'Bearer ' & this.state.apiKey}
            })
            .then(response => response.json())
            .then(json =>{
                console.log()
            }),
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            });
    };
    render(){
        return(
            <View>
            </View>
        )
    }
}