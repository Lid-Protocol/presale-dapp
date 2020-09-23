import React from 'react';
import { Box, Image } from '@chakra-ui/core';

import image from 'assets/images/common/LID_h.png';

export default function Logo(props: any) {
  return (
    <Box {...props}>
      <Image src={image} />
    </Box>
  );
}
