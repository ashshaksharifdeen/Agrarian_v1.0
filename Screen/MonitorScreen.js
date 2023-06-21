import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, FlatList, Pressable} from 'react-native';
import {BlurView} from 'expo-blur';
import {Dimensions} from 'react-native';
import {Data} from '../Data';

import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import {AppStateContext} from '../AppStateContext';

export default function MonitorScreen({navigation, route}) {
  const {colors} = useContext(AppStateContext);

  function renderFlatListItem({item, style, index}) {
    function onPressHandler() {
      navigation.navigate('IndexesDetailScreen', {NewsIndex: index});
    }

    return (
      <View style={[styles.flatListItemContainer, style]}>
        <Pressable
          style={[styles.flatListItem, {backgroundColor: colors.black5}]}
          android_ripple={{color: colors.black3}}
          onPress={onPressHandler}>
          <View style={styles.flatListImageContainer}>
            <Image source={item.path} style={styles.flatListImage} />
          </View>
          <View style={styles.flatListContentContainer}>
            <View style={styles.flatListTopRow}>
              <Text style={styles.flatListTopText}>
                {item.name} : {item.value}
              </Text>
              <Text style={styles.flatListTopText}>{item.classification}</Text>
            </View>
            <Text style={styles.flatListNormalRange}>
              Range {item.normal_range[0]} - {item.normal_range[1]}
            </Text>
            <Text style={styles.flatListFullName}>{item.full_name}</Text>
          </View>
        </Pressable>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    mapHeading: {
      marginBottom: 10,
      marginTop: 0,
    },
    mapContainer: {
      flex: 1,
      marginHorizontal: 30,
      marginVertical: 0,
      borderColor: colors.black1,
    },
    mapImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      borderRadius: 20,
    },
    indexesContainer: {
      flex: 2,
    },
    indexesHeading: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 5,
    },
    flatListContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
    flatListItemContainer: {
      overflow: 'hidden',
      borderRadius: 10,
      marginVertical: 10,
    },
    flatListItem: {
      height: 130,
      flexDirection: 'row',
      paddingVertical: 10,
    },
    flatListImageContainer: {
      flex: 1,
      marginVertical: 10,
      marginRight: 20,
    },
    flatListImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 8,
    },
    flatListContentContainer: {
      flex: 1.5,
      marginVertical: 10,
      marginHorizontal: 20,
    },
    flatListTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    flatListTopText: {
      color: colors.black2,
      fontSize: 22,
      fontWeight: 'bold',
    },
    flatListNormalRange: {
      color: colors.black3,
      fontSize: 16,
    },
    flatListFullName: {
      color: colors.black8,
      fontSize: 16,
      textDecorationLine: 'underline',
    },
  });
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <HeadingText style={styles.mapHeading}>Map</HeadingText>
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/MonitorScreenMap.png')}
          style={styles.mapImage}
        />
      </View>
      <View style={styles.indexesContainer}>
        <HeadingText style={styles.indexesHeading}>Indexes</HeadingText>
        <View style={styles.flatListContainer}>
          <FlatList
            data={Data.indexes}
            renderItem={renderFlatListItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
