import React from 'react';
import ThemeWrapper from 'containers/ThemeWrapper';
import Web3Wrapper from 'containers/Web3Wrapper';
import MainApp from 'components/MainApp';

const App: React.FC = () => {
  return (
    <ThemeWrapper>
      <Web3Wrapper>
        {(address, web3, onConnect) => (
          <MainApp address={address} web3={web3} onConnect={onConnect} />
        )}
      </Web3Wrapper>
    </ThemeWrapper>
  );
};

export default App;
