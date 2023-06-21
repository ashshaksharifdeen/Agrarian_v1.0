import React, { useState, useContext } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { AppStateContext } from "../AppStateContext";

/**
 * ButtonComponent is a reusable component that renders a custom button.
 * @param {object} children - The content to be displayed inside the button.
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {object} BackgroundStyle - Custom styles for the button's background.
 * @param {object} TextStyle - Custom styles for the button's text.
 */
export default function ButtonComponent({ children, onPress, BackgroundStyle, TextStyle }) {
  const { colors } = useContext(AppStateContext);
  
  const styles = StyleSheet.create({
    background: {
      height: 50,
      width: "60%",
      margin: 10,
      backgroundColor: colors.black5,
      borderRadius: 10,
      justifyContent: "center",
      overflow: "hidden",
    },
    pressable: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: colors.black3,
      fontSize: 23,
      textAlign: "center",
    },
  });

  return (
    <View style={[styles.background, BackgroundStyle]}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: colors.black3 }}
        onPress={onPress}
      >
        <Text style={[styles.text, TextStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}


