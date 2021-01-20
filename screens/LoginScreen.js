import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state ={
            emailId : '',
            password : '',
        }
    }

    login = async(email,password) => {
        if(email && password) {
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email, password);
                if(response) {
                    this.props.navigation.navigate('Transaction');
                }
            }catch(error) {
                switch(error.code) {
                    case 'auth/user-not-found' :
                    Alert.alert("User doesn't exists");
                    console.log("User doesn't exists");
                    break
                    case 'auth/invalid/email' :
                    Alert.alert("Incorrect email or password");
                    console.log("Incorrect email or password");
                    break
                }
            }
        } else {
            Alert.alert("Enter Email and Password");
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style = {{ 
                alignItems : 'center',
                marginTop : 20}}>

                <View>

                    <Image style = {{width : 200, height : 200}}
                        source = {require("../assets/booklogo.jpg")}
                    />

                    <Text style = {{textAlign : 'center', fontSize : 30}}>Wily</Text>

                </View>

                <View>

                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = 'abc@example.com'
                        keyboardType = 'email-address'
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId : text
                            });
                        }}
                    />

                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = 'Enter Password'
                        secureTextEntry = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                password : text
                            });
                        }}
                    />

                </View>

                <View>

                    <TouchableOpacity 
                        onPress ={()=>{this.login(this.state.emailId, this.state.password)}}
                        style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                    >
                        <Text>Log in</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>
        );
    }
    
}

const styles = StyleSheet.create({ 
    loginBox: { 
        width: 300, 
        height: 40, 
        borderWidth: 1.5, 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 
    } 
});