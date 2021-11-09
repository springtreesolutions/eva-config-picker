import { getAuth, signOut } from "@firebase/auth";
import { collection, getDoc, getDocs, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { BaseEnvironment, SummarisedViewCustomer, ExtendedViewCustomer } from "./typings";

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
}

export const firebaseServiceInstance = new FirebaseService();

