import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//miscellanous
import Colors from './../constants/colors';

/**
 * You can give your own styles into a style prop.
 * Pass a number (or a string) between tags.
 * And set your own width/height
 * @param {*} props 
 */
const NumberContainer = props => (
    <View style={{...styles.numberContainer, ...props.style}}>
        <Text style={styles.number} >{props.children}</Text>
    </View>
);

const styles = StyleSheet.create({
    numberContainer: {
        borderColor: Colors.accent,
        borderWidth: 1,
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    }, 
    number: {
        color: Colors.accent,
        fontSize: 20,
    },
});

export default NumberContainer;