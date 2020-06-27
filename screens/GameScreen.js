import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

//component imports
import NumberContainer from './../components/NumberContainer';
import Card from './../components/Card';

/**
 * Generates a random number between
 * @param {*} min inclusive
 * @param {*} max exclusive
 * @param {*} exclude isn't picked
 */
function generateRandomBetween(min, max, exclude) {
	min = Math.ceil(min);
	max = Math.floor(max);

	let rndNum = Math.floor(Math.random() * (max - min) + min);
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}

	return rndNum;
}

class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			randomGuess: generateRandomBetween(1, 100, this.props.userChoice),
			guessRange: {
				min: 1, //inclusive
				max: 100, //exclusive
			},
		};
	}

	hintHandler(decision) {
		if (
			(decision === 'lower' && this.props.userChoice > this.state.randomGuess) ||
			(decision === 'greater' && this.props.userChoice < this.state.randomGuess)
		) {
			Alert.alert("Don't Cheat", 'Pick the correct direction', [
				{
					text: 'OK',
					style: 'default',
				},
			]);
			return;
		}

		if (decision === 'lower') {
			this.lowerHandler();
		}

		if (decision === 'greater') {
			this.greaterHandler();
		}
	}

	lowerHandler() {
		this.setState((prevState) => {
			const updatedGuess = generateRandomBetween(
				prevState.guessRange.min,
				prevState.randomGuess,
				prevState.randomGuess
			);

			return {
				randomGuess: updatedGuess,
				guessRange: {
					min: prevState.guessRange.min,
					max: prevState.randomGuess,
				},
			};
		});
	}

	greaterHandler() {
		this.setState((prevState) => {
			const updatedGuess = generateRandomBetween(
				prevState.randomGuess,
				prevState.guessRange.max,
				prevState.randomGuess
			);

			return {
				randomGuess: updatedGuess,
				guessRange: {
					min: prevState.randomGuess + 1,
					max: prevState.guessRange.max,
				},
			};
		});
	}

    componentDidUpdate() {
        //if you found the user's number switch to game over page
        if (this.state.randomGuess === this.props.userChoice)
        {
            this.props.responseHandler(this.state.randomGuess);
            return null;
        }
    }

	render() {
        

		return (
			<View style={styles.screen}>
				<Text>Computer's Guess</Text>
				<NumberContainer style={styles.numberContainer}>{this.state.randomGuess}</NumberContainer>
				<Card style={styles.btnContainer}>
					<Button title="Lower" onPress={this.hintHandler.bind(this, 'lower')} />
					<Button title="Greater" onPress={this.hintHandler.bind(this, 'greater')} />
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	numberContainer: {
		marginVertical: 25,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
});

export default GameScreen;
