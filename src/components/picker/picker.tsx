import { Component, Host, h, State } from '@stencil/core';
import { initializeFirebaseApp } from '../../firebase';
import firebase from 'firebase/app';

enum LoggedInState {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT
}

@Component({
  tag: 'eva-config-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {

  @State()
  loggedIn: LoggedInState = LoggedInState.LOADING;

  constructor() {
    initializeFirebaseApp();

    firebase.app().auth().onAuthStateChanged(auth => {
      if (!auth) {
        this.loggedIn = LoggedInState.LOGGED_OUT;
      } else if (Boolean(auth.uid)) {
        this.loggedIn = LoggedInState.LOGGED_IN;
      }
    });
  }


  render() {
    if (this.loggedIn === LoggedInState.LOADING) {
      return <eva-config-picker-spinner></eva-config-picker-spinner>;
    } else if (this.loggedIn === LoggedInState.LOGGED_IN) {
      return <eva-config-picker-customer></eva-config-picker-customer>;
    } else if (this.loggedIn === LoggedInState.LOGGED_OUT) {
      return <eva-config-picker-login></eva-config-picker-login>;
    }
  }


}
