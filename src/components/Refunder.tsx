import React, { useState, useEffect } from 'react';
import { Text, Box, Button, Input } from '@chakra-ui/core';
import { shortEther, isAddress } from 'utils';
import { Contract } from 'web3-eth-contract';

interface IRefunder {
  lidPresaleSC: Contract | null;
  address: string;
}

const Refunder: React.FC<IRefunder> = ({ lidPresaleSC, address }) => {
  const [refundAddress, setRefundAddress] = useState(address);
  const [refundable, setRefundable] = useState('0');

  const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefundAddress(event.target.value);
  };

  const handleRefund = async function () {
    if (!lidPresaleSC || refundable === '0') {
      return;
    }

    await lidPresaleSC.methods
      .claimRefund(refundAddress)
      .send({ from: address });
    alert(
      'Deposit request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

  useEffect(() => {
    const updateRefunable = async () => {
      if (!isAddress(refundAddress) || !lidPresaleSC) {
        setRefundable('0');
      } else {
        const result = await lidPresaleSC.methods
          .getRefundableEth(refundAddress)
          .call();
        setRefundable(result);
      }
    };
    updateRefunable();
  }, [refundAddress, lidPresaleSC]);

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
          textAlign="center"
          border="solid 1px"
          borderRadius="5px"
          borderColor="lid.stroke"
          bg="white"
          display="block"
          w="100%"
          mb="20px"
          p="20px"
        >
          <Text fontSize={['24px', '36px']} fontWeight="bold">
            {`Claim Refund: `} {`${shortEther(refundable)} ETH`}
          </Text>
          <Text fontSize={['12px', '14px']}>Enter the address to refund</Text>
          <Input
            fontSize="18px"
            w="100%"
            maxW="600px"
            mb="0px"
            display="inline-block"
            min={0.01}
            mt="10px"
            value={refundAddress}
            onChange={updateAddress}
          />
          <Button
            isDisabled={refundable === '0'}
            variantColor="blue"
            bg="lid.brand"
            color="white"
            border="none"
            display="block"
            borderRadius="25px"
            w="200px"
            h="50px"
            m="0px"
            mt="30px"
            fontWeight="regular"
            fontSize="18px"
            ml="auto"
            mr="auto"
            onClick={handleRefund}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Refunder;
