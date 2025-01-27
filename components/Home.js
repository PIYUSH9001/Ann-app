import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import NewsCard, { Category } from "./NewsCard";
import { AnimeNewsContext } from "./context/context";
import ScalableText from "react-native-text";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
    const { showModal, setShowModal, modalDetails, darkMode, animeNews, setAnimeNews, FetchAnimeNews } = useContext(AnimeNewsContext);
    const { category } = route.params || {};
    const navigation = useNavigation();
    const dynamicStyles = {
        container: {
            backgroundColor: darkMode ? 'black' : '#9b59b6',
        },
        modalView: {
            backgroundColor: darkMode ? '#3b3b3b' : 'white',
        },
        modalTitle: {
            color: darkMode ? 'white' : 'black',
        },
        modalDescription: {
            color: darkMode ? 'white' : 'black',
        },
        modalDate: {
            color: darkMode ? 'white' : 'black',
        }
    }

    const filterDescription = (description) => {
        let wordsToRemove = ["<cite>", "</cite>"];
        let regex = new RegExp(wordsToRemove.map(word => word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join("|"), "g");
        let result = description.replace(regex, "").replace(/\s+/g, " ").trim();
        return result;
    }
    // useEffect(() => {
    //     console.warn(modalDetails.link);
    // },[modalDetails])
    return (
        <View style={[styles.container, { justifyContent: animeNews.length === 0 && 'center' }, dynamicStyles.container]}>
            {
                animeNews.length > 0 ?
                    <>
                        <FlatList data={category ? animeNews.filter((item) => item.category === category) : animeNews} renderItem={({ item }) => {
                            return <NewsCard title={item.title} description={filterDescription(item.description)} date={item.pubDate} articleLink={item.link} category={item.category}
                            />
                        }}
                        />
                        <Modal transparent={true} visible={showModal} animationType="slide">
                            {/* <Pressable> */}
                            <View style={styles.modalContainer}
                                onStartShouldSetResponder={() => true}
                                onResponderRelease={() => {
                                    setShowModal(!showModal);
                                }}
                            >
                                <View style={[styles.modalView, dynamicStyles.modalView]}>
                                    <View style={styles.modalDetails}>
                                        <ScalableText style={[styles.modalTitle, dynamicStyles.modalTitle]}>
                                            {modalDetails.title}
                                        </ScalableText>
                                        <ScalableText style={[styles.modalDescription, dynamicStyles.modalDescription]}>
                                            "{modalDetails.description}"
                                        </ScalableText>
                                    </View>
                                    {
                                        Array.isArray(modalDetails.category) ?
                                            <FlatList
                                                data={modalDetails.category}
                                                renderItem={({ item }) => (
                                                    <Category title={item} style={{ width: '100%' }} />
                                                )}
                                                contentContainerStyle={
                                                    {
                                                        flexDirection:'row',
                                                        justifyContent:'space-evenly'
                                                    }
                                                }
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                            :
                                            <Category title={modalDetails.category} />
                                    }
                                    <ScalableText style={[styles.modalDate, dynamicStyles.modalDate]}>
                                        {modalDetails.date}
                                    </ScalableText>
                                    <Button title="Read more" color={darkMode ? 'gray' : 'green'} onPress={() => {
                                        if (showModal) {
                                            navigation.navigate('WebScreen',{
                                                url:modalDetails.link
                                              })
                                        }
                                    }} />
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>Tap anywhere to close</Text>
                                </View>
                            </View>
                        </Modal>
                    </>
                    :
                    <ActivityIndicator color={'white'} size={45} />
            }
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    modalView: {
        flexDirection: 'column',
        height: scale(500),
        width: '100%',
        padding: '4%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalTitle: {
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    modalDescription: {
        fontSize: scale(13),
        fontStyle: 'italic',
        // backgroundColor: 'yellow',
    },
    modalDetails: {
        height: scale(360),
        width: '100%',
        // backgroundColor:'black',
    }
})

export default HomeScreen;