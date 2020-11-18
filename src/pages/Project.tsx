import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DappMetaData } from 'types';
import Web3 from 'web3';
import NotFound from './NotFound';
import MainApp from 'components/MainApp';
import VersionRedirect from './VersionRedirect';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: Web3 | null;
}

export default ({ address, onConnect, web3 }: IProps) => {
  const [meta, setMeta] = useState<DappMetaData>({
    tokenName: '',
    tokenSymbol: '',
    tokenOwnerWebsite: '',
    siteUrl: '',
    totalPresale: '0',
    basisPoint: '0',
    accountCap: '0',
    favicon: '',
    project: '',
    version: '',
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

        const response = await fetch(
          `https://ipfs.io/ipns/lid-team-bucket.storage.fleek.co/${project}/config.${project}.json`
        );
        const data = await response.json();

        setMeta({
          ...data,
          accountCap: Web3.utils.toWei(data.accountCap),
          favicon: '',
          project: project
        });
      } catch (ex) {
        setShowError(true);
      }
    };
    loadProject();
  }, []);

  return (
    <>
      {meta.tokenName && !showError && (
        meta.version == "1.0.0" ? (
          <VersionRedirect
            address={address}
            web3={web3}
            meta={meta}
            onConnect={onConnect}
          />
        ) : (
          <MainApp
            address={address}
            web3={web3}
            meta={meta}
            onConnect={onConnect}
          />
        )
      )}
    </>
  )
};
