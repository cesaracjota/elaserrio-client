// theme.js
import { createTheme } from 'react-data-table-component';

export const solarizedTheme = createTheme('solarized', {
    text: {
        primary: '#FFF',
        secondary: '#FFF',
        tertiary: '#FFF',
        error: '#FFF',
        warning: '#FFF',
    },
    background: {
        default: '#0a0d0a',
        hover: '#1a222f',
        active: '#0b0f19'
    },
    context: {
        background: '#0a0d0a',
        text: '#FFF',
    },
    divider: {
        default: '#FFF opacity 92%',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});
