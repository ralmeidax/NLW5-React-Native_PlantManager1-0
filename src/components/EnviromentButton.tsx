import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton ({
    title,
    active = false,
    ... rest
} : EnviromentButtonProps){
    return(
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            { ... rest }
        >
            <Text 
                style={[
                    styles.text,
                    active && styles.textActive
                ]}>
                { title }
            </Text>

        </RectButton>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        height: 42,
        width: 96,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 5,
    },
    containerActive:{
        backgroundColor: colors.green_light,        
    },

    text: {
        fontFamily: fonts.text,
        fontSize: 14,
        color: colors.heading
        
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})