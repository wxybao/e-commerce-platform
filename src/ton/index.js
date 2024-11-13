import {TonConnectUI} from '@tonconnect/ui';

const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://www.tgecommerce.xyz/tonconnect-manifest.json',
  uiOptions: {
    language: 'ru',
    uiPreferences: {
      borderRadius: 's'
    }
  }
});

export default tonConnectUI;