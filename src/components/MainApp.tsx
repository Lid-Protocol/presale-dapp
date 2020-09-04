import React, { useState, useEffect } from 'react';
import { Text, Box } from '@chakra-ui/core';

import Web3 from 'web3';
// @ts-ignore
import { createWatcher } from '@makerdao/multicall';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { toWei } from 'utils';
import addresses from 'contracts/addresses';
import abis from 'contracts/abis';
import { totalPresale } from '../config';

import Header from './Header';
import SubHeading from './SubHeading';
import EndTimer from './EndTimer';
import StartTimer from './StartTimer';
import ReferralCode from './ReferralCode';
import Footer from './Footer';
import DepositForm from './DepositForm';
import PresaleCompletion from './PresaleCompletion';
import Claimer from './Claimer';
import { DappMetaData } from 'types';

const defaultWatcher = createWatcher([], {});
const walletWatcher = createWatcher([], {});

interface IMainApp {
  address: string;
  web3: Web3 | null;
  onConnect: () => void;
  meta: DappMetaData;
}

const MainApp: React.FC<IMainApp> = ({ address, web3, onConnect, meta }) => {
  const [lidPresaleSC, setLidPresale] = useState<Contract | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    startTime: Date.UTC(2020, 8, 1, 3, 45, 0, 0),
    accessTime: Date.UTC(2020, 8, 1, 4, 0, 0, 0),
    endTime: null,
    totalEth: '0',
    totalDepositors: '0',
    accountShares: '0',
    accountEthDeposit: '0',
    currentPrice: '0',
    maxDeposit: '0',
    earnedReferrals: '0',
    referralCounts: '0',
    finalEndTime: '0',
    accountRedeemable: '0',
    accountClaimedTokens: '0',
    maxShares: '0',
    hardcap: '0',
    stakingLid: '0',
    isEnded: false,
    isPaused: false
  });

  const {
    startTime,
    accessTime,
    endTime,
    totalEth,
    totalDepositors,
    accountShares,
    accountEthDeposit,
    currentPrice,
    maxDeposit,
    earnedReferrals,
    referralCounts,
    finalEndTime,
    accountRedeemable,
    accountClaimedTokens,
    maxShares,
    hardcap,
    stakingLid,
    isEnded,
    isPaused
  } = state;

  let referralAddress = window.location.hash.substr(2);
  if (!referralAddress || referralAddress.length !== 42)
    referralAddress = '0x0000000000000000000000000000000000000000';
  const multiCallConfig = {
    web3,
    multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    interval: 10000
  };

  useEffect(() => {
    if (!web3) {
      return;
    }

    const presale = new web3.eth.Contract(
      abis.presale as AbiItem[],
      addresses.presale
    );
    setLidPresale(presale);

    defaultWatcher.stop();

    defaultWatcher.recreate(
      [
        {
          call: ['getEthBalance(address)(uint256)', addresses.presale],
          returns: [['totalEth', (val: any) => val.toString()]]
        },
        {
          target: addresses.timer,
          call: ['startTime()(uint256)'],
          returns: [['startTime', (val: any) => val.toNumber() * 1000]]
        },
        {
          target: addresses.redeemer,
          call: ['totalDepositors()(uint256)'],
          returns: [['totalDepositors', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['finalEndTime()(uint256)'],
          returns: [['finalEndTime', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['isPresaleEnded()(bool)'],
          returns: [['isEnded']]
        },
        {
          target: addresses.presale,
          call: ['getMaxWhitelistedDeposit()(uint256)'],
          returns: [['maxDeposit', (val: any) => val.toString()]]
        },
        {
          target: addresses.timer,
          call: ['endTime()(uint256)'],
          returns: [['endTime', (val: any) => val.toNumber() * 1000]]
        },
        {
          target: addresses.presale,
          call: ['hardcap()(uint256)'],
          returns: [['hardcap', (val: any) => val.toString()]]
        }
      ],
      multiCallConfig
    );

    defaultWatcher.subscribe((update: any) => {
      setState((prevState) => ({
        ...prevState,
        [update.type]: update.value
      }));
    });

    defaultWatcher.start();
  }, [web3]);

  useEffect(() => {
    if (!web3 || !address || hardcap === '0') {
      return;
    }

    walletWatcher.stop();

    walletWatcher.recreate(
      [
        {
          target: addresses.access,
          call: [
            'getAccessTime(address,uint256)(uint256)',
            address,
            startTime / 1000
          ],
          returns: [['accessTime', (val: any) => (val.toNumber() + 60) * 1000]]
        },
        {
          target: addresses.staking,
          call: ['stakeValue(address)(uint256)', address],
          returns: [['stakingLid', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['accountShares(address)(uint256)', address],
          returns: [['accountShares', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['accountDeposits(address)(uint256)', address],
          returns: [['accountEthDeposit', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['earnedReferrals(address)(uint256)', address],
          returns: [['earnedReferrals', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['referralCounts(address)(uint256)', address],
          returns: [['referralCounts', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['accountClaimedTokens(address)(uint256)', address],
          returns: [['accountClaimedTokens', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['getMaxShares(uint256)(uint256)', hardcap],
          returns: [['maxShares', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: [
            'calculateRatePerEth(uint256,uint256,uint256)(uint256)',
            toWei(totalPresale),
            totalEth,
            hardcap
          ],
          returns: [['currentPrice', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: [
            'calculateReedemable(address,uint256,uint256)(uint256)',
            address,
            finalEndTime,
            toWei(totalPresale)
          ],
          returns: [['accountRedeemable', (val: any) => val.toString()]]
        }
      ],
      multiCallConfig
    );

    walletWatcher.subscribe((update: any) => {
      const { type, value } = update;
      setState((prevState) => ({
        ...prevState,
        [type]: value
      }));
    });

    walletWatcher.start();
  }, [web3, address, finalEndTime, totalEth, startTime, hardcap]);

  useEffect(() => {
    setIsActive(true);
    if (Date.now() < accessTime) {
      let interval = setInterval(() => {
        setIsActive(Date.now() > accessTime);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setIsActive(true);
    }
  }, [accessTime]);

  return (
    <>
      <Header address={address} meta={meta} onConnect={onConnect} />
      <SubHeading
        totalEth={totalEth}
        meta={meta}
        totalDepositors={totalDepositors}
        accountEthDeposit={accountEthDeposit}
        accountShares={accountShares}
        maxShares={maxShares}
        stakingLid={stakingLid}
      />
      {isPaused && (
        <>
          <Text
            fontSize="36px"
            textAlign="center"
            color="lid.brandDark"
            mt="60px"
          >
            Presale Paused.
          </Text>
          <Text textAlign="center" mb="200px">
            Please be patient. Upgrades underway.
          </Text>
        </>
      )}
      {isActive && isEnded && !isPaused && (
        <Claimer
          lidPresaleSC={lidPresaleSC}
          address={address}
          meta={meta}
          maxShares={maxShares}
          finalEndTime={finalEndTime}
          accountShares={accountShares}
          accountRedeemable={accountRedeemable}
          accountClaimedTokens={accountClaimedTokens}
        />
      )}
      {isActive && !isEnded && !isPaused && (
        <>
          {endTime !== 0 && (
            <EndTimer expiryTimestamp={endTime} hardcap={hardcap} />
          )}
          <DepositForm
            web3={web3}
            address={address}
            lidPresaleSC={lidPresaleSC}
            referralAddress={referralAddress}
            maxDeposit={maxDeposit}
            meta={meta}
            accountEthDeposit={accountEthDeposit}
            totalEth={totalEth}
            currentPrice={currentPrice}
            hardcap={hardcap}
          />
        </>
      )}
      {!isActive && !isEnded && !isPaused && (
        <StartTimer
          startTime={startTime}
          accessTime={accessTime}
          meta={meta}
          stakingLid={stakingLid}
        />
      )}
      <ReferralCode
        address={address}
        earnedReferrals={earnedReferrals}
        referralCounts={referralCounts}
      />
      <Box
        w="100%"
        maxW="1200px"
        bg="lid.stroke"
        height="1px"
        mt="40px"
        mb="40px"
        ml="auto"
        mr="auto"
      />
      {isActive && isEnded && !isPaused && (
        <PresaleCompletion
          meta={meta}
          isEnded={isEnded}
          address={address}
          lidPresaleSC={lidPresaleSC}
        />
      )}
      <Footer />
    </>
  );
};

export default MainApp;
