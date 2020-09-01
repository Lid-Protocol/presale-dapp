import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { HttpProvider, IpcProvider, WebsocketProvider } from 'web3-core';
import { getRandomInfuraId, web3Modal } from 'utils';

interface IWeb3Wrapper {
  children: (
    address: string,
    web3: Web3 | null,
    onConnect: () => void
  ) => React.ReactNode;
}

type Web3Provider = HttpProvider | IpcProvider | WebsocketProvider;

const Web3Wrapper: React.FC<IWeb3Wrapper> = ({ children }) => {
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState<Web3Provider | null>(
    new Web3.providers.HttpProvider(
      `https://mainnet.infura.io/v3/${getRandomInfuraId()}`
    )
  );
  const [web3, setWeb3] = useState<Web3 | null>(new Web3(provider));

  // const resetApp = async () => {
  //   if (
  //     web3 &&
  //     web3.currentProvider &&
  //     (web3.currentProvider as WebsocketProvider).connection
  //   ) {
  //     await (web3.currentProvider as WebsocketProvider).connection.close();
  //   }
  //   await web3Modal.clearCachedProvider();
  //   setAddress('');
  //   setWeb3(null);
  //   setProvider(null);
  // };

  // //TODO: event subscriptions to auto update UI
  // const subscribeProvider = async (provider: Web3Provider) => {
  //   if (!provider.hasOwnProperty('on')) {
  //     return;
  //   }

  //   (provider as IpcProvider | WebsocketProvider).on('close', () => resetApp());
  //   (provider as IpcProvider | WebsocketProvider).on(
  //     'accountsChanged',
  //     (accounts: string[]) => {
  //       console.log('accounts', accounts);
  //       setAddress(accounts[0]);
  //     }
  //   );
  // };

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    const web3 = await new Web3(provider);
    // await subscribeProvider(provider, web3);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    setAddress(address);
    setProvider(provider);
    setWeb3(web3);
  };

  useEffect(() => {
    if (window.web3) onConnect();
  }, []);

  return <>{children(address, web3, onConnect)}</>;
};

export default Web3Wrapper;
