import React, { useState, useEffect } from 'react';
import { BonusRange } from '../config';
import { Box, Text, Image } from '@chakra-ui/core';

import imgPresent from 'assets/images/common/Bonus_1x.png';

const BonusStructure: React.FC = () => {
  const [Header, setHeader] = useState('Bonus For Deposit');

  useEffect(() => {
    if (window.innerWidth > 999) {
      setHeader('Bonus For Deposit');
    } else {
      setHeader('Bonus');
    }
  });

  return (
    <>
      <Box
        w="100%"
        maxWidth="1200px"
        mx="auto"
        my="60px"
        px={['20px', '20px', 0]}
      >
        <Box
          w="100%"
          p="20px"
          textAlign="left"
          color="lid.fg"
          position="relative"
          border="solid 1px"
          borderColor="lid.stroke"
          borderRadius="5px"
        >
          <Image
            src={imgPresent}
            alt="img clock"
            w="auto"
            h="25px"
            display="inline-block"
            position="relative"
            top="-3px"
          />

          <Text
            fontSize="20px"
            color="lid.fg"
            fontWeight="bold"
            ml="37px"
            mt="-26px"
            mb="15px"
          >
            {Header}
          </Text>

          <Box float="left">
            <Text
              display="block"
              fontSize={['14px', '16px']}
              color="lid.brand"
              mt={['10px', '5px']}
              mb={['15px', '5px']}
              fontWeight="bold"
            >
              ETH
            </Text>
            {BonusRange.map((data) => (
              <Text
                key={data.eth}
                fontSize={['14px', '16px']}
                color="lid.fgMed"
                mt="5px"
              >
                {data.eth}
              </Text>
            ))}
          </Box>

          <Box float="left" ml="5%">
            <Text
              fontSize={['14px', '16px']}
              color="lid.brand"
              mt={['10px', '5px']}
              mb={['15px', '5px']}
              fontWeight="bold"
            >
              Bonus
            </Text>
            {BonusRange.map((data) => (
              <Text
                key={data.reward}
                fontSize={['14px', '16px']}
                color="lid.fgMed"
                mt="5px"
              >
                {data.reward}
              </Text>
            ))}
          </Box>

          <Box display="inline-block" ml={['5%']}>
            <Text
              fontSize={['14px', '16px']}
              color="lid.brand"
              mt={['0px', '5px']}
              mb={['5px', '5px']}
              w={['110px', '100%']}
              fontWeight="bold"
            >
              Price (After Referal Fees)
            </Text>
            {BonusRange.map((data) => (
              <Text
                key={data.price}
                fontSize={['14px', '16px']}
                color="lid.fgMed"
                mt="5px"
              >
                {data.price}
              </Text>
            ))}
          </Box>

          <Text
            mt="20px"
            color="lid.fgLight"
            fontWeight="light"
            fontSize={['13px', '15px']}
          >
            Presale ends when it's harcap is reached
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default BonusStructure;
