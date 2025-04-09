import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CustomToast } from '../../helpers/toast';
import { setSede, logout } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgGradient from '../../assets/img/gradient-bg.svg';
import logo2 from '../../assets/img/logoColegio.png';

const SelectSede = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [sedeId, setSedeId] = useState(null);

  useEffect(() => {
    if (!user?.usuario?.sedes?.length) {
      navigate('/login', { replace: true });
    } else if (user?.usuario?.sedes?.length === 1) {
      const sedeSeleccionada = user?.usuario?.sedes[0];
      dispatch(setSede(sedeSeleccionada));
      localStorage.setItem(
        'sedeSeleccionada',
        JSON.stringify(sedeSeleccionada)
      );
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate, user?.usuario?.sedes]);

  const handleSedeSelection = () => {
    const sedeSeleccionada = user?.usuario?.sedes?.find(s => s._id === sedeId);
    if (sedeSeleccionada) {
      dispatch(setSede(sedeSeleccionada));
      localStorage.setItem(
        'sedeSeleccionada',
        JSON.stringify(sedeSeleccionada)
      );
      CustomToast({
        title: 'BIENVENIDO',
        message: 'Cargando datos...',
        type: 'loading',
        duration: 3500,
        position: 'bottom'
      });
      navigate('/', { replace: true });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('sedeSeleccionada');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 🔹 Si hay solo UNA sede, no mostramos nada porque el `useEffect` ya la seleccionó
  if (user?.usuario?.sedes?.length === 1) {
    return null;
  }

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgImage={bgGradient}
      bgSize="cover"
      bgPosition="center"
      flexDirection="column"
    >
      <Box
        bg="white"
        px={6}
        py={14}
        rounded="3xl"
        shadow="lg"
        maxW="xl"
        w="full"
        borderWidth={1}
        borderColor="primary.100"
        mx={4}
        _dark={{
          borderColor: 'primary.800',
          bg: 'gray.800',
        }}
      >
        <Stack spacing={6}>
          <Header />
          <Select
            placeholder="SELECCIONAR UNA SEDE"
            size="lg"
            focusBorderColor="primary.100"
            onChange={event => setSedeId(event.target.value)}
          >
            {user?.usuario?.sedes?.map(sede => (
              <option key={sede._id} value={sede._id}>
                {sede.nombre}
              </option>
            ))}
          </Select>
          <Stack spacing={2} direction={'column'}>
            <Button
              bg="primary.100"
              color="white"
              _hover={{ bg: 'primary.300' }}
              size="lg"
              fontSize="md"
              fontWeight="bold"
              loadingText="Validando credenciales..."
              onClick={handleSedeSelection}
              isDisabled={!sedeId}
            >
              ACCEDER
            </Button>
            <Button
              variant="solid"
              onClick={handleLogout}
              w="full"
              fontSize={['sm', 'md']}
              size={['md', 'lg']}
            >
              REGRESAR
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

const Header = () => (
  <Box textAlign="center">
    <Image
      src={logo2}
      alt="Logo del colegio"
      width={100}
      height={100}
      margin="0 auto"
    />
    <Heading fontSize="xl" mt={4} fontWeight="black">
      Seleccionar Sede de Trabajo
    </Heading>
    <Text fontSize="md" color="gray.600" mt={2}>
      Elija su sede para continuar
    </Text>
  </Box>
);

export default SelectSede;
