import React from 'react';
import { Text } from '@chakra-ui/core';
import { fromWei } from 'utils';
import CountDown from './CountDown';
import { DappMetaData } from '../types';

interface RefundTimer {
  expiryTimestamp: number;
  softcap: string;
  meta: DappMetaData;
}

const RefundTimer: React.FC<RefundTimer> = ({
  expiryTimestamp,
  softcap,
  meta
}) => {
  return (
    <>
      <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
        {`${meta.tokenSymbol} Presale refunds in:`}
      </Text>
      <CountDown
        expiryTimestamp={!expiryTimestamp ? Date.now() : expiryTimestamp}
      />

      <Text fontSize={['12px', '14px']} ml="5px" fontWeight="light">
        Presale refunds unless {fromWei(softcap)} ETH softcap is reached
      </Text>
    </>
  );
};

export default RefundTimer;
