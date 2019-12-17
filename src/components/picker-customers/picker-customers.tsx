import { Component, Event, h, State, EventEmitter } from '@stencil/core';
import firebase from 'firebase/app';
import { initializeFirebaseApp } from '../../firebase';

interface BaseCustomer {
  logoPath: string;
  name: string;
}

interface ViewCustomerSmall extends BaseCustomer {
  baseEnvironments: firebase.firestore.DocumentReference[];
}

interface BaseEnvironment {
  endpoint: string;
  type: string;
  customerName: string;
}

interface ViewCustomerBig extends BaseCustomer {
  baseEnvironments: BaseEnvironment[];
}

enum CustomerDataState {
  LOADED,
  LOADING,
  FAILED,
  UNAUTHORIZED
}

@Component({
  tag: 'eva-config-picker-customer',
  styleUrl: 'picker-customers.scss',
  shadow: true
})
export class Customers {

  /**
   * This will emit whenever an endpoint is selected
   */
  @Event()
  endPointSelect: EventEmitter<string>;

  @State()
  viewCustomers: ViewCustomerSmall[] = [];

  @State()
  selectedCustomer: ViewCustomerBig;

  @State()
  customerDataState: CustomerDataState = CustomerDataState.LOADING;

  constructor() {
    initializeFirebaseApp();
  }

  async componentWillLoad() {
    try {
      const customersSnapshot = await firebase.firestore().collection('customer').get();

      const customerDocuments = customersSnapshot.docs;

      const viewCustomers = [];

      for (const customerDocument of customerDocuments) {
        try {
          const customerData = customerDocument.data();

          // We don't want the generic customer in the selection UI
          //
          if (customerData.name !== 'generic') {
            const logoPath = await firebase.storage().ref(customerData.logoPath).getDownloadURL();

            const viewCustomer: ViewCustomerSmall = {
              name: customerData.name,
              logoPath,
              baseEnvironments: customerData.baseEnvironments
            }

            viewCustomers.push(viewCustomer);
          }

          this.customerDataState = CustomerDataState.LOADED
        } catch (error) {
          console.error('[eva-config-picker-customer] error getting customer data for', customerDocument);
        }

      }

      this.viewCustomers = viewCustomers;
    } catch ( error ) {
      if ( error.code === 'permission-denied' ) {
        this.customerDataState = CustomerDataState.UNAUTHORIZED;
        console.error('[eva-config-picker-customer] error loading customer info, this user is not authorized', error);
      } else {
        this.customerDataState = CustomerDataState.FAILED;
        console.error('[eva-config-picker-customer] error loading customer info', error);
      }
    }
  }

  async selectCustomer(customer: ViewCustomerSmall) {
    const baseEnvironments = [];

    for (const baseEnvironment of customer.baseEnvironments ) {
      const baseEnvironmentDocumentData = await baseEnvironment.get();

      const baseEnvironmentData = baseEnvironmentDocumentData.data();

      baseEnvironments.push(baseEnvironmentData);
    }

    this.selectedCustomer = {
      ...customer,
      baseEnvironments
    }
  }

  render() {

    if (this.customerDataState === CustomerDataState.LOADING ) {
      return this.renderLoading();
    } else if ( this.customerDataState === CustomerDataState.LOADED ) {
      return (
        <div>
          {this.selectedCustomer ?
            // If we currently have base environments, we will render those
            //
            this.renderBaseEnvironments() :
            // Otherwise we will render the customers
            //
            this.renderCustomers()
          }
        </div>
      )
    } else if (this.customerDataState === CustomerDataState.FAILED) {
      return <div class="error-feedback">Error loading.</div>
    } else if (this.customerDataState === CustomerDataState.UNAUTHORIZED) {
      return this.renderShowUnauthorizedError();
    }

  }

  private renderLoading() {
    return (
      <div class="loading-container">
        <eva-config-picker-spinner></eva-config-picker-spinner>

        <span>Loading customers...</span>
      </div>
    );
  }

  private renderShowUnauthorizedError() {
    return (
      <div>
        <span class="error-feedback">You are not allowed to view this data.  </span>
        <button class="md" onClick={() => this.logout()}>LOGOUT</button>
      </div>
    )
  }

  private renderCustomers() {
    return (
      <div class="grid-container">
       { this.viewCustomers.map( customer => this.renderCustomerCard(customer)) }
      </div>
    )
  }

  private renderCustomerCard(customer) {
    return (
      <div class="card" onClick={() => this.selectCustomer(customer)}>
        <img src={customer.logoPath} alt={`${customer.name} logo`} />
        <h3>{customer.name}</h3>
      </div>
    )
  }

  private renderBaseEnvironments() {
    return (
      <div class="base-environments-list">
        <button class="md back-button" onClick={() => this.selectedCustomer = null}>
          <div class="back-icon">&#10132;</div>
        </button>
        <div class="card">
          <img src={this.selectedCustomer.logoPath} alt={`${this.selectedCustomer.name} logo`} />
          <h3>{this.selectedCustomer.name}</h3>
        </div>

        {this.selectedCustomer.baseEnvironments.map(baseEnvironment =>
          <div class="base-environments-list-item">
            <h4>{baseEnvironment.type}</h4>
            <p>
              {baseEnvironment.endpoint}
              <button class="md" onClick={() => this.selectEndpoint(baseEnvironment.endpoint)}>SELECT</button>
            </p>
          </div>
        )}
      </div>
    )
  }

  private async logout() {
    try {
      await firebase.auth().signOut();
    } catch ( error ) {
      console.error('[eva-config-picker-customer] error logging out', error);
    }
  }

  private selectEndpoint(endpoint: string) {
    this.endPointSelect.emit(endpoint);
  }

}
