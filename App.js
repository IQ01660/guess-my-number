import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';  
//component imports 
import Header from './components/Header';
//screen imports 
import { AppLoading } from 'expo';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'; 

//importing fonts 
import * as Font from 'expo-font';

const fetchFonts = () => { 
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
}; 

class App extends Component {
    state = {
        didSubmit: false,
        submittedNumber: null,
        isGameOver: false,
        computersNumber: null,
        rounds: [],
        loaded: false,
    };

    roundsUpdate = (guess) => {  
        this.setState(prevState => {
            return {
                rounds: [{id: guess.toString(), guess: guess}, ...prevState.rounds],
            };
        });
    };

    restartRounds = () => {
        this.setState({
            rounds: [],
        });
    };
    
    submitNumberHandler(number) {
        this.setState({
            didSubmit: true,
            submittedNumber: number, 
        });
    }

    computerResponseHandler = number => {
        this.setState({
            isGameOver: true,
            computersNumber: number,
        });
    };

    startOverHandler = () => {
        this.setState({
            didSubmit: false,
            isGameOver: false,
            rounds: [],
        });
    }; 

    render() {  
        //if the app isn't loaded return AppLoading
        if(!this.state.loaded)
        {
            return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => this.setState({loaded: true})}
                onError={err => console.log(err)}
            />);
        }

        let screen = <StartScreen submitHandler={this.submitNumberHandler.bind(this)}/>

        if (this.state.didSubmit) 
        {
            screen = <GameScreen restartRounds={this.restartRounds} roundsUpdate={this.roundsUpdate} userChoice={this.state.submittedNumber} responseHandler={this.computerResponseHandler} rounds={this.state.rounds} />;
        }
         
        if (this.state.isGameOver)
        {
            screen = <GameOverScreen rounds={this.state.rounds.length} userChoice={this.state.computersNumber} startOverHandler = {this.startOverHandler} />
        } 
 
        return (
            <SafeAreaView style={styles.screen}>
                <Header title="Guess a Number" />
                {screen}
            </SafeAreaView> 
        );
    }

} 
  
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default App;
