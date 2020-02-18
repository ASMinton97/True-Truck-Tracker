import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Button, AsyncStorage, Linking, TextInput } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FF4531' }}>
                <View style={{ flex: .6, marginVertical: 20, marginHorizontal: 20, borderWidth: 3, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, color: '#000' }}>True Truck Tracker</Text>
                    <Text style={{ marginTop: 30, fontSize: 17 }}>Login</Text>
                    <TextInput style={{ marginTop: 30, borderBottomWidth: 1, width: 250 }} autoCompleteType='username' autoCorrect={false} placeholder='Username' />
                    <TextInput style={{ marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }} autoCorrect={false} placeholder='Password' secureTextEntry={true} />
                    <Button
                        title='Login'
                        color='#FF4531'
                    />
                    <TouchableOpacity>
                        <TextInput style={{ marginTop: 20, marginBottom: 50, width: 250, textAlign: 'center', color: '#E85220' }} editable={false} defaultValue='No account? Register Here!' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}