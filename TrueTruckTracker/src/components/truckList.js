import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Image, AsyncStorage, Linking } from 'react-native';

const TruckInformation = ({ name, rating, price, image, phone, reviewCount }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#000', marginTop: 10 }}>
            <Image source={{ uri: image }} style={{ resizeMode: 'contain', height: 75, width: 75, marginLeft: 10 }} />
            <Text style={{ fontSize: 20, marginLeft: 15, fontFamily: 'Roboto' }}>{name}</Text>
            <View style={{flexDirection:'column', marginLeft: 15}}>
                <Text style={{ fontSize: 13, }}>Rating: {rating} / 5</Text>
                <Text style={{ fontSize: 13, }}>Review Count: {reviewCount}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL('tel:' + phone)
                }}
            >
                <Text style={{ fontSize: 20, marginTop: 25, marginLeft: 15 , marginBottom: 25}}>Phone: {phone}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginTop: 25, marginLeft: 15 }}>Price: {price}</Text>
        </View>
    )
}

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
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
            //AsyncStorage.removeItem("data");
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
                    reviewCount={this.state.markers[i].reviewCount}
                    price={this.state.markers[i].price}
                />
            )
        }
        return (
            <ScrollView>
                {truckInfo}
            </ScrollView>
        )
    }
}