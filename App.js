import React, { useState, useContext } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AppStateProvider } from './AppStateContext';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from './Screen/WelcomeScreen';
import SelectCharacterScreen from './Screen/SelectCharacterScreen';
import LoginScreen from './Screen/LoginScreen';
import SignupScreen from './Screen/SignupScreen';
import HomeScreen from './Screen/HomeScreen';
import NewsDetailScreen from './Screen/NewsDetailScreen';
import MonitorScreen from './Screen/MonitorScreen';
import InsightScreen from './Screen/InsightScreen';
import MentorScreen from './Screen/MentorScreen';
import IndexesDetailScreen from './Screen/IndexesDetailScreen';
import SettingScreen from './Screen/SettingScreen';
import { colors } from './colors';
import { AppStateContext } from '../AppStateContext';
import DrawerContentComponent from './component/DrawerContentComponent';
import MessageDetailScreen from './Screen/MessageDetailScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
      <Stack.Screen name="MonitorScreen" component={MonitorScreen} />
      <Stack.Screen name="InsightScreen" component={InsightScreen} />
      <Stack.Screen name="MentorScreen" component={MentorScreen} />
      <Stack.Screen name="MessageDetailScreen" component={MessageDetailScreen} />
      <Stack.Screen name="IndexesDetailScreen" component={IndexesDetailScreen} />
    </Stack.Navigator>
  );
}

function DrawNav() {
  return (
    <Drawer.Navigator drawerContent={DrawerContentComponent} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeItems" component={DrawerNavigator} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: colors.black5,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default function App() {
  const [ActiveScreen, SetActiveScreen] = useState(1);
  // const {colors} = useContext(AppStateContext);
  return (
    <AppStateProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          {/* <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
          <Stack.Screen name="Home" component={DrawNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}
