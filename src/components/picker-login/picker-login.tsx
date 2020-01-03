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

  async loginWithGithub() {
    try {
      const githubProvider = new firebase.auth.GithubAuthProvider();

      await firebase.auth().signInWithPopup(githubProvider);

    } catch (error) {
      console.error('[eva-config-picker-login] Error calling signInWithPopup with the microsoft.com OAuthProvider', error);

      if (error.code === 'auth/account-exists-with-different-credential' ) {
        alert(error.message);
      }
    }
  }

  render() {
    return (
      <div>
        <div class="login-button google" role="login button" onClick={() => this.loginWithGoogle()}>
          <img src="assets/images/btn_google_dark_normal_ios.svg" />
          <span>Sign in with Google</span>
        </div>

        <img onClick={() => this.loginWithMicrosoft()} class="ms-login-button" src="assets/images/ms-login-button.svg" />

        <div class="login-button github" onClick={() => this.loginWithGithub()}>
          <img src="assets/images/github-logo.svg" alt="github logo"/>
          <span>Sign in with Github</span>
        </div>
      </div>
    );
  }

}
