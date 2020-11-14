import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Text, Box, Button, Grid } from '@chakra-ui/core';
import { shortEther } from 'utils';
import { METAMASK } from 'web3modal/dist/providers/injected';

interface IReferralCode {
  address: string;
  earnedReferrals: string;
  referralCounts: string;
  projectName: string;
  referralBP: string;
}

const ReferralCode: React.FC<IReferralCode> = ({
  address,
  earnedReferrals,
  referralCounts,
  projectName,
  referralBP
}) => {
  const siteUrl = window.location.origin;

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
        textAlign="left"
        border="solid 1px"
        borderRadius="5px"
        borderColor="lid.stroke"
        bg="white"
        display="block"
        w="100%"
        mb="20px"
        p="20px"
      >
        <CopyToClipboard text={`${siteUrl}/${projectName}/${address}`}>
          <Button
            display="block"
            color="lid.fgLight"
            bg="lid.buttonBg"
            borderRadius="25px"
            h="50px"
            w="140px"
            float="right"
            mt="25px"
          >
            Copy
          </Button>
        </CopyToClipboard>
        <Text fontSize="36px" color="lid.fg" width="100%">
          Referral Code
        </Text>
        <Text color="lid.brand" mt="10px" mb="10px">
          {referralBP}% rewards when anyone uses to deposit
        </Text>
        <Text
          wordBreak="break-word"
          p="15px"
          pl="25px"
          color="lid.fgMed"
          border="solid 1px"
          borderColor="lid.stroke"
          borderRadius="28px"
          w="100%"
        >
          {`${siteUrl}/${projectName}/${address}`}
        </Text>
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
            Account number of referrals
          </Text>
          <Text fontSize="38px" w="100%" fontWeight="bold">
            {referralCounts}
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
            Referral Eth Earned
          </Text>
          <Text fontSize="38px" w="100%" fontWeight="bold">
            {shortEther(earnedReferrals)}
          </Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default ReferralCode;
