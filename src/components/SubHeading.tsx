import React from 'react';
import { Text, Box, Flex, Grid, Image, Link } from '@chakra-ui/core';
import { shortEther, toBN, toWei, formatAssetUrl } from 'utils';

import imgETHLogo from 'assets/images/common/ethereum-eth-logo.png';
import imgETHLogoWhite from 'assets/images/common/ethereum-eth-logo-white.png';
import imgLidLogo from 'assets/images/common/logo-lid.png';
import imgDepositor from 'assets/images/common/depositor.png';
import imgClock from 'assets/images/common/Timer_2x.png'

import { DappMetaData } from 'types';

import EndTimer from './EndTimer';

interface ISubHeading {
  totalEth: string;
  maxShares: string;
  stakingLid: string;
  totalDepositors: string;
  accountEthDeposit: string;
  accountShares: string;
  meta: DappMetaData;
  expiryTimestamp: number | null;
  hardcap: string;
  hardCapTimer: number;
}

const SubHeadings: React.FC<ISubHeading> = ({
  totalEth,
  totalDepositors,
  accountEthDeposit,
  accountShares,
  maxShares,
  stakingLid,
  meta,
  expiryTimestamp,
  hardcap,
  hardCapTimer
}) => {
  const { addresses } = meta;
  return (
    <Box
      w="100%"
      m="0"
      p={['20px', '20px', '0px']}
      pt="0px"
      pb="20px"
      bg="lid.bgMed"
      position="relative"
    >
      <Box
        position="absolute"
        zIndex={1}
        left="0px"
        right="0px"
        bottom="0px"
        height="100px"
        bg="lid.bg"
      />
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        ml="auto"
        mr="auto"
        p="0px"
        pt="20px"
        pb="20px"
        position="relative"
        zIndex={2}
      >
        <Grid
          w="100%"
          gap="20px"
          templateRows={['repeat(6, 1fr)', 'repeat(2, max-content)']}
          templateColumns={['auto', 'repeat(3, minmax(0, 1fr))']}
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
              {`Verified ${meta.tokenSymbol} Presale Contract`}
            </Text>
            {addresses.presale ? (
              <Link
                wordBreak="break-word"
                color="lid.brand"
                href={'https://etherscan.io/address/' + addresses.presale}
                mt="15px"
                display="block"
              >
                {addresses.presale}
              </Link>
            ) : (
              <Text>TBD</Text>
            )}
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="white"
            borderRadius="5px"
            p="25px"
            background="linear-gradient(0deg, rgba(12,101,235,1) 0%, rgba(28,158,247,1) 100%)"
          >
            <Image
              src={imgETHLogoWhite}
              alt="eth logo"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.bg" display="inline-block">
              Your ETH Deposits
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold">
              {shortEther(accountEthDeposit)}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="white"
            borderRadius="5px"
            p="25px"
            background="linear-gradient(0deg, rgba(12,101,235,1) 0%, rgba(28,158,247,1) 100%)"
          >
            <Image
              src={formatAssetUrl(meta.tokenName, 'logo.png')}
              alt="token logo"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.bg" display="inline-block">
              {`Your ${meta.tokenSymbol} Tokens`}
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold">
              {maxShares !== '0'
                ? shortEther(
                    toBN(accountShares)
                      .mul(toBN(toWei(meta.totalPresale)))
                      .div(toBN(maxShares))
                      .toString()
                  )
                : '0'}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg"
          >
            <Image
              src={imgDepositor}
              alt="depositor"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Total Presale Depositors
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {totalDepositors}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg"
          >
            <Image
              src={imgETHLogo}
              alt="eth logo"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Total ETH Deposited
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {shortEther(totalEth)}
            </Text>
          </Box>
          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg"
          >
            <Image
              src={formatAssetUrl(meta.tokenName, 'logo.png')}
              alt="token logo"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              {`Total Presale ${meta.tokenSymbol}`}
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {shortEther(toWei(meta.totalPresale))}
            </Text>
          </Box>

          <Box
            w="100%"
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg"
          >
            <Image
              src={imgLidLogo}
              alt="Lid Website"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />
            <Text ml="10px" mt="5px" color="lid.fgMed" display="inline-block">
              Your Staking Lid Tokens
            </Text>
            <Text fontSize="38px" w="100%" fontWeight="bold" color="lid.brand">
              {shortEther(stakingLid)}
            </Text>
          </Box>

          <Box
            w={["100%", "205%"]}
            border="solid 1px"
            borderColor="lid.stroke"
            color="lid.fg"
            borderRadius="5px"
            p="25px"
            bg="lid.bg"
          >

          <Image
              src={imgClock}
              alt="img clock"
              w="auto"
              h="25px"
              display="inline-block"
              position="relative"
              top="-3px"
            />

        <EndTimer
            expiryTimestamp={expiryTimestamp}
            hardcap={hardcap}
            hardCapTimer={hardCapTimer}
            meta={meta}
          />

          </Box>


        </Grid>
      </Flex>
    </Box>
  );
};

export default SubHeadings;
