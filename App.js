import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import HomeScreen from "./components/Home";
import DrawerNavigation from "./components/DrawerNavigation";
import { AnimeNewsContext, AnimeNewsProvider } from "./components/context/context";
import WebScreen from "./components/WebScreen";

const App = () => {
    const { saveDarkMode, darkMode, getDarkMode } = useContext(AnimeNewsContext);
    useEffect(() => {
        return () => {
            saveDarkMode();
        }
    }, [darkMode])
    useEffect(() => {
        getDarkMode();
    },[])
    return (
        <DrawerNavigation />
    )
}

export default App;