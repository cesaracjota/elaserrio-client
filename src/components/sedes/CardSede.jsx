import React from 'react';
import { Heading, Text, Card, CardBody, CardHeader, CardFooter, Button } from '@chakra-ui/react';

const CardSede = ({ grade }) => {
  return (
    <>
      <Card
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <CardHeader bg="blue.500" color="white" p={4}>
          <Heading size="md">{grade?.nombre}</Heading>
        </CardHeader>
        <CardBody p={4}>
          <Text fontSize="lg">
            {grade?.descripcion}
          </Text>
        </CardBody>
        <CardFooter p={4} textAlign="right">
          <Button colorScheme="blue">Ver Listado de Estudiantes</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardSede;
