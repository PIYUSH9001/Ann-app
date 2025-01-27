import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { AnimeNewsContext } from "./context/context";
import ScalableText from "react-native-text";
import { scale } from "react-native-size-matters";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const NewsCard = (item) => {
  const { showModal, setShowModal, setModalDetails, darkMode } = useContext(AnimeNewsContext);
  const navigation = useNavigation();
  const [timeDifference, setTimeDifference] = useState("");
  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: darkMode ? '#3b3b3b' : 'white'
    },
    cardHeading: {
      color: darkMode ? 'white' : 'black',
    },
    cardDescription: {
      color: darkMode ? 'white' : 'black',
    },
    cardDate: {
      color: darkMode ? 'white' : 'black',
    }
  })
  const getTimeDifference = () => {
    const newsDate = new Date(item.date.toString()); // News time
    const currentDate = new Date(); // Current time
    const differenceInMilliseconds = currentDate.getTime() - newsDate.getTime();
    // Convert milliseconds to human-readable format
    const differenceInSeconds = Math.abs(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    let readableDifference = "";
    if (differenceInDays > 0) {
      readableDifference = `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
    } else if (differenceInHours > 0) {
      readableDifference = `${differenceInHours} ${differenceInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (differenceInMinutes > 0) {
      readableDifference = `${differenceInMinutes} ${differenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      readableDifference = `${Math.floor(differenceInSeconds)} seconds ago`;
    }
    setTimeDifference(readableDifference);
  }
  useEffect(() => {
    getTimeDifference();
  }, []);
  return (
    <TouchableNativeFeedback
      useForeground={true}
      background={TouchableNativeFeedback.Ripple('gray', false)}
      onPress={() => {
        setShowModal(!showModal);
        setModalDetails({
          title: item.title,
          description: item.description,
          date: timeDifference,
          link: item.articleLink,
          category:item.category,
        })
      }}>
      <View style={[styles.card, dynamicStyles.card]}>
        <View style={styles.cardFirstHalf}>
          <ScalableText style={[styles.cardHeading, dynamicStyles.cardHeading]} numberOfLines={3}>
            {item.title}
          </ScalableText>
          <ScalableText style={[styles.cardDescription, dynamicStyles.cardDescription]} numberOfLines={3}>
            "{item.description}"
          </ScalableText>
        </View>

        <View>
          {
            Array.isArray(item.category) ? (
              <FlatList
                data={item.category}
                renderItem={({ item }) => (
                  <Category title={item} style={{width:'100%'}}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.categoryList} 
              />
            ) : (
              <Category title={item.category} />
            )
          }
        </View>


        <ScalableText style={[styles.cardDate, dynamicStyles.cardDate]} numberOfLines={1}>
          {timeDifference}
        </ScalableText>

        <Button title="Read more" color={darkMode ? 'gray' : 'green'} onPress={() => {
          navigation.navigate('WebScreen',{
            url:item.articleLink
          })
        }} />
      </View>
    </TouchableNativeFeedback>
  )
}


export const Category = ({ title ,style = {}}) => {
  return (
    <ScalableText style={[styles.cardCategory,style]}>
      {title.toUpperCase()}
    </ScalableText>
  )
}

const styles = StyleSheet.create({
  card: {
    height: scale(280),
    width: '100%',
    padding: '3%',
    borderRadius: 20,
    marginTop: scale(20),
    flexDirection: 'column',
    overflow: 'hidden',
    elevation: 2,
  },
  cardHeading: {
    fontSize: scale(16),
    fontWeight: 'bold',
    // backgroundColor:'green',
    // minHeight: 99,
    textAlignVertical: 'center',
  },
  cardDescription: {
    fontSize: scale(13),
    fontStyle: 'italic',
    // backgroundColor:'yellow',
    // minHeight: 99,
  },
  cardDate: {
    position: 'relative',
    fontSize: scale(10)
  },
  cardFirstHalf: {
    // backgroundColor:'blue',
    height: scale(175),
    padding: '1%'
  },
  cardCategory: {
    padding: 2,
    backgroundColor: 'green',
    width: scale(100),
    textAlign: 'center',
    borderRadius: 30,
    fontSize: scale(10),
    color: 'white',
    margin: 1,
  },
  categoryList:{
    flexDirection:'row',
    justifyContent:'space-around'
  }
})

export default NewsCard;