import React, { Fragment } from 'react';
import styled from 'styled-components';

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

const StyledImage = styled.img`
  height: 20rem;
`;

const StyledTextWrapper = styled.div`
  margin-top: 3rem;
`;

const StyledText = styled.h3``;

export default () => {
  return (
    <Fragment>
      <StyledContainer>
        <StyledBody>
          <StyledImage src={NotFoundImage} />
          <StyledTextWrapper>
            <StyledText>The page you are looking for doesn't exist</StyledText>
          </StyledTextWrapper>
        </StyledBody>
      </StyledContainer>
      <Footer />
    </Fragment>
  );
};
