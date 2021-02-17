import React from 'react';
import { View, Text,  TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase'
import * as Google from 'expo-google-app-auth'
//import { Left } from 'native-base';

export default class LoginScreen extends React.Component{

     static navigationOptions = {
         //header: null
         headerShown: false
     }

    state ={
        email:"",
        password:"",
        errorMessage:null
        
    };
    handleLogin = () => {
        const {email, password} = this.state
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error => this.setState({errorMessage:error.message}));

    };
    
    onSignIn =  googleUser => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
              );
          // Sign in with credential from the Google user.
          firebase.auth().signInWithCredential(credential)
          .then(function(result){
            console.log('user logged in');
            firebase
                .database()
                .ref('/users' +  result.user.id)
                .set({
                  gmail: result.user.email,
                  profile_picture:result.additionalUserInfo.profile.picture,
                  locale:result.additionalUserInfo.profile.locale,
                  first_name : result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
             })
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this));
    }
    
    //
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
     
    
      // For Google 
    signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
           // behavior: 'web',
//scopes: ['profile', 'email'],
//androidClientId: Expo.Constants.appOwnership === 'standalone' ? PROPERTIES.ANDROID_STAND_ALONE_APP_CLIENT_ID : PROPERTIES.ANDROID_CLIENT_ID,
//iosClientId: Expo.Constants.appOwnership === 'standalone' ? PROPERTIES.IOS_STAND_ALONE_APP_CLIENT_ID : PROPERTIES.IOS_CLIENT_ID,
//androidStandaloneAppClientId: PROPERTIES.ANDROID_STAND_ALONE_APP_CLIENT_ID,
//iosStandaloneAppClientId: PROPERTIES.IOS_STAND_ALONE_APP_CLIENT_ID,
//webClientId: '373083665239-eh9m350s3odbn564qbu66lp4rn8ivo2k.apps.googleusercontent.com'
            //androidStandaloneAppClientId:'373083665239-f5tqms3e9bgilfuap36l1fm684ucfbl2.apps.googleusercontent.com',
            //behavior:web,
            androidClientId: '373083665239-unc9a8mhcqc4ikgvlh3lfacltjou4o1p.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      };

     


      
    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={styles.container}>
            <StatusBar barStyle="light-content"></StatusBar>
            
            <Image 
            source={require("../assets/authlogo.png")} 
            style={{marginTop:-550, marginLeft:-200}}>
               
            </Image>

            <Image 
            source={require("../assets/footer.png")} 
            style={{position:"absolute", bottom:-775, right: -225}}>
               
            </Image>

            <Text style={styles.greeting}>{'RonuApp'} </Text>

            <View style={styles.errorMessage}>
    {this.state.errorMessage &&  <Text style={styles.error}>{this.state.errorMessage}</Text>} 
            </View>

            <View style={styles.form}>
                <View>
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
            
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                <Text style={{color:"#FFF", fontWeight:"500"}}>Sign in</Text>
            </TouchableOpacity>
             
            <Text style={{fontWeight:"500", color:"#fff"}}></Text>

            <TouchableOpacity style={styles.button} onPress={this.signInWithGoogleAsync}>                 
                <Text style={{fontWeight:"500", color:"#fff"}}> Sign-In With Google</Text> 
            </TouchableOpacity>

            <Text style={{fontWeight:"500", color:"#fff"}}></Text>

            <TouchableOpacity style={styles.button} >                 
                <Text style={{fontWeight:"500", color:"#fff"}}> Sign-In With Facebook</Text> 
            </TouchableOpacity>


            

            <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={ () => this.props.navigation.navigate("Register")}>
                <Text style={{color:"#414959", fontSize:13}}> New at RonuApp? 
                <Text style={{fontWeight:"500", color:"#E9446A"}}> Register</Text> </Text>
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
        marginTop: -100,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"

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
    }
})