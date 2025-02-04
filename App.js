import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import HomeScreen from "./components/Home";
import DrawerNavigation from "./components/DrawerNavigation";
import { AnimeNewsContext, AnimeNewsProvider } from "./components/context/context";
import WebScreen from "./components/WebScreen";
import RNSplashScreen from 'react-native-splash-screen';

const App = () => {
    const { saveDarkMode, darkMode, getDarkMode } = useContext(AnimeNewsContext);
    useEffect(() => {
        return () => {
            saveDarkMode();
        }
    }, [darkMode])
    useEffect(() => {
        RNSplashScreen.hide();
        getDarkMode();
    },[])
    return (
        <DrawerNavigation />
    )
}

export default App;