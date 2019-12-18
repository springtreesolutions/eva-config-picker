import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const initializeFirebaseApp = () => {
  if ( firebase.apps.length > 0 ) {
    return firebase.apps[0];
  } else {
    console.log('returning new one');
    return firebase.initializeApp({
      apiKey: "AIzaSyD51D-mGBu-wAOxckCZO2-dk5IRjrYhNlI",
      authDomain: "eva-customer-manager.firebaseapp.com",
      databaseURL: "https://eva-customer-manager.firebaseio.com",
      projectId: "eva-customer-manager",
      storageBucket: "eva-customer-manager.appspot.com",
      messagingSenderId: "59729598142",
      appId: "1:59729598142:web:cdd4b538c72630c6dd70ef"
    });
  }
};
