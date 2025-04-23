import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Spacer,
  Badge,
  Tooltip,
  Icon,
  FormHelperText,
  Text,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  SettingsIcon,
  RepeatIcon,
  LockIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import {
  getAllConfiguraciones,
  createOrUpdateConfiguracion,
} from '../../features/configuracionSlice';
import { CustomToast } from '../../helpers/toast';
import { FaEdit } from 'react-icons/fa';

const ConfigSection = ({ title, icon, children }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card
      borderWidth="1px"
      borderColor={borderColor}
      _dark={{ bg: 'primary.1000' }}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ boxShadow: 'md' }}
    >
      <CardHeader py={3} _dark={{ bg: 'primary.900' }}>
        <Flex align="center">
          <Icon as={icon} mr={2} />
          <Heading size="md">{title}</Heading>
        </Flex>
      </CardHeader>
      <CardBody pt={5} pb={6} _dark={{ bg: 'primary.1000' }}>
        {children}
      </CardBody>
    </Card>
  );
};

const Configuracion = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalConfig, setOriginalConfig] = useState(null);

  // Estado actualizado para coincidir con el modelo Mongoose modificado
  const [config, setConfig] = useState({
    nombreColegio: '',
    permitirRegistrarNotas: false,
    permitirModificarNotas: false,
    permitirRegistrarMatriculas: false,
    permitirModificarMatriculas: false,
    permitirDescargarFichaMatricula: false,
    permitirDescargarMatriculas: false,
    permitirEliminarMatriculas: false,
    permitirRegistrarObservadores: false,
    permitirDescargarObservadores: false,
    permitirDescargarBoletin: false,
  });

  const mutedText = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await dispatch(getAllConfiguraciones()).unwrap();
      if (response) {
        const formattedData = { ...response };
        setConfig(formattedData);
        setOriginalConfig(JSON.stringify(formattedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if there are changes compared to original config
    if (originalConfig) {
      setHasChanges(JSON.stringify(config) !== originalConfig);
    }
  }, [config, originalConfig]);

  const handleChange = e => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitch = e => {
    const { name, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(createOrUpdateConfiguracion(config)).unwrap();
      setOriginalConfig(JSON.stringify(config));
      setHasChanges(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (originalConfig) {
      setConfig(JSON.parse(originalConfig));
      CustomToast({
        title: 'Cambios descartados',
        message: 'Se ha restaurado la configuración original',
        type: 'info',
        duration: 3000,
        position: 'bottom',
      });
      setHasChanges(false);
    }
  };

  return (
    <Box>
      <Card
        mb={6}
        borderRadius="lg"
        overflow="hidden"
        _dark={{ bg: 'primary.1000' }}
      >
        <CardBody py={4}>
          <Flex align="center" justify="space-between">
            <HStack>
              <SettingsIcon boxSize={4} />
              <Heading size="md">CONFIGURACION DEL SISTEMA</Heading>
            </HStack>

            <HStack spacing={4}>
              {hasChanges && (
                <Badge
                  colorScheme="orange"
                  variant="solid"
                  fontSize="sm"
                  py={1}
                  px={3}
                  borderRadius="full"
                >
                  Cambios sin guardar
                </Badge>
              )}
              <Badge
                colorScheme="primary"
                color={'white'}
                variant="subtle"
                fontSize="sm"
                py={1}
                px={3}
                borderRadius="full"
              >
                Última actualización: {new Date().toLocaleDateString()}
              </Badge>
            </HStack>
          </Flex>
        </CardBody>
      </Card>
      <Stack spacing={4} direction={'column'}>
        <ConfigSection title="Información General" icon={FaEdit}>
          <FormControl>
            <FormLabel fontWeight="medium">Nombre del colegio</FormLabel>
            <InputGroup>
              <Input
                name="nombreColegio"
                variant="filled"
                value={config.nombreColegio || ''}
                onChange={handleChange}
                placeholder="Ingrese el nombre oficial del colegio"
                borderRadius="md"
                boxShadow="sm"
              />
            </InputGroup>
            <FormHelperText>
              Este nombre aparecerá en todos los documentos oficiales
            </FormHelperText>
          </FormControl>
        </ConfigSection>

        <ConfigSection title="Permisos del Sistema" icon={LockIcon}>
          <Stack spacing={4}>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirRegistrarMatriculas"
                name="permitirRegistrarMatriculas"
                isChecked={config.permitirRegistrarMatriculas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirRegistrarMatriculas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Registrar matrículas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Habilita el registro de nuevas matrículas en el sistema
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirRegistrarMatriculas ? UnlockIcon : LockIcon}
                color={
                  config.permitirRegistrarMatriculas ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>

            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirDescargarFichaMatricula"
                name="permitirDescargarFichaMatricula"
                isChecked={config.permitirDescargarFichaMatricula}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirDescargarFichaMatricula"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Descargar Ficha Matrículas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Habilita el permiso de descargar ficha de matrículas en el sistema
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirDescargarFichaMatricula ? UnlockIcon : LockIcon}
                color={
                  config.permitirDescargarFichaMatricula ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirDescargarMatriculas"
                name="permitirDescargarMatriculas"
                isChecked={config.permitirDescargarMatriculas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirDescargarMatriculas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir descarga de boletines de matriculas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los docentes descargar documentos como boletines y
                  certificados
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirDescargarMatriculas ? UnlockIcon : LockIcon}
                color={
                  config.permitirDescargarMatriculas ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirModificarMatriculas"
                name="permitirModificarMatriculas"
                isChecked={config.permitirModificarMatriculas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirModificarMatriculas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Modificar registro de matriculas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los docentes modificar registro de matriculas
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirModificarMatriculas ? UnlockIcon : LockIcon}
                color={
                  config.permitirModificarMatriculas ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirEliminarMatriculas"
                name="permitirEliminarMatriculas"
                isChecked={config.permitirEliminarMatriculas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirEliminarMatriculas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir eliminar registro de matriculas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los docentes eliminar registro de matriculas
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirEliminarMatriculas ? UnlockIcon : LockIcon}
                color={
                  config.permitirEliminarMatriculas ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirRegistrarNotas"
                name="permitirRegistrarNotas"
                isChecked={config.permitirRegistrarNotas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirRegistrarNotas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Registrar notas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los profesores Registrar notas
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirRegistrarNotas ? UnlockIcon : LockIcon}
                color={config.permitirRegistrarNotas ? 'green.500' : 'red.500'}
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirModificarNotas"
                name="permitirModificarNotas"
                isChecked={config.permitirModificarNotas}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirModificarNotas"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Modificar notas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los profesores Modificar notas
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={config.permitirModificarNotas ? UnlockIcon : LockIcon}
                color={config.permitirModificarNotas ? 'green.500' : 'red.500'}
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirRegistrarObservadores"
                name="permitirRegistrarObservadores"
                isChecked={config.permitirRegistrarObservadores}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirRegistrarObservadores"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Registrar observadores
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los profesores Registrar observadores
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={
                  config.permitirRegistrarObservadores ? UnlockIcon : LockIcon
                }
                color={
                  config.permitirRegistrarObservadores ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirDescargarObservadores"
                name="permitirDescargarObservadores"
                isChecked={config.permitirDescargarObservadores}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirDescargarObservadores"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Descargar observadores
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los docentes Descargar observadores
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={
                  config.permitirDescargarObservadores ? UnlockIcon : LockIcon
                }
                color={
                  config.permitirDescargarObservadores ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={'gray.100'}
              _dark={{ bg: 'primary.800' }}
            >
              <Switch
                id="permitirDescargarBoletin"
                name="permitirDescargarBoletin"
                isChecked={config.permitirDescargarBoletin}
                onChange={handleSwitch}
                colorScheme="primary"
                size="lg"
              />
              <Box ml={3}>
                <FormLabel
                  htmlFor="permitirDescargarBoletin"
                  mb="0"
                  cursor="pointer"
                  fontWeight="medium"
                >
                  Permitir Descargar Boletin de Notas
                </FormLabel>
                <Text fontSize="sm" color={mutedText}>
                  Permite a los docentes descargar boletin de notas
                </Text>
              </Box>
              <Spacer />
              <Icon
                as={
                  config.permitirDescargarBoletin ? UnlockIcon : LockIcon
                }
                color={
                  config.permitirDescargarBoletin ? 'green.500' : 'red.500'
                }
                fontSize={'25px'}
              />
            </FormControl>
          </Stack>
        </ConfigSection>
      </Stack>

      <Flex justify="flex-end" mt={8} p={4} borderRadius="lg" boxShadow="sm">
        {hasChanges && (
          <Tooltip label="Descartar todos los cambios">
            <Button
              leftIcon={<RepeatIcon />}
              onClick={handleReset}
              size="lg"
              variant="outline"
              mr={3}
              colorScheme="gray"
            >
              Cancelar cambios
            </Button>
          </Tooltip>
        )}
        <Tooltip label="Guardar configuración en el sistema">
          <Button
            onClick={handleSubmit}
            colorScheme="primary"
            color={'white'}
            size="lg"
            isLoading={isSubmitting}
            loadingText="Guardando..."
            leftIcon={<CheckCircleIcon />}
            isDisabled={config ? false : true || !hasChanges}
          >
            Guardar configuración
          </Button>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Configuracion;
