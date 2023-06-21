import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import {colors} from '../colors';

import Icon from 'react-native-vector-icons/Ionicons';
import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import {Data} from '../Data';

import {AppStateContext} from '../AppStateContext';

export default function MessageDetailScreen({navigation, route}) {
  const index = route.params.NewsIndex;
  const MessagesData = Data.Messages[index];

  const {colors} = useContext(AppStateContext);

  function BottomSent() {
    return (
      <View style={styles.bottomSentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor={colors.black3}
          />
          <View style={styles.sendButtonContainer}>
            <Pressable
              android_ripple={{color: colors.black2}}
              style={styles.sendButton}>
              <Icon
                name="send"
                size={25}
                color={colors.black6}
                style={styles.sendIcon}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const MessageItem = ({sender, message}) => {
    const containerStyle =
      sender === 'mentor'
        ? styles.messageContainerLeft
        : styles.messageContainerRight;
    const textStyle =
      sender === 'mentor' ? styles.messageTextLeft : styles.messageTextRight;

    return (
      <View style={[containerStyle, {marginVertical: 5}]}>
        <View style={[styles.messageBubble, textStyle]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    headerContainer: {
      width: '100%',
      height: 80,
      backgroundColor: colors.black6,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 3,
      borderColor: colors.black4,
    },
    mentorImage: {
      marginLeft: 30,
      width: 55,
      height: 55,
      borderRadius: 26,
      backgroundColor: colors.black4,
    },
    mentorInfoContainer: {
      marginLeft: 20,
      marginRight: 40,
      flex: 1,
      height: '60%',
      justifyContent: 'space-evenly',
    },
    mentorName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black1,
    },
    mentorLocation: {
      fontSize: 14,
      fontWeight: 'light',
      color: colors.black3,
    },
    messageListContainer: {
      flex: 1,
      padding: 10,
    },
    messageContainerLeft: {
      alignItems: 'flex-start',
    },
    messageContainerRight: {
      alignItems: 'flex-end',
    },
    messageBubble: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '80%',
    },
    messageTextLeft: {
      backgroundColor: colors.black5,
    },
    messageTextRight: {
      backgroundColor: colors.MessageGreen2,
    },
    messageText: {
      color: colors.black1,
      fontSize: 20,
    },
    bottomSentContainer: {
      width: '100%',
      height: 80,
      backgroundColor: colors.black6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      height: 45,
      flexDirection: 'row',
      marginBottom: 10,
    },
    input: {
      backgroundColor: colors.black5,
      color: colors.black1,
      fontSize: 20,
      marginLeft: 20,
      paddingLeft: 20,
      borderRadius: 20,
      width: '75%',
    },
    sendButtonContainer: {
      width: 50,
      height: 45,
      borderRadius: 22,
      marginLeft: 10,
      overflow: 'hidden',
      backgroundColor: colors.headerGreen2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendButton: {
      width: 50,
      height: 45,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendIcon: {
      marginLeft: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.headerContainer}>
        <View style={styles.mentorImage}></View>
        <View style={styles.mentorInfoContainer}>
          <Text style={styles.mentorName}>{MessagesData.mentorName}</Text>
          <Text style={styles.mentorLocation}>
            {MessagesData.otherData.farmLocation}
          </Text>
        </View>
      </View>

      <View style={styles.messageListContainer}>
        <FlatList
          data={MessagesData.messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <MessageItem sender={item.sender} message={item.message} />
          )}
        />
      </View>

      <BottomSent />
      {/* <BottomComponent navigation={navigation} route={route} /> */}
    </View>
  );
}
