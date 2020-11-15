import React, { useState, useEffect } from 'react';
import { Text, Box } from '@chakra-ui/core';

import Web3 from 'web3';
// @ts-ignore
import { createWatcher } from '@makerdao/multicall';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { toWei } from 'utils';
import abis from 'contracts/abis';

import Header from './Header';
import SubHeading from './SubHeading';
import StartTimer from './StartTimer';
import ReferralCode from './ReferralCode';
import Footer from './Footer';
import Refunder from './Refunder';
import DepositForm from './DepositForm';
import PresaleCompletion from './PresaleCompletion';
import Claimer from './Claimer';
import { DappMetaData } from 'types';
import { useHistory } from 'react-router-dom';

const defaultWatcher = createWatcher([], {});
const walletWatcher = createWatcher([], {});

interface IMainApp {
  address: string;
  web3: Web3 | null;
  onConnect: () => void;
  meta: DappMetaData;
}

const MainApp: React.FC<IMainApp> = ({ address, web3, onConnect, meta }) => {
  const { addresses } = meta;
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
    totalShares: '0',
    referralBP: '0',
    hardcap: '0',
    hardCapTimer: 0,
    stakingLid: '0',
    redeemBP: '1',
    redeemInterval: '1',
    isEnded: false,
    isPaused: false,
    isRefunding: false,
    hasSentToUniswap: false
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
    totalShares,
    referralBP,
    hardcap,
    hardCapTimer,
    stakingLid,
    redeemBP,
    redeemInterval,
    isEnded,
    isPaused,
    isRefunding,
    hasSentToUniswap
  } = state;

  const history = useHistory();
  let referralAddress = history.location.pathname.split('/')[2];

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
          target: addresses.redeemer,
          call: ['totalShares()(uint256)'],
          returns: [['totalShares', (val: any) => val.toString()]]
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
          call: ['paused()(bool)'],
          returns: [['isPaused']]
        },
        {
          target: addresses.presale,
          call: ['hasSentToUniswap()(bool)'],
          returns: [['hasSentToUniswap']]
        },
        {
          target: addresses.presale,
          call: ['maxBuyPerAddress()(uint256)'],
          returns: [['maxDeposit', (val: any) => val.toString()]]
        },
        {
          target: addresses.timer,
          call: ['endTime()(uint256)'],
          returns: [['endTime', (val: any) => val.toNumber() * 1000]]
        },
        {
          target: addresses.timer,
          call: ['hardCapTimer()(uint256)'],
          returns: [['hardCapTimer', (val: any) => val.toNumber() / 3600]]
        },
        {
          target: addresses.presale,
          call: ['referralBP()(uint256)'],
          returns: [['referralBP', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['hardcap()(uint256)'],
          returns: [['hardcap', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['redeemBP()(uint256)'],
          returns: [['redeemBP', (val: any) => val.toString()]]
        },
        {
          target: addresses.redeemer,
          call: ['redeemInterval()(uint256)'],
          returns: [['redeemInterval', (val: any) => val.toString()]]
        }
      ],
      multiCallConfig
    );

    defaultWatcher.subscribe((update: any) => {
      console.log(update);
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
            toWei(meta.totalPresale),
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
            toWei(meta.totalPresale)
          ],
          returns: [['accountRedeemable', (val: any) => val.toString()]]
        },
        {
          target: addresses.presale,
          call: ['isRefunding()(bool)'],
          returns: [['isRefunding']]
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
        totalShares={hasSentToUniswap ? totalShares : maxShares}
        stakingLid={stakingLid}
        expiryTimestamp={endTime}
        hardcap={hardcap}
        hardCapTimer={hardCapTimer}
        isActive={isActive}
        startTime={startTime}
        accessTime={accessTime}
      />
      {isPaused && !isRefunding && (
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
      {isRefunding && (
        <Refunder lidPresaleSC={lidPresaleSC} address={address} />
      )}
      {isActive && isEnded && !isPaused && (
        <Claimer
          lidPresaleSC={lidPresaleSC}
          address={address}
          meta={meta}
          totalShares={hasSentToUniswap ? totalShares : maxShares}
          redeemBP={redeemBP}
          redeemInterval={redeemInterval}
          finalEndTime={finalEndTime}
          accountShares={accountShares}
          accountRedeemable={accountRedeemable}
          accountClaimedTokens={accountClaimedTokens}
        />
      )}

      {isActive && !isEnded && !isPaused && (
        <>
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
            referralBP={referralBP}
          />
        </>
      )}
      {!isActive && isEnded && !isPaused && (
        <StartTimer
          startTime={startTime}
          accessTime={accessTime}
          meta={meta}
          stakingLid={stakingLid}
        />
      )}
      {referralBP !== '0' && (
        <ReferralCode
          address={address}
          earnedReferrals={earnedReferrals}
          referralCounts={referralCounts}
          projectName={meta.project}
          referralBP={referralBP}
        />
      )}
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
