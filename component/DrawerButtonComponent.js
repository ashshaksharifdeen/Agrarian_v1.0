import React, {useContext} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {AppStateContext} from '../AppStateContext';

/**
 * DrawerButtonComponent is a reusable component that renders a custom drawer button.
 * @param {object} children - The content to be displayed inside the button.
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {object} BackgroundStyle - Custom styles for the button's background.
 * @param {object} TextStyle - Custom styles for the button's text.
 * @param {string} name - The name of the button.
 */
export default function DrawerButtonComponent({
  children,
  onPress,
  BackgroundStyle,
  TextStyle,
  name,
}) {
  const {colors} = useContext(AppStateContext);

  const styles = StyleSheet.create({
    background: {
      height: 50,
      width: '90%',
      margin: 10,
      backgroundColor: colors.black5,
      borderRadius: 10,
      justifyContent: 'center',
      overflow: 'hidden',
    },
    pressable: {
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
    },
    text: {
      color: colors.black3,
      fontSize: 23,
      textAlign: 'center',
      marginLeft: 15,
    },
  });

  return (
    <View style={[styles.background, BackgroundStyle]}>
      <Pressable
        style={styles.pressable}
        android_ripple={{color: colors.black3}}
        onPress={onPress}>
        <View style={styles.content}>
          {children}
          <Text style={[styles.text, TextStyle]}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
}
