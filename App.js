import React from 'react';
import { View } from 'react-native';
import Calculator from './src/screens/Calculator';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Calculator />
      </View>
    );
  }
}