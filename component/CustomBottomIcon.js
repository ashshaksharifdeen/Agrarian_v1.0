import React, { useContext } from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import { AppStateContext } from "../AppStateContext";

/**
 * CustomBottomIcon is a reusable component that renders a custom bottom navigation icon.
 * @param {object} source - The source of the image for the icon.
 * @param {boolean} isFilled - Determines if the icon is filled or not.
 * @param {string} name - The name of the icon.
 * @param {object} style - Custom styles for the icon.
 * @param {function} onPress - The function to be called when the icon is pressed.
 */
export default function CustomBottomIcon({
  source,
  isFilled,
  name,
  style,
  onPress,
}) {
  const { colors } = useContext(AppStateContext);

  const styles = StyleSheet.create({
    pressableContainer: {
      borderRadius: 20,
      flex: 1,
      overflow: "hidden",
      height: 70,
    },
    backgroundIcon: {
      flex: 1,
      backgroundColor: colors.black5,
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundIconText: {
      color: colors.black7,
      fontSize: 17,
    },
    icon: {
      width: 35,
      height: 35,
      resizeMode: "contain",
    },
    ripple: {
      color: colors.black4,
    },
    filledText: {
      fontWeight: "bold",
      color: colors.black1,
    },
  });

  return (
    <View style={styles.pressableContainer}>
      <Pressable
        android_ripple={styles.ripple}
        style={styles.backgroundIcon}
        onPress={onPress}
      >
        <Image source={source} style={[styles.icon, style]} />
        <Text
          style={[
            styles.backgroundIconText,
            isFilled ? styles.filledText : styles.defaultText,
          ]}
        >
          {name}
        </Text>
      </Pressable>
    </View>
  );
}
