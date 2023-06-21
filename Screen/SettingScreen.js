import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { colors } from '../colors';
import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import { Dimensions } from 'react-native';
import { Data } from '../Data';

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../AppStateContext';
import { BlurView } from '@react-native-community/blur';

export default function SettingScreen({ navigation }) {
  const { colors } = useContext(AppStateContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    textContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.black4 }}>
      <Header navigation={navigation} />
      <View style={[{ overflow: 'hidden', width: 200, height: 100 }]}>
        {/* <Image source={yourImageSource} style={styles.image} /> */}
        <Text style={styles.text}>Your Text Here</Text>
      </View>
      <View style={{ flex: 1 }}></View>
      <BottomComponent navigation={navigation} />
    </View>
  );
}
