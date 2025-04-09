import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  VStack,
  HStack,
  Divider,
  useToast,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { createConfiguracion, getAllConfiguraciones } from "../../features/configuracionSlice";

const CampoConfiguracion = ({ tipo, campo, valor, onChange }) => {
  if (tipo === "boolean") {
    return (
      <FormControl display="flex" alignItems="center">
        <FormLabel fontWeight="medium" mb="0" flex="1">
          {campo}
        </FormLabel>
        <Switch isChecked={valor} onChange={(e) => onChange(e.target.checked)} />
      </FormControl>
    );
  }

  return (
    <FormControl>
      <FormLabel fontWeight="medium">{campo}</FormLabel>
      <Input value={valor} onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};

const Configuraciones = () => {
  const [configuraciones, setConfiguraciones] = useState([]);
  const [nuevaClave, setNuevaClave] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllConfiguraciones()).unwrap().then((data) => {
      setConfiguraciones(data);
    });
  }, [dispatch]);

  const handleGuardar = async (config) => {
    try {
      await dispatch(createConfiguracion(config)).unwrap();
      toast({
        title: "Configuración actualizada.",
        description: "Los cambios fueron guardados exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al guardar.",
        description: "No se pudieron guardar los cambios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAgregar = async () => {
    if (!nuevaClave.trim()) return;

    try {
      const nueva = {
        clave: nuevaClave.trim(),
        valor: {},
      };

      dispatch(createConfiguracion(nueva)).unwrap();
      setConfiguraciones((prev) => [...prev, nueva]);
      setNuevaClave("");

      toast({
        title: "Clave añadida.",
        description: `"${nuevaClave}" fue agregada correctamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al agregar:", error);
      toast({
        title: "Error al agregar.",
        description: "No se pudo crear la nueva configuración.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (clave, campo, valorCampo) => {
    setConfiguraciones((prev) =>
      prev.map((conf) =>
        conf.clave === clave
          ? {
              ...conf,
              valor: {
                ...conf.valor,
                [campo]: valorCampo,
              },
            }
          : conf
      )
    );
  };

  return (
    <Box maxW="5xl" mx="auto" p={6} bg="white" rounded="2xl" boxShadow="xl">
      <Heading size="lg" mb={6}>
        Gestión Dinámica de Configuraciones
      </Heading>

      {/* Crear nueva clave */}
      <HStack spacing={4} mb={8}>
        <Input
          placeholder="Nueva clave de configuración (ej. periodoNotas)"
          value={nuevaClave}
          onChange={(e) => setNuevaClave(e.target.value)}
        />
        <Button onClick={handleAgregar} leftIcon={<AddIcon />} colorScheme="blue">
          Agregar
        </Button>
      </HStack>

      <Divider mb={8} />

      <VStack spacing={6} align="stretch">
        {configuraciones.map((config) => (
          <Box
            key={config.clave}
            p={5}
            bg="gray.50"
            rounded="xl"
            boxShadow="base"
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="sm" color="gray.700">
                {config.clave}
              </Heading>
              {/* Botón de eliminar si deseas */}
              {/* <IconButton
                icon={<DeleteIcon />}
                size="sm"
                aria-label="Eliminar"
                variant="ghost"
                colorScheme="red"
              /> */}
            </Flex>

            <VStack spacing={4} align="stretch" mb={4}>
              {Object?.entries(config?.valor)?.map(([campo, valor]) => (
                <CampoConfiguracion
                  key={campo}
                  campo={campo}
                  valor={valor}
                  tipo={typeof valor === "boolean" ? "boolean" : "string"}
                  onChange={(nuevoValor) =>
                    handleInputChange(config.clave, campo, nuevoValor)
                  }
                />
              ))}
            </VStack>

            <Button
              size="sm"
              colorScheme="green"
              onClick={() => handleGuardar(config)}
              alignSelf="flex-end"
            >
              Guardar cambios
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Configuraciones;
