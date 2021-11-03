import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
class FirebaseService {
  app = initializeApp({
    apiKey: "AIzaSyD51D-mGBu-wAOxckCZO2-dk5IRjrYhNlI",
    authDomain: "eva-customer-manager.firebaseapp.com",
    databaseURL: "https://eva-customer-manager.firebaseio.com",
    projectId: "eva-customer-manager",
    storageBucket: "eva-customer-manager.appspot.com",
    messagingSenderId: "59729598142",
    appId: "1:59729598142:web:cdd4b538c72630c6dd70ef"
  });

  auth = getAuth(this.app);

  storage = getStorage(this.app);

  firestore = getFirestore(this.app);
}

export const firebaseServiceInstance = new FirebaseService();

