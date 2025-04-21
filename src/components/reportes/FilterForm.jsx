// Archivo: components/FilterForm.jsx
import React from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
import { SearchIcon, RepeatIcon } from '@chakra-ui/icons';

const FilterForm = ({ 
  filtros, 
  handleChange, 
  handleBuscar, 
  handleLimpiar, 
  isLoading,
  academicYears 
}) => {
  return (
    <Stack
      spacing={4}
      direction={'column'}
      mb={4}
      boxShadow={'base'}
      p={4}
      rounded="lg"
      bg="white"
      _dark={{ bg: 'primary.900' }}
    >
      <Stack spacing={4} p={2} direction="column" rounded="lg">
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
          <FormControl>
            <FormLabel>Año Académico</FormLabel>
            <Select
              placeholder="Seleccione un año académico"
              name="anioAcademico"
              value={filtros.anioAcademico}
              onChange={handleChange}
            >
              {academicYears.map((year, index) => (
                <option key={index} value={year._id}>
                  {year.year}
                </option>
              ))}
              <option value="general">General</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Buscar Por</FormLabel>
            <Select
              placeholder="Seleccione tipo de búsqueda"
              name="tipo"
              value={filtros.tipo}
              onChange={handleChange}
            >
              <option value="documento_identidad">
                Documento de Identidad
              </option>
              <option value="nombres_apellidos">Nombres</option>
              <option value="apellidos">Apellidos</option>
              <option value="codigo_matricula">Código de matrícula</option>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={4} direction={'column'}>
          <FormControl>
            <FormLabel>Término de búsqueda</FormLabel>
            <Input
              placeholder="Escriba el término"
              name="termino"
              value={filtros.termino}
              onChange={handleChange}
              onKeyPress={e => {
                if (e.key === 'Enter') handleBuscar();
              }}
            />
          </FormControl>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button
              colorScheme="primary"
              _dark={{ bg: 'primary.400' }}
              color="white"
              onClick={handleBuscar}
              leftIcon={<SearchIcon />}
              isLoading={isLoading}
              loadingText="Buscando"
            >
              Buscar
            </Button>
            <Button
              variant="outline"
              onClick={handleLimpiar}
              leftIcon={<RepeatIcon />}
              isDisabled={isLoading}
            >
              Limpiar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FilterForm;