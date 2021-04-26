import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View,
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/wateringMedium.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    <Text style={styles.titleTop}>
                        Gerencie{'\n'}
                    </Text>

                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                    <Image 
                        source={wateringImg} 
                        style={styles.image} 
                        resizeMode="contain"    
                    />
                
                <Text style={styles.subtitle}>
                    <Text style={styles.highlight}> Não esqueça </Text>
                    mais de  
                    <Text style={styles.highlight}> regar suas plantas</Text>.
                Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather 
                        name='chevron-right'
                        style={styles.buttonIcon}
                    />
            </TouchableOpacity>
        </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1        
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 12
    },
    titleTop:{
        fontSize: 38,
        textAlign: 'center',
        color: colors.green,
        fontFamily: fonts.heading,
    },
    title:{
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop:38,
        lineHeight:46,
        fontFamily: fonts.heading
    
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
       
    },
    highlight:{
        fontWeight: 'bold',
        color: colors.green,
    },
    image: {
        height: Dimensions.get('window').width*0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon:{
        fontSize: 32,
        color: colors.white
    },


})