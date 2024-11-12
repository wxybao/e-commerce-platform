import {TonConnectUI} from '@tonconnect/ui';

const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://1233/tonconnect-manifest.json',
  uiOptions: {
    language: 'ru',
    uiPreferences: {
      borderRadius: 's'
    }
  }
});

export default tonConnectUI;