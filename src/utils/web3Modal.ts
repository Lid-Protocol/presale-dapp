import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import Torus from '@toruslabs/torus-embed';
import Authereum from 'authereum';
import UniLogin from '@unilogin/provider';
import Portis from '@portis/web3';
// @ts-ignore
import Squarelink from 'squarelink';
// @ts-ignore
import MewConnect from '@myetherwallet/mewconnect-web-client';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: '29a7f0c37b214a90934bec1b032d5c8f' // required
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: 'pk_live_B853BB3433E80B5B' // required
    }
  },
  torus: {
    package: Torus // required
  },
  authereum: {
    package: Authereum // required
  },
  unilogin: {
    package: UniLogin // required
  },
  portis: {
    package: Portis, // required
    options: {
      id: '9b1635c2-43f4-4cbe-b8b6-73bf219d6a77' // required
    }
  },
  squarelink: {
    package: Squarelink, // required
    options: {
      id: '48ff2cdfaf26656bbd86' // required
    }
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: '53a6aee5a5c74599b815999befb91ecc' // required
    }
  }
};

export const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: true, // optional
  providerOptions // required
});
