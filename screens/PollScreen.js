// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
//import { ListItem } from 'react-native-elements'
import firebase from '../config/Firebase';

class PollScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('polls');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, answer1, answer2,category,creator} = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        answer1,
        answer2,
        category,
        creator,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
        <View>
          {
            this.state.userArr.map((item, i) => {
              return (
                <View>  
                  <TouchableOpacity onPress= {() => {
                    this.props.navigation.navigate('PollDetailScreen', {
                      userkey: item.key  })}}>                
                  <View style ={styles.input}>                  
                        <Text> {item.name} </Text>
                        <Text> {item.answer1} </Text>
                        <Text> {item.answer2} </Text> 
                 <TouchableOpacity style={styles.button} onPress={this.signInWithGoogleAsync}>                 
                <Text style={{fontWeight:"500", color:"#ddd"}}>Vote</Text> 
                </TouchableOpacity>                                           
                  </View>  
                  </TouchableOpacity>                 

                  </View>
                  
              );     

            })
          }
          <TouchableOpacity style={{alignSelf:"center", marginTop:32}} onPress={ () => this.props.navigation.navigate("Login")}>
                   <Text style={{color:"#414959", fontSize:13}}> New at RonuApp? 
                   <Text style={{fontWeight:"500", color:"#E9446A"}}> Login</Text> </Text>
                  </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  input: {
    flex: 1,
    padding: 5,
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color:'blue'
  },button:{
    marginHorizontal:30,
    backgroundColor:"#E9446A",
    borderRadius:4,
    height:32,
    alignItems:"flex-start"
    //justifyContent:"flex-start"
},
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PollScreen;