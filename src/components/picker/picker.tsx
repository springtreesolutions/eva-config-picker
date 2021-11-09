import { Component, EventEmitter, h, Event, State, Prop } from '@stencil/core';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseServiceInstance } from '../../firebase';
import {  AuthState } from './auth-state.enum';

@Component({
  tag: 'eva-config-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {

  @State()
  private authState =  AuthState.LOADING;

  /**
   * will emit whenever the auth state changes
   */
  @Event()
  authStateChange: EventEmitter< AuthState>;

  /**
   * This will allow consumers to fetch the data themselves using the build in firebase service, ensuring they can match the look & feel of their application.
   */
  @Prop()
  hideCustomerPicker: boolean = false;

  constructor() {

    onAuthStateChanged(firebaseServiceInstance.auth, auth => {
      if (!auth) {
        this.authState =  AuthState.LOGGED_OUT;
      } else if (Boolean(auth.uid)) {
        this.authState =  AuthState.LOGGED_IN;
      }

      this.authStateChange.emit(this.authState);
    });
  }


  render() {
    if (this.authState ===  AuthState.LOADING) {
      return <eva-config-picker-spinner></eva-config-picker-spinner>;
    } else if (this.authState ===  AuthState.LOGGED_IN && !this.hideCustomerPicker) {
      return <eva-config-picker-customer></eva-config-picker-customer>;
    } else if (this.authState ===  AuthState.LOGGED_OUT) {
      return <eva-config-picker-login></eva-config-picker-login>;
    }
  }


}
