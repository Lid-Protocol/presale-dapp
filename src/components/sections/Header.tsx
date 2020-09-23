import React from 'react';
import { Flex, Link } from '@chakra-ui/core';
import Logo from './Logo';

interface MenuItemProps {
  children: any;
  isLast: boolean;
  to: string;
}

const Header = (props: any) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      pl={{ base: 2, md: 8 }}
      color="white"
      {...props}
    >
      <Flex align="center">
        <Link href="/">
          <Logo w="100px" color="white" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
