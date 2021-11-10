import { Unsubscribe } from '@firebase/util';
import { Component, h, State } from '@stencil/core';
import { firebaseServiceInstance } from '../../firebase';

enum AuthState {
  LOADING = 'loading',
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out'
}

@Component({
  tag: 'eva-config-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {

  @State()
  private authState =  AuthState.LOADING;

  listenToLoggedInUnSubscribe: Unsubscribe;

  connectedCallback() {
    console.log(`[eva-picker:connectedCallback] creating loggedInStateChange listener`);

    this.listenToLoggedInUnSubscribe = firebaseServiceInstance.listenToLoggedInStateChange((isLoggedIn) => {
      if (isLoggedIn) {
        this.authState =  AuthState.LOGGED_IN;
      } else {
        this.authState =  AuthState.LOGGED_OUT;
      }
    });
  }

  disconnectedCallback() {
    if (this.listenToLoggedInUnSubscribe) {
      console.log(`[eva-picker:connectedCallback] removing loggedInStateChange listener`);
      this.listenToLoggedInUnSubscribe();
    }
  }

  render() {
    if (this.authState ===  AuthState.LOADING) {
      return <eva-config-picker-spinner></eva-config-picker-spinner>;
    } else if (this.authState ===  AuthState.LOGGED_IN) {
      return <eva-config-picker-customer></eva-config-picker-customer>;
    } else if (this.authState ===  AuthState.LOGGED_OUT) {
      return <eva-config-picker-login></eva-config-picker-login>;
    }
  }

}
