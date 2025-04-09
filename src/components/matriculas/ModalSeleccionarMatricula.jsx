import React, { useState } from 'react';
import {
  Button,
  Icon,
  Modal,
  Stack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import ModalRegistrarMatricula from './ModalRegistrarMatricula';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const ModalSeleccionarMatricula = ({ grados }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        colorScheme="primary"
        _dark={{
          bg: 'primary.100',
          color: 'white',
          _hover: { bg: 'primary.300' },
        }}
        aria-label="Agregar"
        leftIcon={<Icon as={VscAdd} fontSize="lg" />}
        variant="solid"
        onClick={handleModalOpen}
        rounded={'xl'}
      >
        Nueva Matrícula
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="5xl"
        isCentered
      >
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">ELEGIR UNA OPCIÓN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              align="center"
              direction={{ base: 'column', lg: 'row' }}
              display="flex"
              justifyContent="space-between"
              padding={4}
              spacing={6}
            >
              <Stack
                align="center"
                direction={'column'}
                boxShadow={'base'}
                borderRadius="md"
                w="full"
                padding={4}
                borderWidth="1px"
                borderColor={'purple.400'}
              >
                <Icon as={AddIcon} boxSize={30} />

                <ModalRegistrarMatricula grados={grados} />
                
              </Stack>
              <Stack
                align="center"
                direction={'column'}
                boxShadow={'base'}
                borderRadius="md"
                w="full"
                padding={4}
                borderWidth="1px"
                borderColor={'purple.400'}
              >
                <Icon as={AddIcon} boxSize={30} />
                <Link
                  to={{
                    pathname: '/estudiantes/agregar',
                  }}
                >
                  <Button
                    colorScheme="messenger"
                    size="lg"
                    fontSize={'sm'}
                  >
                    REGISTRAR NUEVO ESTUDIANTE
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSeleccionarMatricula;
