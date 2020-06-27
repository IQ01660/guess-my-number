import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * just put some content into this
 * it will get wrapped in a styled view
 * note: you can set your own styles into style prop
 * no width given by default
 * @param {*} props 
 */
const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}} >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
});

export default Card;
