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
      50: '#f8f9fa',    // muy claro, ideal para fondos suaves
      100: '#2fa33a',   // tono base (verde tipo logo)
      200: '#299533',
      300: '#24852e',
      400: '#1f7528',
      500: '#2fa33a',   // igual que 100
      600: '#1a5d20',   // más oscuro, con carácter
      700: '#ffffff33', // transparente/blanco suave
      800: '#ffffff33',   // para bg modo oscuro
      900: '#121512',   // más profundo, tipo overlay
      1000: '#0a0d0a',  // casi negro
      1100: '#060806',  // muy profundo, para alto contraste
    },
  },
});

export default theme;
