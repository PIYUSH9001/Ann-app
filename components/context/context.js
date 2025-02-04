import React, { Children, createContext, useState, useEffect } from "react";
import { Linking } from "react-native";
export const AnimeNewsContext = createContext();
import { XMLParser } from "fast-xml-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AnimeNewsProvider = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({});
    const [darkMode, setDarkMode] = useState(null);
    const [animeNews, setAnimeNews] = useState([]);
    const saveDarkMode = async () => {
        try {
            let DarkModeValue = JSON.stringify(darkMode)
            DarkModeValue = await AsyncStorage.setItem("annDarkMode", DarkModeValue);
            // console.log("Dark mode saved:", DarkModeValue);
        } catch (error) {
            // console.error("Error saving dark mode:", error);
        }
    };
    const getDarkMode = async () => {
        try {
            const value = await AsyncStorage.getItem("annDarkMode");
            // console.log("Retrieved dark mode value:", value);
            if (value !== null) {
                setDarkMode(JSON.parse(value));
            } else {
                setDarkMode(false); // Default to false
            }
        } catch (error) {
            // console.error("Error retrieving dark mode:", error);
        }
    };
    const FetchAnimeNews = async () => {
        const parser = new XMLParser();
        try {
            let response = await fetch("https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us");
            const xmldata = await response.text();
            const parsedData = parser.parse(xmldata);
            setAnimeNews(parsedData?.rss?.channel?.item || []);
        }
        catch (error) {
            return error;
        }
    }
    useEffect(() => {
        FetchAnimeNews();
    }, []);
    return (
        <AnimeNewsContext.Provider value={
            {
                showModal,
                setShowModal,
                modalDetails,
                setModalDetails,
                darkMode,
                setDarkMode,
                animeNews,
                setAnimeNews,
                FetchAnimeNews,
                saveDarkMode,
                getDarkMode
            }
        }>
            {props.children}
        </AnimeNewsContext.Provider>
    )
}