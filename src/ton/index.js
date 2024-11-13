import {TonConnectUI} from '@tonconnect/ui';

const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json',
  uiOptions: {
    language: 'ru',
    uiPreferences: {
      borderRadius: 's'
    }
  }
});

export default tonConnectUI;