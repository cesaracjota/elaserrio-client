import { FormControl, FormLabel, Box } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import ModalAgregarConceptoPago from '../pagos/conceptos/ModalAgregarConceptoPago'; // Asegúrate de importar correctamente

const ConceptoPagoSelect = ({ conceptos, handleSelectConcepto }) => {
  return (
    <FormControl isRequired position="relative">
      <FormLabel fontWeight="semibold">CONCEPTO DE PAGO</FormLabel>
      <Box position="relative">
        <Select
          placeholder="Seleccione el concepto de pago"
          onChange={handleSelectConcepto}
          options={conceptos.map(concepto => ({
            value: concepto,
            label: concepto.nombre,
            precio: concepto.precio,
          }))}
          isSearchable
          colorScheme="orange"
          className="chakra-react-select"
          classNamePrefix="chakra-react-select"
          variant="filled"
          isMulti
          chakraStyles={
            {
                control: (provided, state) => ({              
                    ...provided,
                    borderRadius: "md",
                    boxShadow: "md",
                    _focus: {
                        borderColor: "primary.100",
                        boxShadow: "md",
                    },
                }),
                menu: (provided, state) => ({
                    ...provided,
                    borderRadius: "md",
                    boxShadow: "md",
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    color: "primary.100",
                }), 
                multiValue: (provided, state) => ({
                    ...provided,
                    backgroundColor: "primary.100",
                    color: "white",
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    color: "primary.100",
                }),
                indicatorSeparator: (provided, state) => ({
                    ...provided,
                    backgroundColor: "primary.100",
                    color: "white",
                }),
                // dropdownIndicator view false
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    display: "none",
                }),
            }
          }
        />
        <Box
          position="absolute"
          top="0"
          right="0"
          borderRadius="md"
          boxShadow="md"
        >
          <ModalAgregarConceptoPago />
        </Box>
      </Box>
    </FormControl>
  );
};

export default ConceptoPagoSelect;