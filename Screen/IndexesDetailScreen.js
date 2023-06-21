import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { AppStateContext } from "../AppStateContext";
import BottomComponent from "../component/BottomComponent";
import Header from "../component/Header";
import { Data } from "../Data";

export default function IndexesDetailScreen({ navigation, route }) {
  const { colors } = useContext(AppStateContext);
  const index = route.params.NewsIndex;
  const newsItem = Data.indexes[index];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    imageContainer: {
      flex: 1,
      marginVertical: 10,
    },
    image: {
      height: "100%",
      width: "100%",
    },
    contentContainer: {
      flex: 1.5,
      padding: 20,
    },
    scrollView: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      color: colors.black1,
    },
    infoContainer: {
      margin: 20,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoText: {
      color: colors.black2,
      fontSize: 22,
      fontWeight: "bold",
    },
    description: {
      fontSize: 16,
      color: colors.black3,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.imageContainer}>
        <Image
          source={newsItem.path}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{newsItem.full_name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {newsItem.name} : {newsItem.value}
              </Text>
              <Text style={styles.infoText}>
                {newsItem.classification}
              </Text>
            </View>
            <Text style={styles.description}>{newsItem.description}</Text>
          </View>
        </ScrollView>
      </View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
