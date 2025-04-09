import { extendTheme } from '@chakra-ui/react';
import '@fontsource/public-sans';
import '@fontsource/rubik';

const theme = extendTheme({
  fonts: {
    heading: `"Public Sans", sans-serif`,
    body: `"Rubik", sans-serif`,
  },
  colors: {
    primary: {
      50: '#e0e7ff',    // tono más claro, ideal para fondos o elementos secundarios
      100: '#4f5d94',   // tono principal, elegante y sofisticado
      200: '#4a5586',   // tono similar, pero un poco más oscuro
      300: '#434f7f',   // similar pero más oscuro
      400: '#3e4a79',   // más oscuro, manteniendo la armonía
      500: '#4f5d94',   // igual que primary.100 para consistencia
      600: '#384471',   // más oscuro, elegante
      700: '#ffffff33',   // más profundo, serio
      800: '#ffffff33',
      900: '#242424',
      1000: '#151822',
      1100: '#0b0f19',
    },
  },
});

export default theme;
