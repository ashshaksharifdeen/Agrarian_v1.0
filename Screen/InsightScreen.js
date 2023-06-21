import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { AppStateContext } from "../AppStateContext";
import BottomComponent from "../component/BottomComponent";
import Header from "../component/Header";
import HeadingText from "../component/HeadingText";
import { Data } from "../Data";

export default function InsightScreen({ navigation, route }) {
  const { colors } = useContext(AppStateContext);

  const renderFlatListItem = ({ item, index }) => {
    const onPressHandler = () => {
      navigation.navigate("IndexesDetailScreen", { NewsIndex: index });
    };

    return (
      <View style={styles.listItemContainer}>
        <Pressable
          style={styles.listItem}
          android_ripple={{ color: colors.black3 }}
          onPress={onPressHandler}
        >
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {item.name} : {item.value}
              </Text>
              <Text style={styles.infoText}>{item.classification}</Text>
            </View>
            <Text style={styles.description}>
              Range {item.normal_range[0]} - {item.normal_range[1]}
            </Text>
            <Text style={styles.link}>{item.full_name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={item.path} style={styles.image} />
          </View>
        </Pressable>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black6,
    },
    listItemContainer: {
      overflow: "hidden",
      borderRadius: 10,
      marginVertical: 10,
    },
    listItem: {
      backgroundColor: colors.black5,
      height: 130,
      flexDirection: "row",
      paddingVertical: 10,
    },
    infoContainer: {
      flex: 1.5,
      marginVertical: 10,
      marginHorizontal: 20,
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
      color: colors.black3,
      fontSize: 16,
    },
    link: {
      color: colors.black8,
      fontSize: 16,
      textDecorationLine: "underline",
    },
    imageContainer: {
      flex: 1,
      marginVertical: 10,
      marginRight: 20,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 8,
    },
    mapContainer: {
      flex: 1,
      marginHorizontal: 30,
      marginVertical: 0,
      borderColor: colors.black1,
    },
    mapImage: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
      borderRadius: 20,
    },
    indexesContainer: {
      flex: 2,
      marginHorizontal: 20,
    },
    heading: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <HeadingText style={{ marginBottom: 10, marginTop: 0 }}>Dot plot map</HeadingText>
      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/InsightScreenMap.png")}
          style={styles.mapImage}
        />
      </View>
      <View style={styles.indexesContainer}>
        <HeadingText style={styles.heading}>Indexes</HeadingText>
        <FlatList
          data={Data.indexes}
          renderItem={renderFlatListItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomComponent navigation={navigation} route={route} />
    </View>
  );
}
