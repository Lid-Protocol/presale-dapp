import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Heading,
  Stack,
  Text
} from '@chakra-ui/core';

import certifiedImage from 'assets/images/common/certified.png';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;
}

export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}: Partial<HeroProps>) {
  return (
    <Flex
      justify={{
        base: 'center',
        sm: 'space-between',
        md: 'space-around',
        xl: 'space-between'
      }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="nowrap"
      minH="70vh"
      align="center"
      px={{ base: 0, sm: 0, md: 0 }}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: '90%', md: '40%' }}
        mt={30}
        align={['left', 'left', 'flex-start', 'flex-start']}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={['left', 'left', 'left', 'left']}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          opacity={0.8}
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['left', 'left', 'left', 'left']}
        >
          {subtitle}
        </Heading>
      </Stack>
      <Box w={{ base: '100%', sm: '100%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        <Image
          src={image}
          w={{ base: '100%', sm: '100%', md: '70%' }}
          rounded="1rem"
        />
      </Box>
    </Flex>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string
};

Hero.defaultProps = {
  title: 'LID Certified Presale Protocol',
  subtitle:
    'The Liquidity Dividends Protocol uses new technology that provides solutions for depositing liquidity into Uniswap while also offering a social rewards based staking system.',
  image: certifiedImage
};
