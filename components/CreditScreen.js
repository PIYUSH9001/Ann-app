import React, { useContext } from "react";
import { StyleSheet, View ,Text,Image, TouchableHighlight, Linking, TouchableOpacity} from "react-native";
import Logo from './Images/AnnIcon.jpg';
import { scale } from "react-native-size-matters";
import { AnimeNewsContext } from "./context/context";
import Icon from 'react-native-vector-icons/Ionicons';
const CreditScreen = () => {
    const {darkMode} = useContext(AnimeNewsContext);
    const SocialMediaLinks = {
        Twitter:'https://x.com/anime',
        Youtube:'https://www.youtube.com/c/animenewsnetworkANN',
        Instagram:'https://www.instagram.com/animenewsnetwork/',
        Facebook:'https://www.facebook.com/animenewsnetwork',
        Tiktok:'https://www.tiktok.com/@animenewsnetwork',
    }
    const styles = StyleSheet.create({
        creditContainer:{
            flex:1,
            flexDirection:'column',
            backgroundColor:darkMode?'black':'white',
            alignItems:'center',
        },
        logo:{
            margin:scale(20),
            borderRadius:100
        },
        heading:{
            fontWeight:'bold',
            fontSize:scale(20),
            color:darkMode?'white':'black'
        },
        subHeading:{
            color:darkMode?'white':'black'
        },
        SocialView:{
            padding:scale(10),
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            width:"100%",
            height:scale(150),
            // backgroundColor:'blue',
            flexWrap:'wrap',
        }
    })
    return (
        <View style={styles.creditContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.heading}>AnimeNewsNetwork</Text>
            <Text style={styles.subHeading}>
                All the content shown in this app belongs to AnimeNewsNetwork.com and their staff.
            </Text>
            <View style={styles.SocialView}>
            <SocialLinks iconName={'logo-twitter'} URL={SocialMediaLinks.Twitter} darkMode={darkMode}/>
            <SocialLinks iconName={'logo-youtube'} URL={SocialMediaLinks.Youtube} darkMode={darkMode}/>
            <SocialLinks iconName={'logo-facebook'} URL={SocialMediaLinks.Facebook} darkMode={darkMode}/>
            <SocialLinks iconName={'logo-instagram'} URL={SocialMediaLinks.Instagram} darkMode={darkMode}/>
            <SocialLinks iconName={'logo-tiktok'} URL={SocialMediaLinks.Tiktok} darkMode={darkMode}/>
            </View>
        </View>
    )
}

const SocialLinks = ({iconName,URL,darkMode}) => {
    const styles = StyleSheet.create({
        SocalBtn:{
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            height:scale(50),
            width:scale(70),
            borderRadius:15,
            padding:scale(2),
            margin:scale(2),
            elevation:5,
            backgroundColor:darkMode?'#3b3b3b':'orange'
        }
    })
    return (
        <TouchableOpacity style={styles.SocalBtn} onPress={() => {
            const isSupported = Linking.canOpenURL(URL);
            if(isSupported){
                Linking.openURL(URL);
            }
        }}>
            <View >
                <Icon name={iconName} size={scale(30)} color={darkMode?'white':'purple'} />
            </View>
        </TouchableOpacity>
    )
}



export default CreditScreen;