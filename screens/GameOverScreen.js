import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';

//component imports
import Card from './../components/Card';
import NumberContainer from './../components/NumberContainer';

//miscellanous
import Colors from './../constants/colors';

const GameOverScreen = (props) => {
    
	return ( 
		<ScrollView contentContainerStyle={{flexGrow: 1,}}>
			<View style={styles.screen}>
				<Text>Game Over!</Text> 
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={require('./../assets/original.png')} resizeMode="cover" />
				</View>
				<Card style={styles.outputContainer}>
					<NumberContainer style={styles.number}>{props.userChoice}</NumberContainer>

					<View style={styles.startOverBtn}>
						<Button title="Start Over" color={Colors.primary} onPress={props.startOverHandler} />
					</View>

					<View>
						<Text>Guessed in {props.rounds} rounds</Text>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
        alignItems: 'center',
	},
	imageContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderColor: 'black',
		borderWidth: 3,
		borderRadius: 150,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	outputContainer: {
		width: 300,
		maxWidth: '95%',
		alignItems: 'center',
		marginVertical: Dimensions.get('window').height / 40,
	},
	number: {
		marginVertical: Dimensions.get('window').height / 70,
		width: '50%',
	},
	startOverBtn: {
		width: Dimensions.get('window').width < 350 ? 150 : 200,
		marginVertical: Dimensions.get('window').height / 70,
	},
});

export default GameOverScreen;
