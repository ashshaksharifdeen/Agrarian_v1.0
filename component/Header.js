import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import {AppStateContext} from '../AppStateContext';

/**
 * Header is a reusable component that renders the header of the app.
 */
export default function Header({navigation}) {
  const {colors, IsSignup} = useContext(AppStateContext);

  /**
   * Opens the drawer when the navigation button is pressed.
   */
  function openDrawerHandler() {
    navigation.openDrawer();
  }

  const styles = StyleSheet.create({
    greenBackground: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: 95,
      backgroundColor: colors.green3,
      paddingBottom: 5,
    },
    appNameContainer: {
      flexDirection: 'row',
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appIcon: {
      width: 35,
      height: 35,
      resizeMode: 'contain',
    },
    appNameContainerText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: colors.green1,
      marginLeft: 15,
    },
    icon: {
      marginTop: 25,
      width: 35,
      height: 35,
      resizeMode: 'contain',
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.greenBackground}
        colors={['#5E9A5C', '#385D37', '#1F331E', 'black']}>
        {IsSignup ? (
          <Pressable onPress={openDrawerHandler}>
            <Image
              source={require('../assets/NavigateIcon.png')}
              style={styles.icon}
            />
          </Pressable>
        ) : null}

        <View style={styles.appNameContainer}>
          <Image
            source={require('../assets/AppIcon.png')}
            style={styles.appIcon}
          />
          <Text style={styles.appNameContainerText}>Agrarian</Text>
        </View>

        {IsSignup ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/NotificationIcon.png')}
              style={[styles.icon, {height: 30, marginTop: 28}]}
            />
            <Pressable>
              <Image
                source={require('../assets/SearchIcon.png')}
                style={[styles.icon, {marginLeft: 10}]}
              />
            </Pressable>
          </View>
        ) : null}
      </LinearGradient>
    </>
  );
}
