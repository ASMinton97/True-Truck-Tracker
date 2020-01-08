import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';

export default class places extends Component{
    state = {
        location: null
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
    render(){
        return(
            <View>
            </View>
        )
    }
}