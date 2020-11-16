import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import { fromWei } from 'utils';
import CountDown from './CountDown';
import { DappMetaData } from '../types';

interface IEndTimer {
  expiryTimestamp: number | null;
  hardcap: string;
  hardCapTimer: number;
  meta: DappMetaData;
}

const EndTimer: React.FC<IEndTimer> = ({
  expiryTimestamp,
  hardcap,
  hardCapTimer,
  meta
}) => {
  return (
    <>
      <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
        {`${meta.tokenSymbol} Presale ends in:`}
      </Text>
      <CountDown
        expiryTimestamp={
          expiryTimestamp === null ? Date.now() : expiryTimestamp
        }
      />
      <Text fontSize={['12px', '14px']} fontWeight="light" ml="5px;" mt="-5px">
        {hardCapTimer} hour timer.
      </Text>
      <Text fontSize={['12px', '14px']} ml="5px" fontWeight="light">
        Ends after {hardCapTimer} hours or {fromWei(hardcap)} ETH.
      </Text>
    </>
  );
};

export default EndTimer;
