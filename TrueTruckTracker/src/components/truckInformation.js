import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image, AsyncStorage, Linking } from 'react-native';

const TruckInformation = ({ name, rating, price, image, phone }) => {
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: image }} style={{ resizeMode: 'contain', height: 300, width: 300, justifyContent: 'center', alignItems: 'center', marginLeft: 55 }} />
            <Text style={{ fontSize: 35, marginLeft: 55, fontFamily: 'Roboto' }}>{name}</Text>
            <Text style={{ fontSize: 13, marginLeft: 55 }}>Rating: {rating}</Text>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL('tel:' + phone )
                }}
            >
                <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Phone: {phone}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Price: {price}</Text>
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
        //I am pushing the info that I grabbed from Async Storage and pushing it into this array to render
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
            <View style={{ flex: 1 }}>

                {truckInfo[1]}

                {/* <Image source={{ uri: 'https://foodtruckr.com/wp-content/uploads/2013/10/LaCocinita.png' }}
                    style={{ resizeMode: 'contain', height: 300, width: 300, justifyContent: 'center', alignItems: 'center', marginLeft: 55 }} />
                <Text style={{ fontSize: 35, marginLeft: 55, fontFamily: 'Roboto' }}>Coninita</Text>
                <Text style={{ fontSize: 13, marginLeft: 55 }}>Rating: 4.5/5</Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('tel: (000) 000-0000')
                    }}
                >
                    <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Phone: (000) 000-0000</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Price: "$$"</Text> */}
            </View>
        )
    }
}

