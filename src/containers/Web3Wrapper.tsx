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

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    const web3 = await new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    setAddress(accounts[0]);
    setProvider(provider);
    setWeb3(web3);

    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts: string[]) => {
      setAddress(accounts[0]);
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.log(error);
      setAddress('');
      const infuraProvider = new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${getRandomInfuraId()}`
      );
      setProvider(infuraProvider);
      setWeb3(new Web3(infuraProvider));
    });

    // TODO: handle the network change, should only allow only mainnet
    // // Subscribe to chainId change
    // provider.on('chainChanged', (chainId: number) => {
    //   console.log(chainId);
    // });

    // // Subscribe to provider connection
    // provider.on('connect', (info: { chainId: number }) => {
    //   console.log(info);
    // });
  };

  useEffect(() => {
    if (window.web3) onConnect();
  }, []);

  return <>{children(address, web3, onConnect)}</>;
};

export default Web3Wrapper;
