import React, { useContext } from "react";
import { StyleSheet, View ,Text,Image, TouchableHighlight} from "react-native";
import Logo from './Images/AnnIcon.jpg';
import { scale } from "react-native-size-matters";
import { AnimeNewsContext } from "./context/context";
import Icon from 'react-native-vector-icons/Ionicons';
const CreditScreen = () => {
    const {darkMode} = useContext(AnimeNewsContext);
    const styles = StyleSheet.create({
        creditContainer:{
            flex:1,
            flexDirection:'column',
            backgroundColor:'white',
            alignItems:'center',
        },
        logo:{
            margin:scale(20),
        },
        heading:{
            fontWeight:'bold',
            fontSize:scale(20)
        },
        subHeading:{
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
            <Text>
                All the content shown in this app belongs to AnimeNewsNetwork.com and their staff.
            </Text>
            <View style={styles.SocialView}>
            <SocialLinks iconName={'logo-twitter'}/>
            <SocialLinks iconName={'logo-youtube'}/>
            <SocialLinks iconName={'logo-facebook'}/>
            <SocialLinks iconName={'logo-instagram'}/>
            <SocialLinks iconName={'logo-tiktok'}/>
            </View>
        </View>
    )
}

const SocialLinks = ({iconName}) => {
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
            backgroundColor:'orange'
        }
    })
    return (
        <TouchableHighlight style={styles.SocalBtn}>
            <View >
                <Icon name={iconName} size={scale(30)} color={'purple'} />
            </View>
        </TouchableHighlight>
    )
}



export default CreditScreen;