import React, { useState } from 'react';
import { Animated, Text, View, TextInput, ScrollView } from 'react-native';
// import { ListItem, SearchBar } from 'react-native-elements';

class History extends React.Component {
  constructor() {
    super()
    const fadeAnim = new Animated.Value(0);
    this.state = {
      fadeAnim, // Initial value for opacity: 0
      searchInput: false,  // history search 
      searchText: '',
      filteredHistory: [],
    };
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidMount() {
    Animated.timing(                 
      this.state.fadeAnim,         
      {
        toValue: 1,             
        duration: 400,
        useNativeDriver: true,      
      }
    ).start();                       
  }

  componentWillUnmount() {
    let { fadeAnim } = this.state;
    fadeAnim.setValue(1);
    Animated.timing(           
      this.state.fadeAnim,       
      {
        toValue: 0,              
        duration: 400,       
        useNativeDriver: true,
      }
    ).start();
  }

  searchFilter(text) {
    let { historyList } = this.props;
    if (text) {
      const data = historyList.filter((item) => {
        return (
          item.equation.indexOf(text) > -1 || item.result.indexOf(text) > -1
        );
      });
      this.setState({
        filteredHistory: data,
        searchText: text,
      });
    }
    else {
      this.setState({
        searchInput: false,
        searchText: '',
      });
    }
  }

  render() {
    let { fadeAnim, searchInput, filteredHistory} = this.state;
    let { historyList } = this.props;
    console.log(filteredHistory)
    return (
      <Animated.View      
        style={{
          width: `${100} %`,
          height: `${100} %`,
          backgroundColor: 'white',
          position: 'absolute',
          opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          left: '0%',
          bottom: '0%',
          top: '5%',
          right: '80%',
        }}
      >
        
        <View>
          <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                margin: 20,
              }}
              placeholder="Search history"
              lightTheme
              round
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  searchInput: true,
                });
                this.searchFilter(text);
              }}
          />
        </View>

        <ScrollView>
          {
          (searchInput ? filteredHistory : historyList).map((item, index) => {
            const { equation, result} = item;
            return (
              <View
                key={index}
                style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, marginLeft: 15}}>
                <Text>{equation.toString()} = {result.toString()} </Text>
              </View>
            );
          })}
        </ScrollView>

      </Animated.View>
    );
  }
}

export default History;