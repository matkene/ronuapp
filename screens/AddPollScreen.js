import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../config/Firebase';

class AddPollScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('polls');
    this.state = {
      name: '',
      answer1: '',
      answer2: '',
      category: '',
      creator: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storePoll() {
    if(this.state.name === ''){
     alert('Fill in a Poll question!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        creator: this.state.creator,
        answer1: this.state.answer1,
        answer2: this.state.answer2,
        category: this.state.category,
      }).then((res) => {
        this.setState({
        name: '',
        answer1: '',
        answer2: '',
        category: '',
        creator: '',
        isLoading: false,
        });
        this.props.navigation.navigate('PollScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Enter the Poll Questions'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput              
              placeholder={'Creator Email'}
              value={this.state.creator}
              onChangeText={(val) => this.inputValueUpdate(val, 'creator')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Enter Yes/True'}
              value={this.state.answer1}
              onChangeText={(val) => this.inputValueUpdate(val, 'answer1')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Enter No/False'}
              value={this.state.answer2}
              onChangeText={(val) => this.inputValueUpdate(val, 'answer2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Enter Category'}
              value={this.state.category}
              onChangeText={(val) => this.inputValueUpdate(val, 'category')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Polls'
            onPress={() => this.storePoll()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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

export default AddPollScreen;