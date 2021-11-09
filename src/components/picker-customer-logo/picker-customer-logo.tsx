import { Component, h, Host, Prop, State } from '@stencil/core';
import { firebaseServiceInstance } from '../../firebase';

@Component({
  tag: 'picker-customer-logo',
  styleUrl: 'picker-customer-logo.scss',
  shadow: true,
})
export class PickerCustomerLogo {

  @Prop()
  logoPath: string;

  @Prop()
  customerName: string;

  /** we will use this in the image tag */
  @State()
  logoSrc: string;

  componentWillLoad() {
    this.loadImageSrc();
  }

  private async loadImageSrc() {
    try {
      console.log(`[eva-picker-customer-logo] getting customer logo for ${this.customerName} with logoPath ${this.logoPath}`);
      this.logoSrc = await firebaseServiceInstance.getImageUrl(this.logoPath);
    } catch (error) {
      console.error(`[eva-picker-customer-logo] error getting customer logo for ${this.customerName}`, error);
    }
  }

  render() {
    return (
      <Host>
        <div class="placeholder" style={{
          'opacity': this.logoSrc ? '0' : '1',
        }}>
        </div>
        {this.renderImage()}
      </Host>
    );
  }


  private renderImage() {
    if (this.logoSrc) {
      return <img src={this.logoSrc} alt={`logo of customer: ${this.customerName}`} />
    } else {
      return <div></div>;
    }
  }
}
