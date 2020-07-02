import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
			randomGuess: (() => {
				const initGuess = generateRandomBetween(1, 100, this.props.userChoice);
				// if this page updates only, then empty
				// the rounds array in [App.js]
				this.props.restartRounds();
				// adding the first random guess to rounds
				this.props.roundsUpdate(initGuess);
				return initGuess;
			})(),
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

			this.props.roundsUpdate(updatedGuess);

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

			this.props.roundsUpdate(updatedGuess);

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
		if (this.state.randomGuess === this.props.userChoice) {
			this.props.responseHandler(this.state.randomGuess);
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
				<View style={styles.list}>
					<FlatList
						contentContainerStyle={styles.listContainer}
						data={this.props.rounds}
						renderItem={(guessWrapper) => (
							<View key={guessWrapper.item.id} style={styles.listItem}>
								<Text>#{this.props.rounds.length - guessWrapper.index} </Text>
								<Text>{guessWrapper.item.guess}</Text>
							</View>
						)}
					/>
				</View>
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
	list: {
		flex: 1,
		width: '60%',
	},
	listContainer: {
		justifyContent: 'center',
		flexGrow: 1,
		paddingVertical: 50,
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		width: '100%',
	},
});

export default GameScreen;
