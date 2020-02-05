import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Overlay } from 'react-native-elements';
import TruckInformation from './truckInformation';


class Place extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '2zReQTlfVvoUM_NeXqba2jiYfbYN3e4LksUiFuivMlv_CsJc8hlMYvrVbZuM0ruv8sjpj-R6aljRzyyWBNVKvMyEEgPQI1oCadbsGV-kmpxACjunydwkOdVZmSwaXnYx',
            userLatitude: 1,
            userLongitude: 1,
            markers: [],
            isLoading: true,
            isVisible: false
        }
    }

    componentDidMount() {
        this.findCoordinates();
        // AsyncStorage.getItem("data").then(value => {
        //     if (!value) {
        //         value = [];
        //     } else {
        //         value = JSON.parse(value);
        //     }
        //     this.setState({ markers: value });
        //     console.log(value);
        //     AsyncStorage.removeItem("data");
        // })
    }

    //This function is meant for finding the user's coordinates
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //Grabbing user latitude and longitude.
                const latitude = Number(position.coords.latitude.toFixed(6));
                const longitude = Number(position.coords.longitude.toFixed(6));
                //Setting users location into state for further use
                this.setState({ userLatitude: latitude, userLongitude: longitude });
                console.log('Latitude: ' + this.state.userLatitude + ' Longitude: ' + this.state.userLongitude);
                this.getData();
            });
    };

    //This function is meant for finding and fetching food truck data.
    getData() {
        //url is the api call that is needed to find the food trucks
        let url = `https://api.yelp.com/v3/businesses/search?term=foodtrucks&latitude=${this.state.userLatitude}&longitude=${this.state.userLongitude}&radius_filter=500`;
        fetch(url, {
            method: 'GET',
            //this is the bearer token with the apikey so I can access Yelp Fusions API
            headers: { 'Authorization': `Bearer ${this.state.apiKey}` }
        })
            .then(response => response.json())
            .then(json => {
                //Created a temporary array and set it equal to my state array.
                //You cannot push to a state array. You can only use setState
                let markersArray = this.state.markers;
                for (let i = 0; i < json.businesses.length; i++) {
                    //This is pushing all the data that I need to access later, such as name of the truck, phone number, price, and rating.
                    markersArray.push({
                        key: i + 10000,
                        name: json.businesses[i].name,
                        truckLatitude: json.businesses[i].coordinates.latitude,
                        truckLongitude: json.businesses[i].coordinates.longitude,
                        rating: json.businesses[i].rating,
                        price: json.businesses[i].price,
                        id: json.businesses[i].id,
                        image_url: json.businesses[i].image_url,
                        phone: json.businesses[i].phone,
                        reviewCount: json.businesses[i].review_count
                    });
                }

                markersArray.push({
                    key: 1,
                    name: "Test Truck",
                    truckLatitude: 2,
                    truckLongitude: 2,
                    rating: 1.5,
                    price: "$",
                    id: 'dfj34fj3409j34',
                    image_url: 'https://images.unsplash.com/photo-1573935146153-f6322e84d1e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                    phone: "+1000000000",
                    reviewCount: 3
                })
                //Here I am grabbing the JSON data from the Yelp API and storing using Async Storage... Hopefully
                AsyncStorage.setItem("data", JSON.stringify(markersArray));
                //Setting the isLoading state to false here will then actually render the map and make it visible for the user
                this.setState({ isLoading: false });
            }),
            //This is a fallback just in case something goes wrong with the API call
            error => Alert.alert(error.message.name),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    }

    renderTrucks() {
        //The reason why I have this check here is so that it does not access the markers state array too early and cause an error.
        if (this.state.markers[0].truckLatitude == null) {
            console.log("this is null: " + this.state.markers[0].truckLatitude);
            return null;
        } else {
            //Here I am mapping the markers state array and putting the markers on the map
            return this.state.markers.map((marker, index) => {
                return (
                    <View style={{ position: 'absolute' }}>
                        <Marker
                            //The key is useful for if I need to access a particuar food truck later.
                            key={marker.index}
                            //Here I am setting the coordinates of each food truck and placing them on the map
                            coordinate={{ latitude: marker.truckLatitude, longitude: marker.truckLongitude }}
                            pinColor='yellow'

                            onPress={() => {
                                console.log("Hey this is supposed to move to the truck information page");
                                this.setState({ isVisible: true });
                            }}

                        />
                        <Overlay
                            style={{ position: 'absolute' }}
                            isVisible={this.state.isVisible}
                            onBackdropPress={() => this.setState({ isVisible: false }, this.forceUpdate())}
                        >
                            <View>
                                <Image source={{ uri: marker.image_url }} style={{ resizeMode: 'contain', height: 300, width: 300, justifyContent: 'center', alignItems: 'center', marginLeft: 55 }} />
                                <Text style={{ fontSize: 35, marginLeft: 55, fontFamily: 'Roboto' }}>{marker.name}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 55, flexDirection: 'row' }}>Rating: {marker.rating}</Text>
                                <Text style={{ fontSize: 13, marginLeft: 55, flexDirection: 'row' }}>Review Count: {marker.reviewCount}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL('tel:' + phone)
                                    }}
                                >
                                    <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Phone: {marker.phone}</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, marginLeft: 55, marginTop: 25 }}>Price: {marker.price}</Text>
                            </View>
                        </Overlay>
                    </View>
                )
            })
        }
    }

    render() {
        //This will not render until both the findCoordinates() and getData() functions are finished
        //This is useful as we do not want the map to load with nothing on there.
        if (this.state.isLoading == true) {
            return null;
        } else {
            return (
                //This is just the map of where the user is
                <View style={styles.container}>
                    <MapView
                        style={styles.mapContainer}
                        region={{
                            latitude: this.state.userLatitude,
                            longitude: this.state.userLongitude,
                            latitudeDelta: 0.0115,
                            longitudeDelta: 0.0115
                        }}
                    >
                        {/*The marker here is the users location that I found in the findCoordinates() function*/}
                        <Marker
                            coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }}
                            title='Here I am!'
                            description="Here is how description works"
                        />
                        {/*This goes to the function that I use to render food trucks */}
                        {this.renderTrucks()}
                    </MapView>
                    <View style={styles.mapDrawerOverlay} />
                </View>
            )
        }
    }
}

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
//I am using these styles so I can use my drawer navigation
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
        width: Screen.width,
        height: Dimensions.get('window').height,
    },
    mapDrawerOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.0,
        height: Dimensions.get('window').height,
        width: 30,
    },
});

class Truck extends React.Component {
    static navigationOptions = {
        title: 'Truck Information',
        headerShown: true,
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#FF4531',
            elevation: 0,
        }
    }
    render() {
        return (
            <TruckInformation />
        )
    }
}

const AppNavigator = createStackNavigator({
    Place: Place,
    Truck: Truck
},
    {
        initialRouteName: 'Place'
    }
);

export default createAppContainer(AppNavigator);