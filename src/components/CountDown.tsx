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
    <Box w="100%" textAlign={[ "left", "center"]} ml={["0%", "-26%"]}>
      <Box display="inline-block" w={['50px', '90px']}>
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand">
          {days.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '14px']}
          color="lid.fgLight"
          w="100%"
          fontWeight="light"
        >
          DAYS
        </Text>
      </Box>
      <Box
        display="inline-block"
        position="relative"
        top={['-28px', '-35px']}
      >
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand" mr={[ '10px' ,"0"]}>
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['50px', '90px']} m="0">
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand">
          {hours.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '14px']}
          color="lid.fgLight"
          w="100%"
          fontWeight="light"
        >
          HOURS
        </Text>
      </Box>
      <Box
        display="inline-block"
        position="relative"
        top={['-28px', '-35px']}
      >
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand" mr={[ '10px' ,"0"]}>
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['50px', '90px']} m="0">
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand">
          {minutes.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '14px']}
          color="lid.fgLight"
          w="100%"
          fontWeight="light"
        >
          MINUTES
        </Text>
      </Box>
      <Box
        display="inline-block"
        position="relative"
        top={['-28px', '-35px']}
      >
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand" mr={[ '10px' ,"0"]}>
          :
        </Text>
      </Box>
      <Box display="inline-block" w={['50px', '90px']} m="105pxx">
        <Text fontSize={['28px' ,'38px']} fontWeight="bold" color="lid.brand">
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text
          fontSize={['12px', '14px']}
          color="lid.fgLight"
          w="100%"
          fontWeight="light"
        >
          SECONDS
        </Text>
      </Box>
    </Box>
  );
};

export default CountDown;
