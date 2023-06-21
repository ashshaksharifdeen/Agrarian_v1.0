import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppStateContext } from "../AppStateContext";

/**
 * HeadingText is a reusable component that renders a heading text.
 */
export default function HeadingText({ children, style }) {
  const { colors } = useContext(AppStateContext);

  const styles = StyleSheet.create({
    text: {
      color: colors.black2,
      fontSize: 35,
      marginLeft: 40,
      marginTop: 25,
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
}
