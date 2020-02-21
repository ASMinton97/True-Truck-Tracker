import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Image, AsyncStorage, Button } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';
import { Overlay } from 'react-native-elements';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.onDarkThemeChange = this.onDarkThemeChange.bind(this);
        this.state = {
            switchValue: false,
            isVisible1: false,
            isVisible2: false,
            password: '',
            typedCurrentPassword: '',
            typedNewPassword: '',
            email: '',
            typedCurrentEmail: '',
            typedNewEmail: '',
            errorRendering: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("Password").then(response => {
            if (!response) {
                response = null
            } else {
                console.log('We got a password here');
            }
            this.setState({ password: response })
            console.log(response)
        })

        AsyncStorage.getItem("Email").then(response => {
            if (!response) {
                response = null
            } else {
                console.log('We got an email here');
            }
            this.setState({ email: response })
            console.log(response)
        })
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
                            onPress={() => { this.setState({ isVisible1: true }) }}
                        />
                        <SettingsList.Item
                            title='Change Email'
                            titleStyle={[(this.state.switchValue) ? styles.settingsItemDark : styles.settingsItemLight]}
                            backgroundColor={this.state.switchValue ? '#414141' : '#FFFFFF'}
                            onPress={() => { this.setState({ isVisible2: true }) }}
                        />
                    </SettingsList>
                    <Overlay
                        style={{ position: 'absolute' }}
                        isVisible={this.state.isVisible1}
                        onBackdropPress={() => this.setState({ isVisible1: false }, this.forceUpdate())}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginTop: 10, fontSize: 22, fontWeight: 'bold' }}>Change Password</Text>
                            <Text style={[this.state.errorRendering ? error.errorText : { marginTop: 30, fontSize: 16 }]}>Please enter current Password</Text>
                            <TextInput style={[this.state.errorRendering ? error.errorTextBox : { marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }]} autoCorrect={false} placeholder='Current Password' secureTextEntry={true} onChangeText={typedCurrentPassword => this.setState({ typedCurrentPassword })} />
                            <Text style={[this.state.errorRendering ? error.errorText : { marginTop: 30, fontSize: 16 }]}>Please enter new Password</Text>
                            <TextInput style={[this.state.errorRendering ? error.errorTextBox : { marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }]} autoCorrect={false} placeholder='New Password' secureTextEntry={true} onChangeText={typedNewPassword => this.setState({ typedNewPassword })} />
                            <Button
                                title='Change Password'
                                color='#FF4531'
                                onPress={this.changePassword}
                            />
                            <Text style={[this.state.errorRendering ? error.errorText : {opacity: 0}]}>Either your current Password does not match or your new Password is the same as your current Password</Text>
                        </View>
                    </Overlay>
                    <Overlay
                        style={{ position: 'absolute' }}
                        isVisible={this.state.isVisible2}
                        onBackdropPress={() => this.setState({ isVisible2: false }, this.forceUpdate())}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginTop: 10, fontSize: 22, fontWeight: 'bold' }}>Change Email</Text>
                            <Text style={[this.state.errorRendering ? error.errorText : { marginTop: 30, fontSize: 16 }]}>Please enter current Email</Text>
                            <TextInput style={[this.state.errorRendering ? error.errorTextBox : { marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }]} autoCorrect={false} placeholder='Current Email' secureTextEntry={false} onChangeText={typedCurrentEmail => this.setState({ typedCurrentEmail })} />
                            <Text style={[this.state.errorRendering ? error.errorText : { marginTop: 30, fontSize: 16 }]}>Please enter new Email</Text>
                            <TextInput style={[this.state.errorRendering ? error.errorTextBox : { marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }]} autoCorrect={false} placeholder='New Email' secureTextEntry={false} onChangeText={typedNewEmail => this.setState({ typedNewEmail })} />
                            <Button
                                title='Change Password'
                                color='#FF4531'
                                onPress={this.changeEmail}
                            />
                            <Text style={[this.state.errorRendering ? error.errorText : {opacity: 0}]}>Either your current Email does not match or your new Email is the same as your current Email</Text>
                        </View>
                    </Overlay>
                </View>
            </View>
        )
    }

    changePassword = () => {
        console.log(this.state.typedCurrentPassword);
        if (this.state.typedCurrentPassword != this.state.password) {
            this.setState({ errorRendering: true });
            this.forceUpdate();
        } else if (this.state.typedCurrentPassword == this.state.password && this.state.typedCurrentPassword != this.state.typedNewPassword) {
            let newPassword = this.state.typedNewPassword;
            AsyncStorage.setItem("Password", newPassword);
            this.setState({ isVisible1: false });
            if (this.state.errorRendering) {
                this.setState({ errorRendering: false });
            }
        }
    }

    changeEmail = () => {
        console.log(this.state.typedCurrentEmail);
        if (this.state.typedCurrentEmail != this.state.email) {
            console.log("The Email you typed was wrong")
            this.setState({ errorRendering: true });
            this.forceUpdate();
        } else if (this.state.typedCurrentEmail == this.state.email && this.state.typedCurrentEmail != this.state.typedNewEmail) {
            console.log("This should work?")
            let newEmail = this.state.typedNewEmail;
            AsyncStorage.setItem("Email", newEmail);
            this.setState({ isVisible2: false });
            if (this.state.errorRendering) {
                this.setState({ errorRendering: false });
            }
        }
    }

    onDarkThemeChange() {
        this.setState({ switchValue: !this.state.switchValue })

    }


}

const error = StyleSheet.create({
    errorText: {
        color: '#E82040',
        fontSize: 16,
        marginTop: 30
    },
    errorTextBox: {
        marginTop: 20,
        marginBottom: 50,
        borderBottomWidth: 1,
        width: 250,
        borderColor: '#E82040'
    }
})

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