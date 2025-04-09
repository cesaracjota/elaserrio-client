import { FormControl, FormLabel, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select'; // Asegúrate de importar correctamente

const EditMultipleSelectComponent = ({ name, data, dataEdit, handleSelect, Component }) => {
    
  return (
    <FormControl isRequired position="relative">
      <FormLabel fontWeight="semibold">{name}</FormLabel>
      <Box position="relative">
        <Select
          placeholder="Seleccione las opciones"
          onChange={handleSelect}
          options={data?.map(value => ({
            value: value?._id,
            label: value.name || value.nombre,
          }))}
          defaultValue={dataEdit?.map(value => ({
            value: value?._id,
            label: value.name || value.nombre,
          }))}
          isSearchable
          colorScheme="primary"
          className="chakra-react-select"
          classNamePrefix="chakra-react-select"
          variant="filled"
          isMulti
          chakraStyles={{
            control: (provided, state) => ({
              ...provided,
              borderRadius: 'md',
              boxShadow: 'md',
              _focus: {
                borderColor: 'primary.100',
                boxShadow: 'md',
              },
            }),
            menu: (provided, state) => ({
              ...provided,
              borderRadius: 'md',
              boxShadow: 'md',
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: 'primary.100',
            }),
            multiValue: (provided, state) => ({
              ...provided,
              backgroundColor: 'primary.100',
              color: 'white',
            }),
            placeholder: (provided, state) => ({
              ...provided,
              color: 'primary.100',
            }),
            indicatorSeparator: (provided, state) => ({
              ...provided,
              backgroundColor: 'primary.100',
              color: 'white',
            }),
            // dropdownIndicator view false
            dropdownIndicator: (provided, state) => ({
              ...provided,
              display: 'none',
            }),
          }}
        />
        {Component && (
          <Box
            position="absolute"
            top="0"
            right="0"
            borderRadius="md"
            boxShadow="md"
          >
            <Component />
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default EditMultipleSelectComponent;
