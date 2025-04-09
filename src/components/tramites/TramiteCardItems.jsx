import {  Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const TramiteCardItems = ({ icon, titulo, firstColor, componentButton  }) => {
  return (
    <Stack
      boxShadow={'base'}
      bg="white"
      _dark={{ bg: 'primary.1000' }}
      rounded={'2xl'}
      px={4}
      py={4}
      borderTop={'solid'}
      borderTopWidth={3}
      borderTopColor={firstColor}
    >
      <Stack
        spacing={4}
        mb={4}
        direction="row"
        justifyContent={'space-between'}
      >
        <Icon
          as={icon}
          color={firstColor}
          boxSize={10}
          alignSelf="center"
        />
        <Stack
          direction="column"
          spacing={0}
          textAlign={'end'}
          alignSelf={'center'}
        >
          <Text color={'gray.500'} fontSize="lg" noOfLines={1}>
            {titulo}
          </Text>
        </Stack>
      </Stack>
      {componentButton}
    </Stack>
  );
};

export default TramiteCardItems;
