import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import { fromWei } from 'utils';
import CountDown from './CountDown';
import { DappMetaData } from '../types';

interface IEndTimer {
  expiryTimestamp: number | null;
  hardcap: string;
  meta: DappMetaData;
}

const EndTimer: React.FC<IEndTimer> = ({ expiryTimestamp, hardcap, meta }) => {
  const hardCapTimer =
    !expiryTimestamp || expiryTimestamp < Date.now()
      ? 0
      : (expiryTimestamp - Date.now()) / 1000;
  const hours = Math.floor(hardCapTimer / 3600);
  const mins = Math.floor(hardCapTimer / 60);

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
      {!!expiryTimestamp && (
        <Text fontSize={['12px', '14px']} ml="5px" fontWeight="light">
          Ends after {hours > 1 ? `${hours} hours` : `${mins} minuts`} or{' '}
          {fromWei(hardcap)} ETH.
        </Text>
      )}
    </>
  );
};

export default EndTimer;
