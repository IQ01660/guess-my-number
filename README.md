# Guess My Number

"Guess My Number" is a React Native App that works both on iOS and Android. You give the app a number as an input and then the app takes you to a new screen where it tries to guess your number. If it finds it, you 'll see the result in the Game Over Screen.

## Installation

```bash 
npm install expo-cli --global
```
then install Homebrew, Watchman, and yarn, before doing:

```bash
git clone https://github.com/IQ01660/guess-my-number.git
cd guess-my-number
expo start 
```

Note: you might also need to do the following:
```bash
yarn add
```

visit [Expo Installation](https://docs.expo.io/get-started/installation/) for more information

## Usage

### Opening on your device

Download Expo and scan the QR code on the react-native-dev screen. 
(On Android, do it with the Expo app, on iOS scan the QR code with your Camera app and you 'll see the a tab appearing to visit the Expo app)

### Start Screen

Put in a number in the TextInput field and click **Confirm**.
Then click **Submit**.

### Game Screen

If your number is less than the number on the screen click **Lower**, otherwise - **Greater**. Repeat until the game is over.

### Game Over Screen

Here you can restart the game
