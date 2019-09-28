/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
GoogleSignin.configure({
  iosClientId: '684269283733-q35m7ni95otk91th0e4444g2uu65hq1q.apps.googleusercontent.com',
  offlineAccess: false
});

export default class App extends Component {

  // Somewhere in your code
  _signIn = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remember to remove the user from your app's state as well

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };
  state = {
    name: '',
    img: '',
    userInfo: null
  }
  async signOut() {

    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut().then(res => console.log(res));
    this.setState({ userInfo: null, name: '', img: '' }); // Remember to remove the user from your app's state as well
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.state.img }} style={{ height: 100, width: 100, }} />
        <Text>{this.state.name}</Text>
        <GoogleSigninButton
          style={{ width: 250, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
          onPress={() => GoogleSignin.signIn().then((user) => {
            console.log(user.user)
            this.setState({ name: user.user.givenName, img: user.user.photo })
          })}
          disabled={false}
        />
        <TouchableOpacity onPress={() => this.signOut()} style={{ width: 250, backgroundColor: 'blue', height: 48 }} ></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
