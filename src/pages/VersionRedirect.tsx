import React, { Fragment } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import { Link } from '@chakra-ui/core';
import { DappMetaData } from 'types';

import NotFoundImage from 'assets/images/common/404.png';
import Footer from 'components/Footer';

const StyledContainer = styled.div`
  max-height: 100vh;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const StyledTextWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const StyledText = styled.h3``;

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
  meta: DappMetaData;
}

export default (props: IProps) => {
  return (
    <Fragment>
      <StyledContainer>
        <StyledBody>
          <StyledTextWrapper>
            <StyledText>{props.meta.tokenName} sale is on version 1.0.0.</StyledText>
            <Link
              bg="lid.brand"
              color="white"
              border="none"
              display="block"
              borderRadius="25px"
              w="200px"
              h="50px"
              m="0px"
              mt="30px"
              fontWeight="regular"
              fontSize="18px"
              paddingTop="11px"
              textAlign="center"
              marginLeft="auto"
              marginRight="auto"
              href={"https://v1.sale.lid.sh/"+props.meta.project}
            >
              Go to Sale
            </Link>
          </StyledTextWrapper>
        </StyledBody>
      </StyledContainer>
      <Footer />
    </Fragment>
  );
};
