import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image, AsyncStorage, Linking } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';

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
                <View style={styles.settingsBackgroundTitleDark}>
                    <Text style={styles.settingsTitleDark }>Settings</Text>
                </View>
                <View style={styles.settingsBackgroundDark}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={styles.settingsHeaderDark} headerText='Theme' />
                        <SettingsList.Item
                            icon={
                                <Image style={styles.settingsIconDark} source={{ uri: 'https://i.ya-webdesign.com/images/png-black-and-white-3.png' }} />
                            }
                            hasSwitch={true}
                            switchState={this.state.switchValue}
                            switchOnValueChange={this.onDarkThemeChange}
                            hasNavArrow={false}
                            title='Dark Theme'
                            titleStyle={styles.settingsItemDark}
                            backgroundColor='#414141'
                        />
                    </SettingsList>
                </View>
            </View>
        )
    }

    onDarkThemeChange() {
        this.setState({ switchValue: !this.state.switchValue })

    }


}

const styles = StyleSheet.create({
    settingsTitleBackgroundLight:{
        borderBottomWidth: 1,
        backgroundColor: '#f7f7f8',
        borderColor: '#c8c7cc'
    },
    settingsTitleLight:{
        alignSelf: 'center', 
        marginTop: 30, 
        marginBottom: 10, 
        fontWeight: 'bold', 
        fontSize: 18
    },
    settingsBackgroundLight:{
        backgroundColor: '#EFEFF4', 
        flex: 1 
    },
    settingsHeaderLight:{
        marginTop: 15, 
        color: '#000000'
    },
    settingsIconLight:{
        height: 30, 
        width: 30, 
        marginTop: 9, 
        marginLeft: 12
    },
    settingsBackgroundTitleDark:{
        borderBottomWidth: 1,
        backgroundColor:'#525252',
        borderColor:'#525252'
    },
    settingsTitleDark:{
        alignSelf: 'center', 
        marginTop: 30, 
        marginBottom: 10, 
        fontWeight: 'bold', 
        fontSize: 18,
        color: '#FFFFFF'
    },
    settingsBackgroundDark:{
        backgroundColor:'#313131',
        flex: 1
    },
    settingsHeaderDark:{
        marginTop: 15,
        color: '#FFFFFF',
        fontWeight:'bold'
    },
    settingsIconDark:{
        height: 30, 
        width: 30, 
        marginTop: 9, 
        marginLeft: 12
    },
    settingsItemDark:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        borderColor:'#525252'
    }
})