import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Pressable } from 'react-native';
import { colors } from '../colors';

import Icon from 'react-native-vector-icons/Entypo';
import BottomComponent from '../component/BottomComponent';
import Header from '../component/Header';
import HeadingText from '../component/HeadingText';
import { Data } from '../Data';

import { AppStateContext } from '../AppStateContext';
import DrawerButtonComponent from '../component/DrawerButtonComponent';

export default function MentorScreen({ navigation, route }) {
  const { colors } = useContext(AppStateContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    listItemContainer: {
      width: '100%',
      height: 100,
      backgroundColor: colors.black6,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    mentorImage: {
      width: 55,
      height: 55,
      borderRadius: 26,
      backgroundColor: colors.black4,
      marginRight: 20,
    },
    mentorName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black1,
    },
    mentorMessage: {
      fontSize: 14,
      fontWeight: 'light',
      color: colors.black3,
    },
  });

  function navigateMessageDetails(index) {
    navigation.navigate('MessageDetailScreen', { NewsIndex: index });
  }

  function renderFlatListItem({ item, index }) {
    return (
      <Pressable
        android_ripple={{ color: colors.black3 }}
        onPress={() => navigateMessageDetails(index)}
        style={styles.listItemContainer}
      >
        <View style={styles.mentorImage}></View>

        <View style={{ flex: 1, height: '60%', justifyContent: 'space-evenly' }}>
          <Text style={styles.mentorName}>{item.mentorName}</Text>
          <Text style={styles.mentorMessage}>
            {item.messages[2].message.slice(0, 80)}...
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <HeadingText style={{ color: colors.black2, marginTop: 10, marginBottom: 0 }}>
        Inbox
      </HeadingText>

      <FlatList
        data={Data.Messages}
        renderItem={renderFlatListItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={{ flex: 1 }}></View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
