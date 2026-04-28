import * as React from 'react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export function ControlledSwitches() {
    const [checked, setChecked] = React.useState(localStorage.getItem('language') === 'en');

    const handleChange = (event) => {
        setChecked(event.target.checked);
        localStorage.setItem('language', event.target.checked ? 'en' : 'es');
        window.location.reload();
    };

    const theme = createTheme({
        components: {
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                color: '#fff',
                                '& + .MuiSwitch-track': {
                                    backgroundColor: '#FFF', // Cambia el color aquí
                                    color: '#FFF', // Cambia el color aquí
                                    borderColor: '#FFF', // Cambia el color aquí
                                },
                            },
                        },
                        '& .MuiSwitch-thumb': {
                        },
                        '& .MuiSwitch-track': {
                            backgroundColor: '#d9d9d9',
                            color: '#FFF',
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className='switch'>
            <p style={{ textShadow: checked ? 'none' : '0 0 5px #FFF' , color:'#FFF'}}>ESP</p>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p style={{ textShadow: checked ? '0 0 5px #FFF' : 'none' , color:'#FFF'}}>ENG</p>
            </div>
        </ThemeProvider>
    );
}