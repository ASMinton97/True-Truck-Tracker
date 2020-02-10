import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image, AsyncStorage, Linking } from 'react-native';
import SettingsList from 'react-native-settings-list';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.onDarkThemeChange = this.onDarkThemeChange.bind(this);
        this.state = {
            switchValue: false,

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
                    <Text style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Settings</Text>
                </View>
                <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={{ marginTop: 15 }}/>
                            <SettingsList.Item
                                icon={
                                    <Image style={{ height: 30, width: 30, marginTop: 9, marginLeft: 12 }} source={{ uri: 'https://i.ya-webdesign.com/images/png-black-and-white-3.png' }} />
                                }
                                hasSwitch={true}
                                switchState={this.state.switchValue}
                                switchOnValueChange={this.onDarkThemeChange}
                                hasNavArrow={false}
                                title='Dark Theme'
                            />
                    </SettingsList>
                </View>
            </View>
        )
    }

    onDarkThemeChange(){
        this.setState({switchValue: !this.state.switchValue})
    }
}