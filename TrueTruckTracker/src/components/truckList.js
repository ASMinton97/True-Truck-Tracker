import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Image, AsyncStorage, Linking, StatusBar } from 'react-native';

const TruckInformation = ({ name, rating, price, image, phone, reviewCount, url, favorite }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', borderBottomWidth: 1, borderColor: '#525252', marginTop: 20, paddingBottom: 20 }}>
            <TouchableOpacity
                onPress={() => Linking.openURL(url)}
            >
                <Image source={{ uri: image }} style={{ resizeMode: 'contain', height: 100, width: 100, marginLeft: 10 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                <TouchableOpacity
                    onPress={() => Linking.openURL(url)}
                >
                    <Text style={{ fontSize: 20, marginLeft: 15, fontFamily: 'Roboto', fontWeight: 'bold' }}>{name}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <TouchableOpacity onPress={favorite = !favorite}>
                        <Image source={[(favorite) ? { uri: 'https://i.imgur.com/kvxNrQr.png' } : { uri: 'https://i.imgur.com/CKMshFj.png' }]} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                    <Text style={{ fontSize: 13, }}>Rating: {rating} / 5</Text>
                    <Text style={{ fontSize: 13, }}>Review Count: {reviewCount}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('tel:' + phone)
                    }}
                >
                    <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 15, marginBottom: 5 }}>Phone: {phone}</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 15 }}>Price: {price}</Text>
            </View>
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
        //I am Taking the info that I grabbed from Async Storage and pushing it into this array to render
        for (let i = 0; i < this.state.markers.length; i++) {
            truckInfo.push(
                <TruckInformation
                    image={this.state.markers[i].image_url}
                    name={this.state.markers[i].name}
                    phone={this.state.markers[i].phone}
                    rating={this.state.markers[i].rating}
                    reviewCount={this.state.markers[i].reviewCount}
                    price={this.state.markers[i].price}
                    url={this.state.markers[i].url}
                    favorite={this.state.markers[i].favorite}
                />
            )
        }
        return (

            <ScrollView stickyHeaderIndices={[1]}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#c8c7cc', backgroundColor: '#f7f7f8', paddingBottom: 15, paddingTop: 15 }}>
                    <Text style={{ fontSize: 26 }}>Truck List</Text>
                </View>
                {truckInfo}
            </ScrollView>
        )
    }
}