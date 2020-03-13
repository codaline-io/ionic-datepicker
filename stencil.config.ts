import { Config } from '@stencil/core';

export const config: Config = {
  bundles: [{
    components: ['ionic-datepicker', 'ionic-datepicker-popover']
  }],
  namespace: 'ionic-datepicker',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
