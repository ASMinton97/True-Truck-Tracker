import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text, TextInput, AsyncStorage, Image} from 'react-native';

export default class Account extends Component{
    constructor(props){
        super(props);
        this.state ={
            username: 'Guest',
            favoriteTrucks: []
        }
    }

    componentDidMount(){
        AsyncStorage.multiGet(["Username", "Favorites"]).then(value => {
            if(!value){
                value = ":("
            } else {
                console.log('We gotem boys');
            }
            this.setState({username: value[0][1]});
            this.setState({favoriteTrucks: value[1][1]});
            console.log(value);
        });
    }

    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>HELLO {this.state.username} It is nice to see you are here</Text>
            </View>
        )
    }
}