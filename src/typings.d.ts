import { DocumentReference} from "@firebase/firestore";

export { AuthState } from './components/picker/auth-state.enum'

export interface BaseCustomer {
  logoPath: string;
  name: string;
}


/**
 * This will contain a summary of the customer, with only a reference to the base environments
 */
 export interface SummarisedViewCustomer extends BaseCustomer {
  baseEnvironments: DocumentReference[];
}


/**
 * will contain all the information in the summary, but with the base environments fetched
 */
export interface ExtendedViewCustomer extends BaseCustomer {
  baseEnvironments: BaseEnvironment[];
}

export interface BaseEnvironment {
  endpoint: string;
  type: string;
  customerName: string;
}

