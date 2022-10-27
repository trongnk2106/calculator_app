import React, { useState } from 'react';
import { Animated, Text, View, TextInput } from 'react-native';
// import { ListItem, SearchBar } from 'react-native-elements';

class FadeInView extends React.Component {
  constructor() {
    super()
    const fadeAnim = new Animated.Value(0);
    this.state = {
      fadeAnim, // Initial value for opacity: 0
    };
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

  render() {
    let { fadeAnim } = this.state;
    let { historyList } = this.props;

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
          bottom: '5%',
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
            placeholder="Type Here!"
            lightTheme
            round
            autoCorrect={false}
            //onChangeText={(newText) => setText(newText)}
            //defaultValue={text}
        />
      </View>

      {historyList.map((h, idx) => {
        const { equation, result} = h;
        return (
            <View key={idx} style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, marginLeft: 15}}>
              <Text>{equation} = {result} </Text>
            </View>
        );
      })}

      </Animated.View>
    );
  }
}

export default FadeInView;