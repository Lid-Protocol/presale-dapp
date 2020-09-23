import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Web3Wrapper from 'containers/Web3Wrapper';
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
