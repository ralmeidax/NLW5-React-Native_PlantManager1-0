import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😉'
}


export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();


    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params  as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button 
                        title = {buttonTitle}
                        onPress={handleMoveOn}    
                    />
                </View>
            </View>



        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title:{
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colors.green,
        textAlign: 'center',
        lineHeight: 32,
        marginTop: 20

    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    emoji: {
        textAlign: 'center',
        fontSize: 78
    },
    highlight:{
        fontWeight: 'bold',
        color: colors.green,
    },
    footer:{
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
})
