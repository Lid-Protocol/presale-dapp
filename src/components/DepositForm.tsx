import React, { useState } from 'react';
import Web3 from 'web3';
import {
  Box,
  Text,
  Button,
  NumberInput,
  NumberInputField
} from '@chakra-ui/core';
import { Contract } from 'web3-eth-contract';
import { removeDecimal, toBN, toWei, fromWei } from 'utils';
import { DappMetaData } from 'types';

interface IDepositForm {
  web3: Web3 | null;
  address: string;
  lidPresaleSC: Contract | null;
  referralAddress: string;
  maxDeposit: string;
  accountEthDeposit: string;
  totalEth: string;
  hardcap: string;
  currentPrice: string;
  meta: DappMetaData;
}

const DepositForm: React.FC<IDepositForm> = ({
  web3,
  address,
  lidPresaleSC,
  referralAddress,
  maxDeposit,
  accountEthDeposit,
  hardcap,
  totalEth,
  currentPrice,
  meta
}) => {
  const [displayVal, setDisplayVal] = useState('0');
  const depositVal = !!displayVal ? toWei(displayVal) : '0';

  const availableByAccountDeposit = toBN(meta.accountCap).gte(
    toBN(accountEthDeposit)
  )
    ? toBN(meta.accountCap).sub(toBN(accountEthDeposit))
    : toBN('1');
  const availableByTotalDeposit = toBN(hardcap).gte(toBN(totalEth))
    ? toBN(hardcap)
        .sub(toBN(totalEth))
        .add(
          toBN(hardcap)
            .sub(toBN(totalEth))
            .mul(toBN(meta.referralBP))
            .div(toBN(meta.basisPoint))
        )
    : toBN('1');

  const availableMax = availableByAccountDeposit.gte(availableByTotalDeposit)
    ? availableByTotalDeposit
    : availableByAccountDeposit;

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setDisplayVal('');
    } else if (Number(event.target.value) > 140000000) {
      setDisplayVal('140000000');
    } else if (Number(event.target.value) < 0) {
      setDisplayVal('0');
    } else {
      const inputStr = event.target.value;
      setDisplayVal(
        inputStr.indexOf('.') >= 0
          ? inputStr.substr(0, inputStr.indexOf('.')) +
              inputStr.substr(inputStr.indexOf('.'), 19)
          : inputStr
      );
    }
  };

  const handleDeposit = async function () {
    if (!web3 || !lidPresaleSC) {
      return;
    }
    if (!depositVal) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    if (toBN(depositVal).lt(toBN(toWei('0.01')))) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    if (toBN(maxDeposit).lt(toBN(depositVal))) {
      alert('Must enter a value between 0.01 eth and max.');
      return;
    }
    const balance = await web3.eth.getBalance(address);
    if (toBN(balance).lt(toBN(depositVal))) {
      alert('Must enter a value lower than your ETH balance.');
      return;
    }
    if (referralAddress === address) {
      alert('Sender cannot be referrer. Use a different referral address.');
      return;
    }

    await lidPresaleSC.methods
      .deposit(referralAddress)
      .send({ from: address, value: depositVal });
    alert(
      'Deposit request sent. Check your wallet to see when it has completed, then refresh this page.'
    );
  };

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
        w="100%"
        p="20px"
        textAlign="left"
        color="lid.fg"
        position="relative"
        border="solid 1px"
        borderColor="lid.stroke"
      >
        <Text fontSize={['24px', '36px']} fontWeight="bold">
          {`Deposit ETH for ${meta.tokenName}`}
        </Text>
        <Text fontSize="18px" color="blue.500">
          Minimum 0.01 ETH, Maximum {removeDecimal(fromWei(meta.accountCap))}{' '}
          ETH
        </Text>
        <Text fontSize="18px" color="red.500">
          Your Available Max: {removeDecimal(fromWei(availableMax))} ETH
        </Text>
        <Text fontSize="18px">
          {`Estimated ${meta.tokenName}: `}
          {!depositVal
            ? '0'
            : removeDecimal(
                fromWei(
                  toBN(depositVal)
                    .mul(toBN(currentPrice))
                    .mul(toBN('10000'))
                    .div(toBN('10250'))
                    .div(toBN(toWei('1')))
                )
              )}
        </Text>

        <NumberInput
          fontSize="18px"
          w="100%"
          maxW="600px"
          mb="0px"
          display="inline-block"
          value={displayVal}
          min={0.01}
          max={Number(fromWei(availableMax))}
          mt="10px"
        >
          <NumberInputField
            w="100%"
            h="50px"
            border="solid 2px"
            borderColor="lid.stroke"
            borderRadius="30px"
            pl="20px"
            fontSize="18px"
            position="relative"
            zIndex={1}
            pattern="[0-9\.]*"
            type="number"
            bg="lid.bg"
            color="lid.fg"
            placeholder="Amount of ETH to deposit."
            // whilePlaceholder={{ color: 'lid.fgMed' }}
            onChange={onChangeInput}
          />
          <Button
            fontSize="18px"
            display="inline-block"
            border="solid 2px"
            borderRadius="25px"
            bg="lid.buttonBg"
            color="lid.fgLight"
            w="120px"
            h="50px"
            top="0"
            position="absolute"
            right="0px"
            zIndex={2}
            m="0px"
            borderColor="lid.buttonBg"
            onClick={() => setDisplayVal(fromWei(availableMax))}
          >
            Max
          </Button>
        </NumberInput>
        <Button
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
          onClick={handleDeposit}
        >
          Deposit
        </Button>
      </Box>
    </Box>
  );
};

export default DepositForm;
