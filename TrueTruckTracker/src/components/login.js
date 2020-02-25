import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Button, AsyncStorage, Linking, TextInput } from 'react-native';
import RegisterPage from './register';
import PlacesPage from './places';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Login extends React.Component {
    static navigationOptions={
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            typedUsername: '',
            typedPassword: '',
            Username: '',
            Password: '',
            Email: '',
        }
    }

    componentDidMount() {
        AsyncStorage.multiGet(["Username", "Email", "Password"]).then(response => {
            if (!response) {
                response = ':('
            } else {
                console.log("Hey this worked?")
            }
            this.setState({ Username: response[0][1] });
            this.setState({ Email: response[1][1] });
            this.setState({ Password: response[2][1] });
            console.log(response)
            //AsyncStorage.multiRemove(["Username", "Email", "Password"]);
        });
    }
    

    render() {
        return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FF4531' }}>
                    <View style={{ flex: .6, marginVertical: 20, marginHorizontal: 20, borderWidth: 3, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, color: '#000' }}>True Truck Tracker</Text>
                        <Text style={{ marginTop: 30, fontSize: 17 }}>Login</Text>
                        <TextInput style={{ marginTop: 30, borderBottomWidth: 1, width: 250 }} autoCompleteType='username' autoCorrect={false} placeholder='Username' onChangeText={typedUsername => this.setState({ typedUsername })} />
                        <TextInput style={{ marginTop: 20, marginBottom: 50, borderBottomWidth: 1, width: 250 }} autoCorrect={false} placeholder='Password' secureTextEntry={true} onChangeText={typedPassword => this.setState({ typedPassword })} />
                        <Button
                            title='Login'
                            color='#FF4531'
                            onPress={this.checkLogin}
                        />
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Register')}}>
                            <TextInput style={{ marginTop: 20, marginBottom: 50, width: 250, textAlign: 'center', color: '#E85220' }} editable={false} defaultValue='No account? Register Here!' />
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    checkLogin = () => {
        console.log('This is the Username: ' + this.state.Username);
        console.log('This is the Password: ' + this.state.Password);
        if (this.state.Username == this.state.typedUsername && this.state.Password == this.state.typedPassword) {
            console.log("Oh hey you can login");
            this.props.navigation.navigate('Places');
        } else {
            console.log('This is the Username: ' + this.state.Username);
            console.log('This is the Password: ' + this.state.Password);
            console.log('Try again please');
        }
    }
}

class Register extends React.Component{
    static navigationOptions = {
        headerShown: false
    }
    render(){
        return(
            <RegisterPage/>
        )
    }
}

class Places extends React.Component{
    static navigationOptions = {
        headerShown: false
    }
    render(){
        return(
            <PlacesPage/>
        )
    }
}

const AppNavigator = createStackNavigator({
    Login: Login,
    Register: Register,
    Places: Places
},
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AppNavigator);