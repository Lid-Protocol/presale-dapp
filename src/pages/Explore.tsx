import React, { Fragment } from 'react';
import { DappMetaData } from 'types';
import { Flex } from '@chakra-ui/core';
import Hero from 'components/sections/Hero';
import Header from 'components/sections/Header';
import Footer from 'components/Footer';
import Projects from 'components/sections/Projects';
import { data } from 'templates/data';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
  meta: DappMetaData;
}
export default (props: IProps) => {
  return (
    <Fragment>
      <Header />
      <Flex direction="column" maxW={{ xl: '1200px' }} m="0 auto" {...props}>
        <Hero />
        <Projects items={data} />
      </Flex>
      <Footer />
    </Fragment>
  );
};
