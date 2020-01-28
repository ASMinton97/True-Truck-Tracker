import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert, Text, Image, AsyncStorage } from 'react-native';

const TruckInformation = ({ name, rating, price, image, phone }) => {
    return (
        <View>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            <Text>{name}</Text>
            <Text>Phone Number: {phone}</Text>
            <Text>Rating: {rating}</Text>
            <Text>Price: {price}</Text>
        </View>
    )
}

export default class truckInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],

        }
    }

    componentDidMount() {
        AsyncStorage.getItem("data").then(value => {
            if (!value) {
                value = [];
            } else {
                value = JSON.parse(value);
            }
            this.setState({ markers: value });
            console.log(value);
            AsyncStorage.removeItem("data");
        })
    }

    render() {
        let truckInfo = [];
        for (let i = 0; i < this.state.markers.length; i++) {
            truckInfo.push(
                <TruckInformation
                    image={this.state.markers[i].image_url}
                    name={this.state.markers[i].name}
                    phone={this.state.markers[i].phone}
                    rating={this.state.markers[i].rating}
                    price={this.state.markers[i].price}
                />
            )
        }
        return (
            <View>
                {truckInfo}
            </View>
        )
    }
}
