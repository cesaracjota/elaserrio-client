import React, { useEffect } from 'react';
import {
  IconButton,
  Stack,
  Text,
  Divider,
  Badge,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../helpers/Loading';
import { getEstudiante, reset } from '../../features/estudianteSlice';

const DetallesEstudiante = ({ location }) => {
  const dispatch = useDispatch();

  const { sedeSeleccionada } = useSelector(state => state.auth);
  const { estudiante, isLoading } = useSelector(state => state.estudiantes);

  const params = useParams(location);

  useEffect(() => {
    dispatch(getEstudiante(params.id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, params.id]);

  const getBithdayTimer = birthday => {
    if (!birthday) return 'No hay fecha de nacimiento';
    else {
      const date = new Date(birthday);
      const today = new Date();
      const diffMonth = today.getMonth() - date.getMonth();
      const diffDay = today.getDate() - date.getDate() - 1;

      if (Math.abs(diffMonth) === 0 && Math.abs(diffDay) === 0) {
        return '¡Feliz cumpleaños!';
      } else if (Math.abs(diffMonth) === 0) {
        return `${Math.abs(diffDay)} días`;
      } else if (Math.abs(diffMonth) > 1) {
        return `${Math.abs(diffMonth)} meses y ${Math.abs(diffDay)} días`;
      } else {
        return `${Math.abs(diffMonth)} mes y ${Math.abs(diffDay)} días`;
      }
    }
  };

  let faltaCumpleanios = getBithdayTimer(estudiante?.fecha_nacimiento);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <HStack spacing={4} direction="row">
          <Link to={`/${sedeSeleccionada?._id}/estudiantes`}>
            <IconButton
              icon={<FaArrowLeft />}
              colorScheme="gray"
              rounded="full"
            />
          </Link>
          <Text fontSize="md">Regresar</Text>
        </HStack>
        <HStack spacing={4} direction="row">
          <Text fontSize="lg" fontWeight={'bold'}>
            Detalles del Estudiante Seleccionado
          </Text>
        </HStack>
      </Stack>

      <Stack
        direction="column"
        mt={3}
        p={6}
        borderRadius="2xl"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        _dark={{ bg: 'primary.1000' }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          w="full"
          justifyContent="stretch"
          spacing={4}
        >
          <Avatar
            name={estudiante?.nombres}
            src={estudiante?.img}
            size={'2xl'}
            fontWeight="bold"
            color={'white'}
            fontSize={'2xl'}
            alignSelf={'center'}
            borderRadius="lg"
            p={4}
            rounded="full"
          />
          <Stack
            direction="column"
            p={6}
            spacing={4}
            w="full"
            bg="white"
            _dark={{ bg: 'primary.1000' }}
          >
            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <Text fontWeight="bold" mr={2}>
                APELLIDOS{' '}
              </Text>
              <Text>{estudiante?.apellidos}</Text>
            </Stack>
            <Divider />
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <Text fontWeight="bold" mr={2}>
                NOMBRES{' '}
              </Text>
              <Text>{estudiante?.nombres}</Text>
            </Stack>
            <Divider />
            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <Text fontWeight="bold" mr={2}>
                DNI{' '}
              </Text>
              <Text>{estudiante?.dni}</Text>
            </Stack>

            <Divider />

            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <Text fontWeight="bold" mr={2}>
                SEXO{' '}
              </Text>
              <Text>{estudiante?.sexo === 'M' ? 'MASCULINO' : 'FEMENINO'}</Text>
            </Stack>

            <Divider />

            <Divider />

            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
            >
              <Text fontWeight="bold">ESTADO:</Text>
              <Badge
                colorScheme={
                  estudiante?.estado === 'ACTIVO'
                    ? 'green'
                    : estudiante?.estado === 'RETIRADO'
                    ? 'gray'
                    : 'red'
                }
                variant="solid"
                px={6}
                py={2}
                rounded="full"
              >
                {estudiante?.estado}
              </Badge>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        p={12}
        spacing={4}
        w="full"
        borderRadius="2xl"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        mt={3}
        _dark={{ bg: 'primary.1000' }}
      >
        <Stack justifyContent="center">
          <Text fontSize={'xl'} fontWeight="bold" textAlign="center">
            MÁS DETALLES DEL ESTUDIANTE
          </Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            DOMICIO{' '}
          </Text>
          <Text>
            {!estudiante?.domicilio ? 'SIN REGISTRO' : estudiante?.domicilio}
          </Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            TURNO{' '}
          </Text>
          <Text>{estudiante?.turno}</Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            CORREO{' '}
          </Text>
          <Text>{estudiante?.correo}</Text>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            # CELULAR{' '}
          </Text>
          <Text>{estudiante?.celular}</Text>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            FECHA CUMPLEAÑOS{' '}
          </Text>
          <Text>
            {!estudiante?.fecha_nacimiento
              ? 'No se le agregó fecha de cumpleaños'
              : Moment.utc(estudiante?.fecha_nacimiento).format(
                  '[El] DD [de] MMMM [del] YYYY'
                )}
          </Text>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            CUANTO FALTA PARA SUS CUMPLEAÑOS{' '}
          </Text>
          <Badge
            colorScheme={'pink'}
            variant="solid"
            px={6}
            py={1.5}
            rounded="full"
          >
            {faltaCumpleanios}
          </Badge>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold">FECHA CREADA </Text>
          <Text>
            {Moment(estudiante?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}
          </Text>
        </Stack>
        <Divider />
      </Stack>

      <Stack
        direction="column"
        p={12}
        spacing={4}
        w="full"
        borderRadius="2xl"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        mt={3}
        _dark={{ bg: 'primary.1000' }}
      >
        <Stack justifyContent="center">
          <Text fontWeight="bold" fontSize={'xl'} textAlign="center">
            DETALLES ACERCA DE SUS PADRES
          </Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            NOMBRES Y APELLIDOS{' '}
          </Text>
          <Text>
            {!estudiante?.nombre_padres
              ? 'SIN REGISTRO'
              : estudiante?.nombre_padres}
          </Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            # CELULAR{' '}
          </Text>
          <Text>
            {!estudiante?.celular_padres
              ? 'SIN REGISTRO'
              : estudiante?.celular_padres}
          </Text>
        </Stack>
        <Divider />
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text fontWeight="bold" mr={2}>
            CORREO{' '}
          </Text>
          <Text>
            {!estudiante?.correo_padres
              ? 'SIN REGISTRO'
              : estudiante?.correo_padres}
          </Text>
        </Stack>
        <Divider />
      </Stack>
    </>
  );
};

export default DetallesEstudiante;
