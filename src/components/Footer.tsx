import React from 'react';
import { Text, Box, Link, Image } from '@chakra-ui/core';

import imgLidWhite from 'assets/images/common/LID_white_h.png';
import iconDiscord from 'assets/images/icons/discord.png';
import iconTelegram from 'assets/images/icons/telegram.png';
import iconTwitter from 'assets/images/icons/twitter.png';
import iconReddit from 'assets/images/icons/reddit.png';
import iconGithub from 'assets/images/icons/github.png';
import iconYoutube from 'assets/images/icons/youtube.png';

const Footer: React.FC = () => {
  return (
    <Box
      w="100%"
      minH="100px"
      bg="lid.brandDark"
      color="lid.bg"
      position="relative"
      p="40px"
      mt="40px"
      fontWeight="normal"
      textAlign="center"
      fontSize="18px"
      border-top="solid 1px gray"
      ml="auto"
      mr="auto"
      borderTop="solid 1px"
      borderColor="lid.ltGray"
    >
      <Link display="inline-block" href="https://lid.sh" m="0px">
        <Image
          src={imgLidWhite}
          alt="Lid.sh Website"
          w="auto"
          h="35px"
          m="0px"
        />
      </Link>
      <Text mt="20px" fontSize="14px">
        LID Links
      </Text>
      <Link display="inline-block" href="https://discord.gg/eyJYrQu" m="20px">
        <Image w="auto" h="25px" src={iconDiscord} alt="discord" />
      </Link>
      <Link display="inline-block" href="https://t.me/LIDProtocol" m="20px">
        <Image w="auto" h="25px" src={iconTelegram} alt="telegram" />
      </Link>
      <Link
        display="inline-block"
        href="https://twitter.com/LID_Protocol"
        m="20px"
      >
        <Image w="auto" h="25px" src={iconTwitter} alt="twitter" />
      </Link>
      <Link
        display="inline-block"
        href="https://www.reddit.com/r/LIDProtocol/"
        m="20px"
      >
        <Image w="auto" h="25px" src={iconReddit} alt="reddit" />
      </Link>
      <Link
        display="inline-block"
        href="https://github.com/carlsbad-sunshine/lid-contracts"
        m="20px"
      >
        <Image w="auto" h="25px" src={iconGithub} alt="github" />
      </Link>
      <Link
        display="inline-block"
        href="https://www.youtube.com/channel/UCM6Q_SMoQAALhhiJW5OZF9w/featured"
        m="20px"
      >
        <Image w="auto" h="25px" src={iconYoutube} alt="youtube" />
      </Link>
      <Text color="lid.buttonFgGray" m="0px" fontSize="14px">
        © 2020 Liquidity Dividends Protocol. All Rights Reserved.
      </Text>
    </Box>
  );
};

export default Footer;
