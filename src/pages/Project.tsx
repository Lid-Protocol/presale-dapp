import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DappMetaData } from 'types';
import Web3 from 'web3';
import NotFound from './NotFound';
import MainApp from 'components/MainApp';
import IndexDB from './indexDB';

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
    referralBP: '0',
    basisPoint: '0',
    accountCap: '0',
    favicon: '',
    project: '',
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

        const cached_data: DappMetaData | null = await IndexDB(
          project.toUpperCase(),
          project,
          false
        );

        if (cached_data) {
          setMeta({
            ...cached_data,
            accountCap: Web3.utils.toWei(cached_data.accountCap),
            favicon: ''
          });
        } else {
          const response = await fetch(
            `https://ipfs.io/ipns/lid-team-bucket.storage.fleek.co/${project}/config.${project}.json`
          );
          const data = await response.json();

          setMeta({
            ...data,
            accountCap: Web3.utils.toWei(data.accountCap),
            favicon: ''
          });
          await IndexDB(data, project, true);
        }
      } catch (ex) {
        setShowError(true);
      }
    };
    loadProject();
  }, [history.location.pathname]);

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
