/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createSwitchNavigator} from 'react-navigation'
import {Login,Home} from './app/container/index'

type Props = {};

const RootStack = createStackNavigator(
  {
    Home:{
      screen: Home,
    },
  },
  {
    initialRouteName: 'Home',
    portraitOnlyMode: true
  }
);

// const Drawerbable= DrawerNavigator({
//   Stack: {
//     screen: RootStack,
//     navigationOptions: {
//       gesturesEnabled: false,
//   }
//   },
// }, {
//   contentComponent: SideMenu,
//   drawerWidth: 300,
//   initialRouteName: 'Stack',
//   portraitOnlyMode: true,
  
// })

const Sw=createSwitchNavigator(
  {
    // Load:Views,
    App: RootStack,
    Login: Login,
  },
  {
    initialRouteName: 'Login',
  }
)

export default class App extends Component<Props> {
  render() {
    return (
      <Sw/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
