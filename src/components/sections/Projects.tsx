import React from 'react';
import { Box, Image, Text, Link, Flex, Grid, Heading } from '@chakra-ui/core';

interface ProjectsProps {
  projectName: string;
  projectUrl: string;
  projectImage: string;
}

export default function Projects({ items }: any) {
  return (
    <Flex
      maxW={{ xl: '1200px' }}
      m="0 auto"
      w={{ base: '90%', md: '100%' }}
      direction="column"
      justifyContent="center"
    >
      <Box py={{ base: '2em', md: 0 }}>
        <Heading
          as="h1"
          size="lg"
          fontWeight="bold"
          color="lid.fg"
          py={{ base: 0, md: '2em' }}
          textAlign={['left', 'left', 'left', 'left']}
        >
          Presales launched on LID Certified Presale Protocol
        </Heading>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)'
        }}
        gap={6}
      >
        {items.map((item: ProjectsProps, index: number) => (
          <Link
            textDecoration="none"
            target="_blank"
            rel="noopener no-referrer"
            href={item.projectUrl}
            outline="none"
            key={index}
          >
            <Box
              w={{ base: '100%', sm: '100%', md: '100%' }}
              alignSelf="center"
              mb={{ base: 12, md: 0 }}
              shadow="2xl"
              roundedTopRight="1rem"
              roundedTopLeft="1rem"
              roundedBottom="1rem"
            >
              <Image
                src={item.projectImage}
                size="100%"
                roundedTopRight="1rem"
                roundedTopLeft="1rem"
              />
              <Text
                fontSize="md"
                py="1rem"
                textAlign="center"
                color="lid.brandDark"
                opacity={0.6}
              >
                {item.projectName}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </Flex>
  );
}
