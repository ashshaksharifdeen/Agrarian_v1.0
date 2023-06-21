import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import {AppStateContext} from '../AppStateContext';
import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import Carousel from 'react-native-reanimated-carousel';
import {BlurView} from '@react-native-community/blur';
import {Data} from '../Data';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function HomeScreen({navigation, route}) {
  // const user = route.par


  // const user = route.params.user;
  // console.log(route.params)
  const {colors} = useContext(AppStateContext);
  const width = Dimensions.get('window').width;

  function OpenDrawerHandler() {
    navigation.openDrawer();
  }

  function onPressHandler(index) {
    navigation.navigate('NewsDetailScreen', {NewsIndex: index});
  }

  function renderCarouselItem({item, style, index}) {
    return (
      <Pressable
        style={styles.carouselItemContainer}
        onPress={() => onPressHandler(index)}>
        <Image style={styles.carouselItemImage} source={item.path} />
        <View style={styles.carouselItemTextContainer}>
          <BlurView
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="black"
            style={styles.carouselItemTextBlurView}>
            <Text style={styles.carouselItemText}>{item.heading}</Text>
          </BlurView>
        </View>
      </Pressable>
    );
  }

  function renderFlatListItem({item, style, index}) {
    function onPressHandler() {
      navigation.navigate('NewsDetailScreen', {NewsIndex: index});
    }
    return (
      <View style={styles.flatListItemContainer}>
        <Pressable
          style={styles.flatListItemPressable}
          android_ripple={{color: colors.black3}}
          onPress={onPressHandler}>
          <View style={styles.flatListItemTextContainer}>
            <Text style={styles.flatListItemText}>{item.heading}</Text>
          </View>
          <View style={styles.flatListItemImageContainer}>
            <Image source={item.path} style={styles.flatListItemImage} />
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
    contentContainer: {
      flex: 1,
      borderColor: colors.black3,
    },
    headingText: {
      marginTop: 10,
      marginLeft: 20,
      fontSize: 30,
    },
    carouselRootView: {
      flex: 1,
    },
    carousel: {
      borderColor: colors.black3,
    },
    carouselItemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    carouselItemImage: {
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
      height: 100,
      backgroundColor: colors.black5,
      borderRadius: 5,
    },
    carouselItemTextContainer: {
      position: 'absolute',
      bottom: 10,
      width: '85%',
      padding: 5,
      borderRadius: 10,
      backgroundColor: colors.black5,
      overflow: 'hidden',
    },
    carouselItemTextBlurView: {
      borderWidth: 0,
    },
    carouselItemText: {
      color: 'white',
      fontSize: 20,
    },
    flatListContainer: {
      borderColor: colors.black2,
      flex: 1.7,
      margin: 20,
    },
    flatListItemContainer: {
      overflow: 'hidden',
      borderRadius: 10,
      marginVertical: 10,
    },
    flatListItemPressable: {
      backgroundColor: colors.black5,
      height: 120,
      flexDirection: 'row',
    },
    flatListItemTextContainer: {
      flex: 2,
      marginVertical: 10,
      marginHorizontal: 20,
    },
    flatListItemText: {
      color: colors.black2,
      fontSize: 18,
    },
    flatListItemImageContainer: {
      flex: 1.5,
      marginVertical: 10,
      marginRight: 20,
    },
    flatListItemImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.contentContainer}>
        <HeadingText style={styles.headingText}>Breaking</HeadingText>
        <GestureHandlerRootView style={styles.carouselRootView}>
          <Carousel
            style={styles.carousel}
            loop
            width={width}
            height={220}
            autoPlay={true}
            data={Data.News}
            scrollAnimationDuration={2000}
            mode="parallax"
            renderItem={renderCarouselItem}
            parallaxScrollingOffset={100}
          />
        </GestureHandlerRootView>

        <HeadingText style={styles.headingText}>Recommendation</HeadingText>
        <View style={styles.flatListContainer}>
          <FlatList
            data={Data.News}
            renderItem={renderFlatListItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
