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
  commonjs: {
    namedExports: {
      'node_modules/idb/build/idb.js': ['openDb']
    }
  }
};
