// LoginForm.jsx (Componente reutilizable)
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, Input, InputGroup, InputRightElement, IconButton, Text, Link, Stack } from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LoginForm = ({ isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Stack spacing={4}>
      <Field name="correo">
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.correo && form.touched.correo}>
            <Input
              {...field}
              type="email"
              variant='filled'
              placeholder="Ingrese su correo"
              size="lg"
              focusBorderColor="primary.100"
            />
            <ErrorMessage name="correo" component={Text} color="red.500" fontSize="sm" mt={1} />
          </FormControl>
        )}
      </Field>

      <Field name="password">
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.password && form.touched.password}>
            <InputGroup>
              <Input
                {...field}
                variant='filled'
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                size="lg"
                focusBorderColor="primary.100"
              />
              <InputRightElement h="full">
                <IconButton
                  aria-label="Mostrar contraseña"
                  variant="solid"
                  colorScheme="primary"
                  mr={2} 
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleShowClick}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage name="password" component={Text} color="red.500" fontSize="sm" mt={1}/>
          </FormControl>
        )}
      </Field>

      <Button
        bg="primary.100"
        color="white"
        _hover={{ bg: 'primary.300' }}
        size="lg"
        fontSize="md"
        fontWeight="bold"
        type="submit"
        isLoading={isLoading}
        loadingText="Validando credenciales..."
        borderRadius={'xl'}
      >
        INGRESAR AL SISTEMA
      </Button>

      <Text textAlign="center" mt={4}>
        <Link as={NavLink} to="/forgot-password" color="primary.200" fontWeight="semibold">
          ¿Olvidaste tu contraseña?
        </Link>
      </Text>
    </Stack>
  );
};