/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native'
import Navigation from './src/router/navigation'

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1}}>
      <Navigation />
    </View>
  );
};

export default App;
