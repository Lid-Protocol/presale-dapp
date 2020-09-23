import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { DappMetaData } from 'types';
import Web3 from 'web3';
import NotFound from './NotFound';
import MainApp from 'components/MainApp';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
}

export default ({ address, onConnect, web3 }: IProps) => {
  const [meta, setMeta] = useState<DappMetaData>({
    tokenName: '',
    tokenSymbol: '',
    tokenOwnerWebsite: '',
    siteUrl: '',
    totalPresale: '0',
    referralBP: '0',
    basisPoint: '0',
    accountCap: '0',
    favicon: '',
    addresses: {
      access: '',
      presale: '',
      redeemer: '',
      timer: '',
      staking: '',
      token: ''
    }
  });

  const [showError, setShowError] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project: string = history.location.pathname
          .split('/')[1]
          .toLowerCase();
        const input = {
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || '',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || '',
          key: `${project}/config.${project}.json`
        };

        let { data, bucket } = await fleekStorage.get(input);

        let config: DappMetaData = JSON.parse(data);

        setMeta({
          ...config,
          accountCap: Web3.utils.toWei(config.accountCap),
          favicon: ''
        });
      } catch (error) {
        setShowError(true);
      }
    };

    loadProject();
  }, []);

  return (
    <>
      {meta.tokenName && !showError && (
        <>
          <MainApp
            address={address}
            web3={web3}
            meta={meta}
            onConnect={onConnect}
          />
        </>
      )}
      {showError && !meta.tokenName && <NotFound />}
    </>
  );
};
