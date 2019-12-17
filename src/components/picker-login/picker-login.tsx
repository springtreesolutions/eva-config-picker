import { Component, h } from '@stencil/core';
import firebase from 'firebase/app';

@Component({
  tag: 'eva-config-picker-login',
  styleUrl: 'picker-login.scss',
  shadow: true
})
export class PickerLogin {

  async loginWithGoogle() {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

    } catch (error) {
      console.error('[eva-config-picker-login] Error calling signInWithPopup with the GoogleAuthProvider sign-in', error);
    }
  }

  async loginWithMicrosoft() {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'));

    } catch (error) {
      console.error('[eva-config-picker-login] Error calling signInWithPopup with the microsoft.com OAuthProvider', error);
    }
  }

  render() {
    return (
      <div>
        <div class="loginButton normal" role="login button" onClick={() => this.loginWithGoogle()}>
          <img class="logoTile" src="assets/images/btn_google_dark_normal_ios.svg" />
          <span>Sign in with Google</span>
        </div>

        <img onClick={() => this.loginWithMicrosoft()} class="ms-login-button" src="assets/images/ms-login-button.svg" />

      </div>
    );
  }

}
