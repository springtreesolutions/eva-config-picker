import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'eva-config-picker-spinner',
  shadow: true,
  styleUrl: 'picker-spinner.scss'
})
export class Spinner {

  @Prop()
  size: number = 40;

  render() {
    const pixelatedSize = `${this.size}px`;

    return (
      <Host style={{
        width: pixelatedSize,
        height: pixelatedSize
      }}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width={pixelatedSize} height={pixelatedSize} viewBox="0 0 50 50" style={{ 'enable-background': 'new 0 0 50 50' }} xmlSpace="preserve">
          <path fill='black' d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(360 -4.05439e-8 -4.05439e-8)">
            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </Host>
    );
  }

}
