import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { AppStateContext } from '../AppStateContext';
import CustomBottomIcon from './CustomBottomIcon';

/**
 * BottomComponent is a component that renders the bottom navigation bar.
 * It displays different icons based on the current route and handles navigation between screens.
 * @param {object} navigation - The navigation object from React Navigation.
 * @param {object} route - The route object from React Navigation.
 */
export default function BottomComponent({ navigation, route }) {
  const { colors } = useContext(AppStateContext);

  // Styles for the component
  const styles = StyleSheet.create({
    background: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      height: 90,
      backgroundColor: colors.black5,
    },
  });

  return (
    <View style={styles.background}>
      {/* Home Icon */}
      {route.name === 'HomeScreen' ? (
        <CustomBottomIcon
          source={require('../assets/HomeIconFilled.png')}
          isFilled={true}
          name={'Home'}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
      ) : (
        <CustomBottomIcon
          source={require('../assets/HomeIcon.png')}
          isFilled={false}
          name={'Home'}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
      )}

      {/* Monitor Icon */}
      {route.name === 'MonitorScreen' ? (
        <CustomBottomIcon
          source={require('../assets/MonitorIconFilled.png')}
          isFilled={true}
          name={'Monitor'}
          style={{ width: 60 }}
          onPress={() => {
            navigation.navigate('MonitorScreen');
          }}
        />
      ) : (
        <CustomBottomIcon
          source={require('../assets/MonitorIcon.png')}
          isFilled={false}
          name={'Monitor'}
          style={{ width: 60 }}
          onPress={() => {
            navigation.navigate('MonitorScreen');
          }}
        />
      )}

      {/* Insight Icon */}
      {route.name === 'InsightScreen' ? (
        <CustomBottomIcon
          source={require('../assets/InsightIconFilled.png')}
          isFilled={true}
          name={'Insight'}
          onPress={() => {
            navigation.navigate('InsightScreen');
          }}
        />
      ) : (
        <CustomBottomIcon
          source={require('../assets/InsightIcon.png')}
          isFilled={false}
          name={'Insight'}
          onPress={() => {
            navigation.navigate('InsightScreen');
          }}
        />
      )}

      {/* Mentor Icon */}
      {route.name === 'MentorScreen' ? (
        <CustomBottomIcon
          source={require('../assets/MentorIconFilled.png')}
          isFilled={true}
          name={'Mentor'}
          onPress={() => {
            navigation.navigate('MentorScreen');
          }}
        />
      ) : (
        <CustomBottomIcon
          source={require('../assets/MentorIcon.png')}
          isFilled={false}
          name={'Mentor'}
          onPress={() => {
            navigation.navigate('MentorScreen');
          }}
        />
      )}
    </View>
  );
}
