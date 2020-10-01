import React from 'react';
import { Text, Box, Link } from '@chakra-ui/core';
import { shortEther } from 'utils';
import CountDown from './CountDown';
import { DappMetaData } from 'types';

interface IStartTimer {
  startTime: number;
  accessTime: number;
  stakingLid: string;
  meta: DappMetaData;
}

const StartTimer: React.FC<IStartTimer> = ({
  startTime,
  accessTime,
  stakingLid,
  meta
}) => {
  return (
    <>
    <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
        {`Your ${meta.tokenSymbol} Access Starts In:`}
      </Text>
      <CountDown expiryTimestamp={accessTime} />
      <Text>
        Stake more LID at{' '}
        <Link color="lid.brand" href="https://stake.lid.sh">
          stake.lid.sh
        </Link>{' '}
        to get access sooner.
      </Text>
      <Text>
        Your {shortEther(stakingLid)} staked LID gets you access{' '}
        {((startTime + 960000 - accessTime) / 60000).toFixed(0)} minutes early.
      </Text>
    </>
  );
};

export default StartTimer;
