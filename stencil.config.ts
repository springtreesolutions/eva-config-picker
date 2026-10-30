import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'eva-config-picker',
  buildEs5: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass()
  ],
  devServer: {
    // Stencil defaults to 0.0.0.0, exposing the dev server (and files on this machine) to the network
    address: 'localhost'
  }
};
