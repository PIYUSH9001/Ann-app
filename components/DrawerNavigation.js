import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from "react-native-size-matters";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { AnimeNewsContext } from "./context/context";
import ScreenNavigator from "./ScreenNavigator";
import CreditScreen from "./CreditScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const { darkMode, setDarkMode} = useContext(AnimeNewsContext);
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={
                {
                    headerRight: () => (
                        <Pressable onPress={() => {
                            setDarkMode(!darkMode)
                        }}>
                            <View style={styles.switchView}>
                                <Icon name={`${darkMode ? 'moon' : 'sunny'}`} size={scale(30)} color={`${darkMode ? 'white' : 'black'}`} />
                                <Switch value={darkMode} onValueChange={() => {
                                    setDarkMode(!darkMode);
                                }}
                                    style={{ transform: [{ scaleX: scale(1) }, { scaleY: scale(1) }] }}
                                    trackColor={{ false: 'black', true: 'white' }}
                                    thumbColor={'lightgray'}
                                />
                            </View>
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: darkMode ? 'black' : 'white',
                        borderBottomWidth: scale(1),
                        borderBottomColor: 'white',
                    },
                    headerTintColor: darkMode ? 'white' : 'black',
                    drawerStyle: {
                        width: '65%',
                        backgroundColor: darkMode ? '#3b3b3b' : 'white',
                    },
                    drawerLabelStyle: {
                        // color:"black",
                        fontSize: scale(15)
                    },
                    drawerItemStyle: {
                        marginTop: '1%'
                    },
                    drawerActiveBackgroundColor: '#9b59b6',
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: darkMode ? 'white' : 'black',
                    drawerInactiveBackgroundColor: darkMode ? 'gray' : 'white',
                }
            }>
                {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
                <Drawer.Screen component={ScreenNavigator} name="Home" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="home" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Anime' }} name="Anime" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="tv-outline" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Manga' }} name="Manga" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="book" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Games' }} name="Gaming" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="game-controller" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Live-Action' }} name="Live-Action" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="flame" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'People' }} name="People" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="people" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Korean' }} name="Korea" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="earth" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={ScreenNavigator} initialParams={{ category: 'Industry' }} name="Industry" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="business" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
                <Drawer.Screen component={CreditScreen} name="Credits" options={{
                    drawerIcon: ({ focused }) => (
                        <Icon name="pizza" size={35} color={focused ? 'white' : 'black'} />
                    )
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    switchView: {
        height: scale(50),
        width: scale(100),
        marginRight: scale(5),
        // backgroundColor:'blue',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default DrawerNavigation;