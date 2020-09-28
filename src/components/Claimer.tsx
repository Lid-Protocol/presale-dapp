import React, { useEffect, useState } from 'react';
import { Text, Box, Button, Grid, Input, Textarea } from '@chakra-ui/core';
import { shortEther, toBN, toWei } from 'utils';
import { Contract } from 'web3-eth-contract';
import CountDownShort from './CountDownShort';
import { DappMetaData } from 'types';

interface IClaimer {
  lidPresaleSC: Contract | null;
  address: string;
  maxShares: string;
  finalEndTime: string;
  accountShares: string;
  accountRedeemable: string;
  accountClaimedTokens: string;
  redeemBP: string;
  redeemInterval: string;
  meta: DappMetaData;
  isRefunding: boolean;
}

const Claimer: React.FC<IClaimer> = ({
  lidPresaleSC,
  address,
  maxShares,
  finalEndTime,
  accountShares,
  accountRedeemable,
  accountClaimedTokens,
  redeemBP,
  redeemInterval,
  meta,
  isRefunding
}) => {
  const [active, setActive] = useState(true);
  const [accountAddress, setAccountAddress] = useState("placeHolder");

  const redeemPercent = Math.floor(
    Number(redeemBP) / 100 / (Number(redeemInterval) / 3600)
  );

  const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountAddress(event.target.value);
  }

  const handleSubmit = async function () {
    if (!lidPresaleSC) {
      return;
    }

    await lidPresaleSC.methods.getRefundableEth(accountAddress).call(function (error: any, result: any){
      if (result <= 0) {
        alert("Refundable Eth is less than 0");
        return;
      }
    })

    await lidPresaleSC.methods
      .claimRefund(accountAddress)
      .send({from: accountAddress });
    alert(
      'Deposit request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

  const claimPeriod = toBN(finalEndTime)
    .add(toBN(redeemInterval).mul(toBN(10000)).div(toBN(redeemBP)))
    .toNumber();

  useEffect(() => {
    if (Date.now() / 1000 < claimPeriod) {
      setActive(true);
      let interval = setInterval(() => {
        setActive(Date.now() / 1000 < claimPeriod);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setActive(false);
    }
}, [redeemBP, redeemInterval]);

  const handleClaim = async function () {
    if (!lidPresaleSC) {
      return;
    }
    if (toBN(accountRedeemable).lt(toBN('1'))) {
      alert(`You must have at least 1 wei of ${meta.tokenSymbol} to claim.`);
      return;
    }
    await lidPresaleSC.methods.redeem().send({ from: address });
    alert(
      'Claim request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

  if (isRefunding) {
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
            {`Claim Refund`}
          </Text>
    
          <Input
            fontSize="18px"
            w="100%"
            maxW="600px"
            mb="0px"
            display="inline-block"
            min={0.01}
            mt="10px"
            onChange={updateAddress}
          />

          <Button
            isDisabled={accountRedeemable === '0'}
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
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Box>
        </Box>
        </>
        )
  } else {

  return (
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
          {`Claim Your ${meta.tokenSymbol}`}
        </Text>
        <Text fontSize="18px" color="blue.500">
          {redeemPercent}% released / hour
        </Text>
        <Text fontSize="18px" color="lid.fg">
          {`${meta.tokenSymbol} to Claim: ${shortEther(accountRedeemable)}`}
        </Text>
        <Button
          isDisabled={accountRedeemable === '0'}
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
          onClick={handleClaim}
        >
          Claim
        </Button>
      </Box>
      <Grid
        w="100%"
        gap="20px"
        mb="40px"
        templateRows={['repeat(2, 1fr)', 'max-content']}
        templateColumns={['auto', 'repeat(2, minmax(0, 1fr))']}
      >
        <Box
          w="100%"
          borderRadius="5px"
          p="25px"
          border="solid 1px"
          borderColor="lid.stroke"
          bg="lid.bg"
        >
          <Text fontSize="18px" m="0" p="0" color="lid.fgMed">
            {`Total ${meta.tokenSymbol} Claimed`}
          </Text>
          <Text fontSize="38px" w="100%" fontWeight="bold">
            {shortEther(accountClaimedTokens)}
          </Text>
        </Box>
        <Box
          w="100%"
          borderRadius="5px"
          p="25px"
          border="solid 1px"
          borderColor="lid.stroke"
          bg="lid.bg"
        >
          <Text fontSize="18px" m="0" p="0" color="lid.fgMed">
            {`${meta.tokenSymbol} / Hour`}
          </Text>
          <Text fontSize="38px" w="100%" fontWeight="bold">
            {maxShares !== '0'
              ? shortEther(
                  toBN(accountShares)
                    .mul(toBN(toWei(meta.totalPresale)))
                    .div(toBN(maxShares))
                    .mul(toBN('2'))
                    .div(toBN('100'))
                    .toString()
                )
              : '0'}
          </Text>
        </Box>
      </Grid>
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
        {active ? (
          <>
            <Text fontSize="18px" color="lid.fg">
              {`More ${meta.tokenSymbol} available to claim in`}
            </Text>
            <CountDownShort expiryTimestamp={claimPeriod} />
          </>
        ) : (
          <Text fontSize="18px" color="lid.fg">
            {`All ${meta.tokenSymbol} available to claim`}
          </Text>
        )}
      </Box>
    </Box>
  );
        }
};

export default Claimer;