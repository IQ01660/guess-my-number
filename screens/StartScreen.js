import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Button,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';

//component imports
import Card from './../components/Card';
import Input from './../components/Input';
import NumberContainer from './../components/NumberContainer';

//miscellaneous
import Colors from './../constants/colors';

class StartScreen extends Component {
	state = {
		inputText: '',
		hasConfirmed: false,
		submittedNumber: null,
		dimensions: {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		},
	};

	componentDidMount() {
        Dimensions.addEventListener('change', this.updateDimensions);
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateDimensions);
    }

	updateDimensions = (dimensions) => {
		this.setState({
			dimensions: {
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height,
			},
		});
	};

	changeInputHandler = (changedText) => {
		let formattedText = changedText.replace(/[^0-9]/g, '');
		this.setState({
			inputText: formattedText,
		});
	};

	resetInputHandler = () => {
		this.setState({
			inputText: '',
			hasConfirmed: false,
		});
	};

	confirmInputHandler = () => {
		const inputNumber = parseInt(this.state.inputText);

		if (!inputNumber || inputNumber <= 0 || inputNumber > 99) {
			Alert.alert('Incorrect Input', 'Please enter a valid 2-digit number', [
				{
					text: 'OK',
					style: 'default',
					onPress: this.resetInputHandler,
				},
			]);
			return;
		}

		this.setState({
			inputText: '',
			submittedNumber: inputNumber,
			hasConfirmed: true,
		});

		Keyboard.dismiss();
	};

	render() {
		//the feedback on submitted number
		let confirmedOutput = null;

		if (this.state.hasConfirmed) {
			confirmedOutput = (
				<Card style={styles.inputContainer}>
					<Text>You Chose:</Text>

					<NumberContainer style={styles.number}>{this.state.submittedNumber}</NumberContainer>

					<View style={styles.submitBtn}>
						<Button
							title="Submit"
							onPress={() => {
								this.props.submitHandler(this.state.submittedNumber);
							}}
						/>
					</View>
				</Card>
			);
		}

		return (
			<ScrollView>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
					<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
						<View style={styles.screen}>
							<Text style={styles.title}>Start a New Game</Text>

							<Card style={styles.inputContainer}>
								<Text>Choose a Number</Text>

								<Input
									style={styles.input}
									blurOnSubmit={true}
									autoCapitalize="none"
									autoCorrect={false}
									keyboardType="number-pad"
									returnKeyType="done"
									onChangeText={this.changeInputHandler}
									value={this.state.inputText}
									maxLength={2}
								/>

								<View style={styles.btnsContainer}>
									<View
										style={{
											width: 100,
										}}
									>
										<Button title="Reset" color={Colors.accent} onPress={this.resetInputHandler} />
									</View>
									<View
										style={{
											width: 100,
										}}
									>
										<Button
											title="Confirm"
											color={Colors.primary}
											onPress={this.confirmInputHandler}
										/>
									</View>
								</View>
							</Card>
							{confirmedOutput}
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	inputContainer: {
		width: 300,
		maxWidth: '95%',
		alignItems: 'center',
		marginVertical: Dimensions.get('window').height > 650 ? 20 : 5,
	},
	input: {
		width: 50,
		textAlign: 'center',
	},
	btnsContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	// btn: {
	// 	width: Dimensions.get('window').width / 4,
	// },
	number: {
		marginVertical: 15,
		width: '50%',
	},
	submitBtn: {
		width: 200,
		marginVertical: Dimensions.get('window').height > 650 ? 15 : 5,
	},
});

export default StartScreen;
