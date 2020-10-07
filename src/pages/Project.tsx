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
      let response;
      
      try {
        const project: string = history.location.pathname
        .split('/')[1]
        .toLowerCase();

        response = await fetch(`https://ipfs.io/ipfs/QmUuydwDFCnghVs9eBoryVgpNB52WszaNKBKYZpZp2KipF/${project}/config.${project}.json`)
                  .then(res => res.json())
                  .then(data => setMeta({...data,
                                          accountCap: Web3.utils.toWei(data.accountCap),
                                          favicon: ''}))
      } catch (ex) {
        setShowError(true);
      }
    }
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
