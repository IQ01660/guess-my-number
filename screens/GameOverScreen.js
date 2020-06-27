import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

//component imports
import Card from './../components/Card';
import NumberContainer from './../components/NumberContainer';

//miscellanous
import Colors from './../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen} >
            <Text>Game Over!</Text>
            
            <Card style={styles.outputContainer}>
                <NumberContainer style={styles.number} >{props.userChoice}</NumberContainer>
                <View style={styles.startOverBtn}>
                    <Button title="Start Over" color={Colors.primary} onPress={props.startOverHandler} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
    },
    outputContainer: {
		width: 300,
		maxWidth: '80%',
        alignItems: 'center',
        marginVertical: 20,
    },
    number: {
        marginVertical: 15,
        width: '50%',
    },
    startOverBtn: {
        width: 200,
        marginVertical: 15
    },
});

export default GameOverScreen