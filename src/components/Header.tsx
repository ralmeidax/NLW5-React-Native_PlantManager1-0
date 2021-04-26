import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/RicardoProfile.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:username');
            setUserName(user || '');
        }

        loadStorageUserName();

    },[]);



    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    { userName }
                </Text>
            </View>

            <Image source={userImg} style={styles.image}/>

        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:20,
        marginTop: getStatusBarHeight(),
        backgroundColor: colors.background,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        color: colors.green,
        fontFamily: fonts.heading,
        lineHeight:36

    },
    image:{
        width: 80,
        height:80,
        borderRadius: 40,
        borderColor: colors.green,
        borderWidth: 1.5
    }
})