import React, { useState, useEffect } from 'react';
import { BonusRange } from '../config';
import {
  Box,
  Text,
  Image
} from '@chakra-ui/core';

import imgPresent from 'assets/images/common/Bonus_1x.png'

interface IBonusStructure{
  bonusData: ReadonlyArray<number>;
}

const BonusStructure: React.FC<IBonusStructure> = ({bonusData}) => {
  const [Header, setHeader] = useState("Bonus For Deposit");

  useEffect( () => {
    if (window.innerWidth > 999) {
      setHeader("Bonus For Deposit")
    } else {
      setHeader("Bonus")
    }
  })

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
            <Image
              src={imgPresent}
              alt="img clock"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />

            <Text fontSize="20px"
                  color="lid.fg"
                  fontWeight="bold"
                  ml="37px"
                  mt="-26px"
                  mb="15px">
              {Header}
            </Text>

          <Box float="left">
            <Text fontSize={['16px', '16px']}
                  color="lid.brand"
                  mt={['10px', '5px']}
                  mb={['15px', "5px"]}
                  fontWeight="bold">
              ETH
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize={["16px" , "16px"]}
                      color="lid.fgMed"
                      mt="5px"
                      display="inline-block">
                  {data.eth} 
                </Text>
                <br />
              </p>
            ))}
          </Box>
          
          <Box float="left"
               ml="5%">
            <Text fontSize={['16px', '16px']}
                  color="lid.brand"
                  mt={['10px', '5px']}
                  mb={['15px', "5px"]}
                  fontWeight="bold">
              Bonus
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize={["16px" , "16px"]}
                      color="lid.fgMed"
                      mt="5px"
                      display="inline-block">
                  {data.reward} 
                </Text>
                <br />
              </p>
            ))}
          </Box>

          <Box display="inline-block"
               ml={["8%" , "5%"]}>
            <Text fontSize={['16px', '16px']}
                  color="lid.brand"
                  mt={['0px', '5px']}
                  mb={['5px', '5px']}
                  w={['110px', '100%']}
                  fontWeight="bold">
              Price (After Referal Fees)
            </Text>
            {BonusRange.map((data) => (
              <p key={data.eth}>
                <Text fontSize={["16px" , "16px"]}
                      color="lid.fgMed"
                      mt="5px"
                      display="inline-block">
                  {data.price}
                </Text>
                <br />
                </p>
            ))}
          </Box>
              
          <Text mt="20px"
                color="lid.fgLight"
                fontWeight="light"
                fontSize={[ "13px" , "15px"]}>
            Presale ends when it's harcap is reached
          </Text>
          </Box>
        </Box>
      </>
  );
};

export default BonusStructure;