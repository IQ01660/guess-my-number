import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

//component imports
import Header from './components/Header';
 
//screen imports 
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

class App extends Component {
    state = {
        didSubmit: false,
        submittedNumber: null,
        isGameOver: false,
        computersNumber: null,
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
        });
    };

    render() { 
        let screen = <StartScreen submitHandler={this.submitNumberHandler.bind(this)}/>

        if (this.state.didSubmit) 
        {
            screen = <GameScreen userChoice={this.state.submittedNumber} responseHandler={this.computerResponseHandler}/>;
        }
        
        if (this.state.isGameOver)
        {
            screen = <GameOverScreen userChoice={this.state.computersNumber} startOverHandler = {this.startOverHandler} />
        }

        return (
            <View style={styles.screen}>
                <Header title="Guess a Number" />
                {screen}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default App;
