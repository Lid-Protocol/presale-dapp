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
