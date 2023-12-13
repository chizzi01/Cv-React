import * as React from 'react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export function ControlledSwitches() {
    const [checked, setChecked] = React.useState(false);
    const [language, setLanguage] = React.useState('ESP');
    const [language2, setLanguage2] = React.useState('ENG');

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked === false) {
            setLanguage('ENG');
            setLanguage2('ESP');
        } else {
            setLanguage('ESP');
            setLanguage2('ENG');
        }
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

                                    backgroundColor: '#3253FF', // Cambia el color aquí
                                    borderColor: '#3253FF', // Cambia el color aquí
                                },
                            },
                        },
                        '& .MuiSwitch-thumb': {
                        },
                        '& .MuiSwitch-track': {
                            backgroundColor: '#d9d9d9',
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className='switch'>
            <p style={{ textShadow: checked ? 'none' : '0 0 5px #FFF' }}>ESP</p>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p style={{ textShadow: checked ? '0 0 5px #FFF' : 'none' }}>ENG</p>
            </div>
        </ThemeProvider>
    );
}