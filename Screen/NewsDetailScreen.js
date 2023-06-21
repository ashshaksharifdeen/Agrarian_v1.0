import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {BlurView} from 'expo-blur';
import {Dimensions} from 'react-native';
import {Data} from '../Data';

import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import {AppStateContext} from '../AppStateContext';

export default function NewsDetailScreen({navigation, route}) {
  const {colors} = useContext(AppStateContext);
  const index = route.params.NewsIndex;
  const newsItem = Data.News[index];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    imageContainer: {
      flex: 1,
      marginVertical: 10,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    contentContainer: {
      flex: 1.5,
      padding: 20,
    },
    heading: {
      fontSize: 20,
      color: colors.black1,
    },
    description: {
      fontSize: 16,
      color: colors.black3,
      margin: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.imageContainer}>
        <Image source={newsItem.path} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <Text style={styles.heading}>{newsItem.heading}</Text>
          <Text style={styles.description}>{newsItem.description}</Text>
        </ScrollView>
      </View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
