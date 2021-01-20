import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SearchScreen from './screens/SearchScreen';
import TransactionScreen from './screens/TransactionScreen';
import { createAppContainer, createSwitchNavigator } from "react-navigation"; 
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoginScreen from './screens/LogInScreen';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabNavigator = createBottomTabNavigator({
  Transaction : { screen : TransactionScreen },
  Search : { screen : SearchScreen },

},
{ 
  defaultNavigationOptions: ({navigation})=>({ 
    tabBarIcon: ()=>{ 
      const routeName = navigation.state.routeName; 
      console.log(routeName); 
      if(routeName === "Transaction"){
        return( 
          <Image 
            source={require("./assets/book.png")} 
            style={{width:40, height:40}} /> ) 
          } else if(routeName === "Search"){ 
            return( 
              <Image 
                source={require("./assets/searchingbook.png")} 
                style={{width:40, height:40}} 
              />
            ); 
          } 
        } 
      }) 
  });


const SwitchNavigator = createSwitchNavigator({
  LoginScreen : { screen : LoginScreen},
  TabNavigator : { screen : TabNavigator}
});

const AppContainer = createAppContainer(SwitchNavigator);
