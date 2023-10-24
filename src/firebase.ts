import { getAuth, signOut } from "@firebase/auth";
import { collection, getDoc, getDocs, initializeFirestore } from "@firebase/firestore";
import { getDownloadURL, ref } from '@firebase/storage';
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { BaseEnvironment, ExtendedViewCustomer, SummarisedViewCustomer } from "./typings";

export enum AuthState {
  LOADING = 'loading',
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out'
}

class FirebaseService {

  private app = initializeApp({
    apiKey: "AIzaSyD51D-mGBu-wAOxckCZO2-dk5IRjrYhNlI",
    authDomain: "eva-customer-manager.firebaseapp.com",
    databaseURL: "https://eva-customer-manager.firebaseio.com",
    projectId: "eva-customer-manager",
    storageBucket: "eva-customer-manager.appspot.com",
    messagingSenderId: "59729598142",
    appId: "1:59729598142:web:cdd4b538c72630c6dd70ef"
  });

  auth = getAuth(this.app);

  private storage = getStorage(this.app);

  private firestore = initializeFirestore(this.app, {
    // https://n6k.atlassian.net/browse/OPTR-26776
    // Use long polling does seem to fix the issue reported
    experimentalAutoDetectLongPolling: true
  });

  signOut() {
    return signOut(this.auth);
  }

  /**
   * Will get a summary of all customers without their base environments fetched
   * @returns
   */
  async getViewCustomersSummary(): Promise<SummarisedViewCustomer[]> {
    const customersSnapshot = await getDocs(collection(this.firestore, 'customer'));

    const customerDocuments = customersSnapshot.docs;

    const viewCustomersSummary: SummarisedViewCustomer[] = [];

      for (const customerDocument of customerDocuments) {
        try {
          const customerData = customerDocument.data();

          // We don't want the generic customer in the selection UI
          //
          if (customerData.name !== 'generic') {
            const viewCustomer: SummarisedViewCustomer = {
              name: customerData.name,
              logoPath: customerData.logoPath,
              baseEnvironments: customerData.baseEnvironments
            }

            viewCustomersSummary.push(viewCustomer);
          }

        } catch (error) {
          console.error('[firebase-service:getViewCustomersSummary] error getting customer data for', customerDocument);
        }

      }

      const sortedViewCustomersSummary = viewCustomersSummary.sort((a, b) => a.name.localeCompare(b.name));

      return sortedViewCustomersSummary;
  }

  /**
   * Takes in a customer summary as input and returns the extended view customer. Extended here being an object with the base environments fetched.
   * @param viewCustomerSummary
   * @returns
   */
  async getExtendedViewCustomer(viewCustomerSummary: SummarisedViewCustomer): Promise<ExtendedViewCustomer> {
    const baseEnvironments: BaseEnvironment[] = [];

    for (const baseEnvironment of viewCustomerSummary.baseEnvironments ) {
      const baseEnvironmentDocumentData = await getDoc(baseEnvironment);

      const baseEnvironmentData = baseEnvironmentDocumentData.data() as BaseEnvironment;

      baseEnvironments.push(baseEnvironmentData);
    }

    const extendedViewCustomer : ExtendedViewCustomer = {
      ...viewCustomerSummary,
      baseEnvironments
    }

    return extendedViewCustomer;
  }

  getImageUrl(logoPath: string) {
    return getDownloadURL(ref(firebaseServiceInstance.storage, logoPath));
  }

  /**
   * Sets up a listener that will notify consumer of the change in logged in state
   * warning, make sure to subscribe / unsubscribe correctly of this listener
   */
  listenToLoggedInStateChange(fn: (isLoggedIn: boolean) => any) {
    return onAuthStateChanged(firebaseServiceInstance.auth, auth => {
      if (!auth) {
        fn(false);
      } else if (Boolean(auth.uid)) {
        fn(true);
      } else {
        fn(false)
      }
    });
  }
}

export const firebaseServiceInstance = new FirebaseService();

