import React, { useState, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { DappMetaData } from 'types';
import Web3 from 'web3';
import Head from 'layout/Head';
import Web3Wrapper from 'containers/Web3Wrapper';
import App from './App';
import NotFound from './NotFound';
import Explore from './Explore';
import Project from './Project';

export default () => {
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
      presale: '',
      redeemer: '',
      timer: '',
      token: '',
      access: '',
      staking: ''
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
        console.log(bucket);

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
      <Web3Wrapper>
        {(address, web3, onConnect) => (
          <Switch>
            <Route component={Explore} path="/" exact />
            <Route
              component={() => (
                <Project address={address} web3={web3} onConnect={onConnect} />
              )}
              path="/:project"
            />
          </Switch>
        )}
      </Web3Wrapper>
    </>
  );
};
