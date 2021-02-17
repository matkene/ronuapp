import React from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component{
    static navigationOptions = {
       // header: null
        headerShown: false
    }
    state ={
        name:"",
        email:"",
        password:"",
        errorMessage:null
        
    };
    
    handleSignup = () =>{
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials =>{
            return userCredentials.user.updateProfile({
                displayName:this.state.name
            });
        })
        .catch(error => this.setState({errorMessage:error.message}));
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar barStyle="light-content"></StatusBar>  

            <Image 
            source={require("../assets/authlogo.png")} 
            style={{marginTop:-580, marginLeft:-200}}>
               
            </Image>

            <Image 
            source={require("../assets/footer.png")} 
            style={{position:"absolute", bottom:-775, right: -225}}>
               
            </Image>

            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={32} color="#fff"></Ionicons>

            </TouchableOpacity>
            
            <Text style={styles.greeting}>{'RonuApp'} </Text>
            
  
            

            <View style={styles.errorMessage}>
    {this.state.errorMessage &&  <Text style={styles.error}>{this.state.errorMessage}</Text>} 
            </View>

            <View style={styles.form}>
                <View>
                    <Text style ={styles.inputTitle}>Full Name</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={name=>this.setState({name})}
                    value={this.state.name}></TextInput>
                </View>

                <View style={{marginTop:32}}>
                    <Text style ={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={email=>this.setState({email})}
                    value={this.state.email}></TextInput>
                </View>

                <View style={{marginTop:32}}>
                    <Text style ={styles.inputTitle}>Password</Text>
                    <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    onChangeText={password=>this.setState({password})}
                    value={this.state.password}></TextInput>
                </View>
                
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                <Text style={{color:"#FFF", fontWeight:"500"}}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={ () => this.props.navigation.navigate("Login")}>
                <Text style={{color:"#414959", fontSize:13}}>Have an account in RONUApp ? 
                <Text style={{fontWeight:"500", color:"#E9446A"}}> Login</Text> </Text>
            </TouchableOpacity>
            
            </View>

            
       );
    }
} 
const styles = StyleSheet.create({
    container: {
        flex: 1     
        
    },
    greeting:{
        marginTop: -80,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
        //color:"#fff"

    },
    errorMessage:{
        height: 72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30

    },
    error:{
        color:"#E9446A",
        fontSize:14,
        fontWeight:"600",
        textAlign:"center"

    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize:10,
        textTransform:"uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:30,
        fontSize:14,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:32,
        alignItems:"center",
        justifyContent:"center"
    },
    back:{
        position:"absolute",
        top:55,
        left:12,
        width:15,
        height:15,
        borderRadius:16,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(21,22,48,0.1)"

    }
})