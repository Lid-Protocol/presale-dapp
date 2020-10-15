import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DappMetaData } from 'types';
import Web3 from 'web3';
import NotFound from './NotFound';
import MainApp from 'components/MainApp';
import IndexDB from './indexDB'

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
          
          //Check to see if the data is cached
          const cached_data : DappMetaData | null = await IndexDB(project);

          console.log("cached data: " + cached_data);
          //Set data to cached data if it is already stored, otherwise get data and add to cache
          if (cached_data) {
            setMeta(cached_data);
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
            //Adds data to cache
            await IndexDB(data);
          }
        } catch (ex) {
          setShowError(true);
          console.log("show error : " + showError)
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
