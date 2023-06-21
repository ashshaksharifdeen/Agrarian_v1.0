import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import ButtonComponent from "../component/ButtonComponent";
import Header from "../component/Header";
import HeadingText from "../component/HeadingText";
import TextInputComponent from "../component/TextInputComponent";
import React, { useState, useContext } from "react";
import { AppStateContext } from "../AppStateContext";

export default function SignupScreen({ navigation }) {
  const { colors, SetIsSignup } = useContext(AppStateContext);

  function NavigateNextPage() {
    navigation.navigate("Home");
    // SetIsSignup(true);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    Text: {
      color: colors.black1,
      fontSize: 35,
      marginLeft: 40,
      marginTop: 40,
    },
    ButtonContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    Image: {
      marginTop: 35,
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/SignupImage.png")}
          style={styles.Image}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView>
            <HeadingText>Log in to Agrarian</HeadingText>
            <View style={styles.ButtonContainer}>
              <TextInputComponent placeholder="Username" />
              <TextInputComponent placeholder="Password" />
              <TextInputComponent placeholder="Re-enter Password" />
              <ButtonComponent
                BackgroundStyle={{ backgroundColor: colors.green3 }}
                TextStyle={{ color: colors.black6 }}
                onPress={NavigateNextPage}
              >
                Confirm
              </ButtonComponent>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}
