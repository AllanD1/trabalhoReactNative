import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Home } from './screens/Home'
import { Detalhe } from './screens/Detalhe'



const App = StackNavigator({
  Home: { screen: Home },
  Detalhe: { screen: Detalhe }
});

AppRegistry.registerComponent('TrabalhoReact', () => App);