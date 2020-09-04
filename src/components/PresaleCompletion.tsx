import React from 'react';
import { Text, Box, Button } from '@chakra-ui/core';
import { Contract } from 'web3-eth-contract';
import { DappMetaData } from 'types';

interface IPresaleCompletion {
  isEnded: boolean;
  address: string;
  lidPresaleSC: Contract | null;
  meta: DappMetaData;
}

const PresaleCompletion: React.FC<IPresaleCompletion> = ({
  isEnded,
  address,
  lidPresaleSC,
  meta
}) => {
  const handleSendToUniswap = async function () {
    if (!lidPresaleSC) {
      return;
    }
    await lidPresaleSC.methods.sendToUniswap().send({ from: address });
  };

  const handleIssueTokens = async function () {
    if (!lidPresaleSC) {
      return;
    }
    await lidPresaleSC.methods.issueTokens().send({ from: address });
  };

  return (
    <Box
      w="100%"
      m="0"
      p={['20px', '20px', '0px']}
      pt="0px"
      pb="20px"
      position="relative"
      mb="40px"
      textAlign="center"
    >
      <Text fontSize="18px" m="0" p="0" color="lid.fg">
        {`To Complete ${meta.tokenName} Presale:`}
      </Text>
      {!isEnded && (
        <Text fontSize="14px" m="0" p="0" color="lid.fgMed">
          This section unlocks at presale end.
        </Text>
      )}
      <Text fontSize="14px" m="0" p="0" color="lid.fgMed">
        Each button called once globally in order.
      </Text>
      {isEnded && (
        <>
          <Button
            variantColor="blue"
            bg="lid.brand"
            color="white"
            border="none"
            display="block"
            borderRadius="25px"
            w="200px"
            h="50px"
            mt="30px"
            mx="auto"
            fontWeight="regular"
            fontSize="18px"
            onClick={handleSendToUniswap}
          >
            Send to Uniswap
          </Button>
          <Button
            variantColor="blue"
            bg="lid.brand"
            color="white"
            border="none"
            display="block"
            borderRadius="25px"
            w="200px"
            h="50px"
            mt="30px"
            mx="auto"
            fontWeight="regular"
            fontSize="18px"
            onClick={handleIssueTokens}
          >
            Issue Tokens
          </Button>
        </>
      )}
    </Box>
  );
};

export default PresaleCompletion;
