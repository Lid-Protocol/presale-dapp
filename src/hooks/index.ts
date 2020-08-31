import { useState } from 'react';
import Web3 from 'web3';

import { getRandomInfuraId } from 'utils';

export const useDefaultNetworkProvider = () => {
  const [provider, setProvider] = useState(
    new Web3.providers.HttpProvider(
      `https://mainnet.infura.io/v3/${getRandomInfuraId()}`
    )
  );
  return [provider, setProvider];
};
