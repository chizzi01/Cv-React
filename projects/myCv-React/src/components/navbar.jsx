import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ControlledSwitches } from './Switch'
import { Link } from '@mui/material';

const drawerWidth = 240;
// const navItems = ['<Experiencia />', '<DevTools />', '<Portfolio />', '<Contacto />', <ControlledSwitches />];


export function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ACM
      </Typography>
      <Divider />
      <List>
        <a href="#experiencia-section">Experiencia</a>
        <a href="#devtools-section">DevTools</a>
        <a href="#portfolio-section">Portfolio</a>
        <a href="#contacto-section">Contacto</a>



      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const IniText = '<Inicio />'
  const ExpText = '<Experiencia />'
  const DevText = '<DevTools />'
  const PortText = '<Portfolio />'
  const ContText = '<Contacto />'



  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav"
        sx={{
          background: 'linear-gradient(90deg, #0F0F0F 0.02%, rgba(0, 71, 255, 0.51) 99.99%)'
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ACM
          </Typography>
          <Box className="navTexts" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button><a href="#avatar-section" >{IniText}</a></Button>
          <Button><a href="#experiencia-section" >{ExpText}</a></Button>
          <Button><a href="#devtools-section" >{DevText}</a></Button>
          <Button><a href="#proyectos-section" >{PortText}</a></Button>
          <Button><a href="#contacto-section" >{ContText}</a></Button>
          <Button><ControlledSwitches /></Button>

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
