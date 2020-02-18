import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text, TextInput, AsyncStorage, Linking } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            Username: '',
            Password: '',
            Email: ''
        }
    }

    render(){
        return(
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FF4531' }}>
                <View style={{ flex: .6, marginVertical: 20, marginHorizontal: 20, borderWidth: 3, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, color: '#000' }}>True Truck Tracker</Text>
                    <Text style={{ marginTop: 30, fontSize: 17 }}>Register</Text>
                    <TextInput style={{ marginTop: 30, borderBottomWidth: 1, width: 250 }} autoCompleteType='email' autoCorrect={false} placeholder='Email' onChangeText={Email => this.setState({Email})}/>
                    <TextInput style={{ marginTop: 30, borderBottomWidth: 1, width: 250 }} autoCompleteType='username' autoCorrect={false} placeholder='Username' onChangeText={Username => this.setState({Username})} />
                    <TextInput style={{ marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }} autoCorrect={false} placeholder='Password' secureTextEntry={true} onChangeText={Password => this.setState({Password})}/>
                    <Button
                        title='Register'
                        color='#FF4531'
                        onPress={this.storeUser}
                    />
                </View>
            </View>
        )
    }

    storeUser = () => {
        console.log("Are we even reaching this point?");
        let mail = this.state.Email;
        let user = this.state.Username;
        let pass = this.state.Password;
        AsyncStorage.setItem("Email", mail);
        AsyncStorage.setItem("Username", user);
        AsyncStorage.setItem("Password", pass);
    }
}