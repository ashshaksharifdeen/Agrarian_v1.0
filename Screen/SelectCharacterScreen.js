import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppStateContext } from '../AppStateContext';

import ButtonComponent from '../component/ButtonComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';

export default function SelectCharacterScreen({ navigation }) {
  const { colors } = useContext(AppStateContext);

  function navigateFarmer() {
    navigation.navigate('LoginScreen');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    text: {
      color: colors.black1,
      fontSize: 35,
      marginLeft: 40,
      marginTop: 50,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header navigation={navigation} />
      <HeadingText>Login As</HeadingText>
      <View style={styles.buttonContainer}>
        <ButtonComponent onPress={navigateFarmer}>Farmer</ButtonComponent>
        <ButtonComponent>Mentor</ButtonComponent>
      </View>
    </View>
  );
}
