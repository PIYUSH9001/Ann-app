import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./Home";
import WebScreen from "./WebScreen";

const ScreenNavigator = ({route}) => {
    const Stack = createStackNavigator();
    const { category } = route.params || {};
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            // Custom fade transition
          cardStyleInterpolator: ({ current, next }) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
              overlayStyle: {
                opacity: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5], // Fade effect for overlay
                    })
                  : 0,
              },
            };
          },
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{ category: category }}/>
            <Stack.Screen name="WebScreen" component={WebScreen} />
        </Stack.Navigator>
    )
}

export default ScreenNavigator;