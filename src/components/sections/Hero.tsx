import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text
} from '@chakra-ui/core';

import certifiedImage from 'assets/images/common/certified.png';

export default function Hero(props: any) {
  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="no-wrap"
      minH="60vh"
      px={8}
      {...props}
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '40%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={['center', 'center', 'left', 'left']}
        >
          {props.title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
        >
          {props.subtitle}
        </Heading>
      </Stack>
      <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        <Image src={certifiedImage} size="100%" rounded="1rem" />
      </Box>
    </Flex>
  );
}
