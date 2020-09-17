import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import { fromWei } from 'utils';
import CountDown from './CountDown';
import { tokenName } from '../config';

interface IEndTimer {
  expiryTimestamp: number | null;
  hardcap: string;
}

const EndTimer: React.FC<IEndTimer> = ({ expiryTimestamp, hardcap }) => {
  return (
    <Box
      display="block"
      w="100%"
      mt="40px"
      mb="40px"
      px={['20px', '20px', 0]}
      maxW="1200px"
      ml="auto"
      mr="auto"
      textAlign="center"
    >
      <Text fontSize={['28px', '36px']} fontWeight="bold">
        {`${tokenName} Presale ends in`}
      </Text>
      <CountDown
        expiryTimestamp={
          expiryTimestamp === null ? Date.now() : expiryTimestamp
        }
      />
      <Text fontSize={['12px', '14px']} fontWeight="light" mt="-20px">
        48 hour timer.
      </Text>
      <Text fontSize={['12px', '14px']} fontWeight="light">
        Ends after 48 hours or {fromWei(hardcap)} ETH.
      </Text>
    </Box>
  );
};

export default EndTimer;
