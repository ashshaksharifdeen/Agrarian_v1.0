import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AppStateContext} from '../AppStateContext';
import HeadingText from './HeadingText';
import DrawerButtonComponent from './DrawerButtonComponent';
import Icon from 'react-native-vector-icons/Entypo';
import {Data} from '../Data';
import { useNavigation } from '@react-navigation/native';
/**
 * DrawerContentComponent is a reusable component that renders the content for a custom drawer.
 */
const DrawerContentComponent = () => {
  const navigation = useNavigation();
  const {colors, theme, SetTheme,SetIsSignup,userId} = useContext(AppStateContext);

  /**
   * Toggles the theme between light and dark.
   */
  function toggleTheme() {
    if (theme === 'dark') {
      SetTheme('light');
    } else if (theme === 'light') {
      SetTheme('dark');
    }
  }

  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.black6,
      // padding: 20,
    },
    profileContainer: {
      width: '100%',
      height: 250,
      // padding:20,
      paddingTop: 50,
      backgroundColor: colors.black5,
      // borderRadius: 20,
      justifyContent: 'center',
    },
    profileText: {
      color: colors.black3,
      // textAlign: 'center',

      fontSize: 35,
      marginLeft: 20,
      marginTop: 10,
      // margin:20
    },
    flexContainer: {
      flex: 1,
    },
  });

  const iconName = theme === 'light' ? 'light-down' : 'light-up';
  const buttonName = theme === 'light' ? 'Dark Mode' : 'Light Mode';
function logout(){
  navigation.navigate('WelcomeScreen')
  SetIsSignup(false)
}
// console.log(userId)
const user =Data.user.find(user=>user.username==userId)
// console.log()
  return (
    <View style={styles.drawerContainer}>
      {/* <View style={styles.flexContainer} /> */}

      <View style={[styles.flexContainer, {flex: 15, alignItems: 'center'}]}>
        <View
          style={[
            styles.profileContainer,
            {paddingLeft: 20, marginBottom: 20},
          ]}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.black5,
              overflow: 'hidden',
            }}>
            <Image
              source={Data.user[0].profileImgPath}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
          <Text style={styles.profileText}>{user.name}</Text>
          <Text
            style={{
              color: colors.black3,
              fontSize: 20,
              marginLeft: 30,
              marginTop: 0,
            }}>
            {user.profile}
          </Text>
        </View>

        <DrawerButtonComponent name={buttonName} onPress={toggleTheme}>
          <Icon
            name={iconName}
            size={30}
            color={colors.black2}
            style={{marginLeft: 30}}
          />
        </DrawerButtonComponent>

        <DrawerButtonComponent name="Language">
          <Icon
            name="language"
            size={30}
            color={colors.black2}
            style={{marginLeft: 30}}
          />
        </DrawerButtonComponent>
        <View style={styles.flexContainer} />
        <DrawerButtonComponent name="Logout"
        BackgroundStyle={{width:'60%'}} onPress={logout}>
          <Icon
            name="log-out"
            size={30}
            color={colors.black2}
            style={{marginLeft: 30}}
          />
        </DrawerButtonComponent >
      </View>

      <View style={styles.flexContainer} />
    </View>
  );
};

export default DrawerContentComponent;
