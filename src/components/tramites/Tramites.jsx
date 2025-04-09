import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import '../../theme/solarizedTheme';
import { FaCertificate } from 'react-icons/fa';
import TramiteCardItems from './TramiteCardItems';
import { RiTicket2Fill } from 'react-icons/ri';
import ModalGeneraCertificadoTrabajo from './ModalGeneraCertificadoTrabajo';
import ModalGeneraBoletaPago from './ModalGenerarBoletaPago';

const Tramites = () => {
  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg" fontWeight="bold">
          Gestion de Trámites
        </Heading>
      </Stack>
      <Stack
        spacing={4}
        w="full"
        direction={'column'}
        py={4}
        justifyContent={'center'}
        alignContent={'center'}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
          <TramiteCardItems
            icon={FaCertificate}
            titulo={'Certificado de Trabajo'}
            firstColor={'gray.500'}
            secondColor={'gray.600'}
            componentButton={<ModalGeneraCertificadoTrabajo />}
            />
          <TramiteCardItems
            icon={RiTicket2Fill}
            titulo={'Boleta de Pago'}
            firstColor={'green.500'}
            secondColor={'green.600'}
            componentButton={<ModalGeneraBoletaPago />}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Tramites;
