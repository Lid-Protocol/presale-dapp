import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Text, Box } from '@chakra-ui/core';

interface ICountDown {
  expiryTimestamp: number;
}

const CountDown: React.FC<ICountDown> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days, start, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called')
  });

  useEffect(() => {
    restart(expiryTimestamp);
    start();
  }, [expiryTimestamp]);

  return (
    <Box w="100%" textAlign="center" mb="40px" position="relative">
      <Box display="inline-block" w={['40px', '90px']} m="5px">
        <Text fontSize={['24px', '48px']} color="lid.brand">
          {days.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '16px']}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light"
        >
          DAYS
        </Text>
      </Box>
      <Box
        display="inline-block"
        m="5px"
        position="relative"
        top={['-24px', '-36px']}
      >
        <Text fontSize={['24px', '48px']} color="lid.brand" m="0px">
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['40px', '90px']} m="5px">
        <Text fontSize={['24px', '48px']} color="lid.brand">
          {hours.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '16px']}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light"
        >
          HOURS
        </Text>
      </Box>
      <Box
        display="inline-block"
        m="5px"
        position="relative"
        top={['-24px', '-36px']}
      >
        <Text fontSize={['24px', '48px']} color="lid.brand" m="0px">
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['40px', '90px']} m="5px">
        <Text fontSize={['24px', '48px']} color="lid.brand">
          {minutes.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '16px']}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light"
        >
          MINUTES
        </Text>
      </Box>
      <Box
        display="inline-block"
        m="5px"
        position="relative"
        top={['-24px', '-36px']}
      >
        <Text fontSize={['24px', '48px']} color="lid.brand" m="0px">
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['40px', '90px']} m="105pxx">
        <Text fontSize={['24px', '48px']} color="lid.brand">
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '16px']}
          color="lid.fgLight"
          w="100%"
          textAlign="center"
          fontWeight="light"
        >
          SECONDS
        </Text>
      </Box>
    </Box>
  );
};

export default CountDown;
