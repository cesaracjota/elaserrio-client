import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { LoginForm } from './LoginForm';
import { CustomToast } from '../../helpers/toast';
import { login, setSede } from '../../features/authSlice';
import bgGradient from '../../assets/img/gradient-bg.svg';
import logo2 from '../../assets/img/logoColegio.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.auth);
  const { configuracion } = useSelector(state => state.configuraciones);

  // 🔹 Valores iniciales del formulario
  const initialValues = {
    correo: '',
    password: '',
  };

  // 🔹 Esquema de validación con Yup
  const validationSchema = Yup.object({
    correo: Yup.string()
      .email('Ingrese un correo válido')
      .required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  // 🔹 Manejo del login
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(login(values)).unwrap(); // 🔹 Unwrap para manejar errores correctamente

      // 🔹 Obtener las sedes del usuario
      const sedes = resultAction?.usuario?.sedes || [];
      if (sedes.length > 0) {
        const sedeSeleccionada = sedes[0]; // Selecciona automáticamente la primera sede
        dispatch(setSede(sedeSeleccionada));
        localStorage.setItem(
          'sedeSeleccionada',
          JSON.stringify(sedeSeleccionada)
        );
      }
      navigate('/', { replace: true });
    } catch (error) {
      CustomToast({
        title: 'Error',
        message: error?.message || 'Credenciales incorrectas',
        type: 'error',
        duration: 2500,
        position: 'bottom'
      });
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex
            align="center"
            justify="center"
            minH="100vh"
            bgImage={bgGradient}
            bgSize="cover"
            bgPosition="center"
          >
            <Box
              bg="white"
              px={6}
              py={14}
              rounded="xl"
              shadow="lg"
              maxW="xl"
              w="full"
              mx={4}
              borderWidth={1}
              borderColor="primary.100"
              _dark={{
                borderColor: 'primary.800',
                bg: 'gray.800',
              }}
            >
              <Stack spacing={6}>
                <Header configuracion={configuracion} />
                <LoginForm isLoading={isSubmitting || isLoading} />
              </Stack>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

// 🔹 Componente de encabezado
const Header = ({ configuracion }) => (
  <Box textAlign="center">
    <Image
      src={logo2}
      alt="Logo del colegio"
      width={100}
      height={100}
      margin="0 auto"
    />
    <Heading fontSize="2xl" mt={4} fontWeight="black">
      SISTEMA DE GESTIÓN ADMINISTRATIVA
    </Heading>
    <Text fontSize="md" color="gray.600" mt={2}>
      {configuracion?.nombreColegio || 'Nombre del colegio'}
    </Text>
  </Box>
);

export default Login;
