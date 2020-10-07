import React, { Fragment } from 'react';
import { DappMetaData } from 'types';
import { Flex } from '@chakra-ui/core';
import Hero from 'components/sections/Hero';
import Header from 'components/sections/Header';
import Footer from 'components/Footer';
import Projects from 'components/sections/Projects';
import { data } from 'templates/data';
import Head from 'layout/Head';

import favicon from '../assets/images/icons/favicon.ico';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
  meta: DappMetaData;
}
export default (props: IProps) => {
  return (
    <Fragment>
      <Head
        meta={{
          tokenName: '',
          tokenSymbol: '',
          tokenOwnerWebsite: '',
          siteUrl: '',
          totalPresale: '',
          referralBP: '',
          basisPoint: '',
          accountCap: '',
          favicon: '/assets/images/icons/favicon.ico',
          addresses: {
            presale: '',
            redeemer: '',
            timer: '',
            token: '',
            access: '',
            staking: ''
          }
        }}
      />
      <Header />
      <Hero />
      <Flex direction="column" maxW={{ xl: '1200px' }} m="0 auto" {...props}>
        <Projects items={data} />
      </Flex>
      <Footer />
    </Fragment>
  );
};
