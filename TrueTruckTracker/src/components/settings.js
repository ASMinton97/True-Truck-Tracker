import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image, AsyncStorage, Linking } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';
import { Overlay } from 'react-native-elements';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.onDarkThemeChange = this.onDarkThemeChange.bind(this);
        this.state = {
            switchValue: false,
            isVisible: false,
            password: '',
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[(this.state.switchValue) ? styles.settingsBackgroundTitleDark : styles.settingsTitleBackgroundLight]}>
                    <Text style={[(this.state.switchValue) ? styles.settingsTitleDark : styles.settingsTitleLight]}>Settings</Text>
                </View>
                <View style={[(this.state.switchValue) ? styles.settingsBackgroundDark : styles.settingsBackgroundLight]}>
                    <SettingsList borderColor={this.state.switchValue ? '#525252' : '#c8c7cc'} defaultItemSize={50}>
                        <SettingsList.Header headerStyle={[(this.state.switchValue) ? styles.settingsHeaderDark : styles.settingsHeaderLight]} headerText='Theme' />
                        <SettingsList.Item
                            icon={
                                <Image style={[(this.state.switchValue) ? styles.settingsIconDark : styles.settingsIconLight]} source={[(this.state.switchValue) ? { uri: 'https://i.imgur.com/WLHv5HM.png' } : { uri: 'https://i.imgur.com/PJHWQjJ.png' }]} />
                            }
                            hasSwitch={true}
                            switchState={this.state.switchValue}
                            switchOnValueChange={this.onDarkThemeChange}
                            hasNavArrow={false}
                            title='Dark Theme'
                            titleStyle={[(this.state.switchValue) ? styles.settingsItemDark : styles.settingsItemLight]}
                            backgroundColor={this.state.switchValue ? '#414141' : '#FFFFFF'}
                        />
                        <SettingsList.Header headerStyle={[(this.state.switchValue) ? styles.settingsHeaderDark : styles.settingsHeaderLight]} headerText='Account' />
                        <SettingsList.Item
                            title='Change Password'
                            titleStyle={[(this.state.switchValue) ? styles.settingsItemDark : styles.settingsItemLight]}
                            backgroundColor={this.state.switchValue ? '#414141' : '#FFFFFF'}
                            onPress={() => {this.setState({ isVisible: true })}}
                        />
                    </SettingsList>
                    <Overlay
                        style={{ position: 'absolute' }}
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({ isVisible: false }, this.forceUpdate())}
                    >
                        <View>
                            <Text>Here is where I will change my password</Text>
                        </View>
                    </Overlay>
                </View>
            </View>
        )
    }

    onDarkThemeChange() {
        this.setState({ switchValue: !this.state.switchValue })

    }


}

const styles = StyleSheet.create({
    settingsTitleBackgroundLight: {
        borderBottomWidth: 1,
        backgroundColor: '#f7f7f8',
        borderColor: '#c8c7cc'
    },
    settingsTitleLight: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    settingsBackgroundLight: {
        backgroundColor: '#EFEFF4',
        flex: 1
    },
    settingsHeaderLight: {
        marginTop: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    settingsIconLight: {
        height: 30,
        width: 30,
        marginTop: 9,
        marginLeft: 12
    },
    settingsItemLight: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
        borderColor: '#525252'
    },
    settingsBackgroundTitleDark: {
        borderBottomWidth: 1,
        backgroundColor: '#525252',
        borderColor: '#525252'
    },
    settingsTitleDark: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF'
    },
    settingsBackgroundDark: {
        backgroundColor: '#313131',
        flex: 1
    },
    settingsHeaderDark: {
        marginTop: 15,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    settingsIconDark: {
        height: 30,
        width: 30,
        marginTop: 9,
        marginLeft: 12
    },
    settingsItemDark: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        borderColor: '#525252'
    }
})