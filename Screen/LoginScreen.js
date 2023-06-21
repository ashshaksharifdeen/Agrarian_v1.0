import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AppStateContext} from '../AppStateContext';
import ButtonComponent from '../component/ButtonComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import TextInputComponent from '../component/TextInputComponent';
import {Data} from '../Data';
export default function LoginScreen({navigation}) {
  const {colors, SetIsSignup, setUserId} = useContext(AppStateContext);

  const NavigateNextPage = () => {
    // navigation.navigate("SignupScreen");
    navigation.navigate('Home');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    text: {
      color: colors.black1,
      fontSize: 35,
      marginLeft: 40,
      marginTop: 40,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    image: {
      marginTop: 35,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the entered username and password match any user data
    const user = Data.user.find(
      user => user.username === username && user.password === password,
    );

    if (user) {
      // Mark the user as logged in
      user.isLogin = true;

      // Navigate to the next page
      // Add the navigation logic here
      console.log('User logged in successfully!');
      // navigation.navigate("SignupScreen");
      SetIsSignup(true);
      // console.log(user.name);
      setUserId(user.username);
      navigation.navigate('Home');
    } else {
      console.log('Invalid username or password.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{flex: 1}}>
        <Image
          source={require('../assets/LoginImage.png')}
          style={styles.image}
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView>
            <HeadingText style={styles.text}>Login</HeadingText>
            <View style={styles.buttonContainer}>
              <TextInputComponent
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                // ref={}
              />
              <TextInputComponent
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {/* <TextInputComponent placeholder="Password" /> */}
              <ButtonComponent
                title="Confirm"
                onPress={handleLogin}
                BackgroundStyle={{backgroundColor: colors.green3}}
                TextStyle={{color: colors.black6}}
                // onPress={NavigateNextPage}
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
