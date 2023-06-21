import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { colors } from '../colors';
import { useState, useContext } from 'react';
import { AppStateContext } from '../AppStateContext';

export default function WelcomeScreen({ navigation }) {
  function onPressHandler() {
    navigation.navigate('SelectCharacterScreen');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    overlay: {
      flex: 1,
      alignItems: 'center',
      marginTop: 250,
    },
    circle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black6,
      borderRadius: 100,
      width: 300,
      height: 100,
      shadowColor: colors.black6,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      opacity: 10,
    },
    icon: {
      width: 50,
      height: 60,
    },
    text: {
      marginTop: 20,
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: colors.green2,
      marginLeft: 10,
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <Pressable style={styles.container} onPress={onPressHandler}>
        <Image
          source={require('../assets/WelcomeScreenImage2.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <View intensity={70} tint="dark" style={styles.circle}>
            <Image
              source={require('../assets/AppIcon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Agrarian</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
