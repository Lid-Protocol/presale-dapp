import React, { useState, useEffect } from 'react';
import { BonusRange } from '../config';
import {
  Box,
  Text,
  Button,
  NumberInput,
  NumberInputField
} from '@chakra-ui/core';

interface IBonusStructure{
  bonusData: ReadonlyArray<number>;
}

const BonusStructure: React.FC<IBonusStructure> = ({bonusData}) => {
    return (
      <>
        <Box
          w="100%"
          maxWidth="1200px"
          ml="auto"
          mr="auto"
          mt="60px"
          mb="60px"
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
          >
            <Text fontSize="20px"
                  color="lid.fg"
                  fontWeight="bold"
                  mb="10px">
              Bonus For Deposit
            </Text>

          <Box float="left">
            <Text fontSize="16px"
                  color="blue.500"
                  mt="5px"
                  mb="5px"
                  fontWeight="bold">
              ETH
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize="16px"
                      color="lid.fgMed"
                      mt="5px"
                      float="left">
                  {data.eth} 
                </Text>
                <br />
              </p>
            ))}
          </Box>
          
          <Box float="left"
               ml="5%">
            <Text fontSize="16px"
                  color="blue.500"
                  mt="5px"
                  mb="5px"
                  fontWeight="bold">
              Bonus
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize="16px"
                      color="lid.fgMed"
                      mt="5px"
                      float="left">
                  {data.reward} 
                </Text>
                <br />
              </p>
            ))}
          </Box>

          <Box display="inline-block"
               ml="5%">
            <Text fontSize="16px"
                  color="blue.500"
                  mt='5px'
                  mb="5px"
                  fontWeight="bold">
              Price (After Referal Fees)
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize="16px"
                      color="lid.fgMed"
                      mt="5px"
                      display="inline-block">
                  {data.price}
                </Text>
                <br />
                </p>
            ))}
          </Box>
              
          <Text mt="10px"
                color="lid.fgMed"
                fontSize="14px">
            Presale ends when it's harcap is reached
          </Text>
          </Box>
        </Box>
      </>
  );
};

export default BonusStructure;
