import React, { useState } from "react";
import WebView from "react-native-webview";
import * as Progress from 'react-native-progress';
import { View } from "react-native";
const WebScreen = ({ route }) => {
    const { url } = route.params;
    const [isLoaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    return (
        <View style={{ flex: 1 }}>
            {
                !isLoaded &&
                <Progress.Bar width={null} progress={progress} color="orange" borderWidth={0} borderRadius={0} />
            }
            <WebView
                source={{ uri: url }}
                onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
                onLoadEnd={() => setLoaded(true)}
            />
        </View>
    )
}

export default WebScreen;