import React, { useState, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { DappMetaData } from 'types';
import { importAll } from 'utils';
import Web3 from 'web3';
import Head from 'layout/Head';
import Web3Wrapper from 'containers/Web3Wrapper';
import App from './App';
import NotFound from './NotFound';

export default () => {
  const [meta, setMeta] = useState<DappMetaData>({
    tokenName: '',
    tokenSymbol: '',
    tokenOwnerWebsite: '',
    siteUrl: '',
    totalPresale: '0',
    referralBP: '0',
    basisPoint: '0',
    accountCap: '0'
  });

  const [favicon, setFavicon] = useState<string>('');

  const [showError, setShowError] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    const fetchProjectMeta = async () => {
      try {
        let config: DappMetaData = meta;
        const project: string = history.location.pathname.split('/')[1];

        let images = importAll(
          require.context(
            `../assets/images/lid`,
            false,
            /\.(png|jpe?g|svg|ico)$/
          )
        );

        setFavicon(images['favicon.ico']);

        // if undefined, show lid default project
        config = project
          ? require(`../templates/config.${project}.json`)
          : require(`../templates/config.lid.json`);

        await setMeta({
          ...config,
          accountCap: Web3.utils.toWei(config.accountCap)
        });
      } catch (error) {
        setShowError(true);
      }
    };

    fetchProjectMeta();
  }, []);

  return (
    <>
      {meta.tokenName && !showError && (
        <>
          <Head favicon={favicon} meta={meta} />
          <Web3Wrapper>
            {(address, web3, onConnect) => (
              <Switch>
                <Route
                  component={() => (
                    <App
                      address={address}
                      web3={web3}
                      meta={meta}
                      onConnect={onConnect}
                    />
                  )}
                  path="/"
                  exact
                />
                <Route
                  component={() => (
                    <App
                      address={address}
                      meta={meta}
                      web3={web3}
                      onConnect={onConnect}
                    />
                  )}
                  path="/:project"
                />
              </Switch>
            )}
          </Web3Wrapper>
        </>
      )}
      {showError && !meta.tokenName && <NotFound />}
    </>
  );
};
