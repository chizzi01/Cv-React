import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const lang = localStorage.getItem('language');

const navItems = [
  { label: lang === 'es' ? '<Inicio />'      : '<Home />',       href: '#avatar-section',      id: 'avatar-section'      },
  { label: lang === 'es' ? '<Experiencia />' : '<Experience />', href: '#experiencia-section', id: 'experiencia-section' },
  { label: '<Stack />',                                           href: '#devtools-section',    id: 'devtools-section'    },
  { label: '<Portfolio />',                                       href: '#proyectos-section',   id: 'proyectos-section'   },
];

const ctaItem = {
  label: lang === 'es' ? '<Hablemos />' : '<Contact />',
  href: '#contacto-section',
  id: 'contacto-section',
};

export function DrawerAppBar({ window, currentSection }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);
  const handleClose = () => setMobileOpen(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box className="mobile-drawer">
      {/* Header */}
      <div className="drawer-header">
        <span className="drawer-logo">ACM</span>
        <IconButton onClick={handleClose} className="drawer-close" aria-label="close menu">
          <CloseIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.4rem' }} />
        </IconButton>
      </div>

      {/* Nav links */}
      <nav className="drawer-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={handleClose}
            className={`drawer-link${currentSection === item.id ? ' drawer-link--active' : ''}`}
          >
            <span className="drawer-link-dot" />
            {item.label}
          </a>
        ))}

        {/* CTA */}
        <a
          href={ctaItem.href}
          onClick={handleClose}
          className={`drawer-link drawer-link--cta${currentSection === ctaItem.id ? ' drawer-link--active' : ''}`}
        >
          {ctaItem.label}
        </a>
      </nav>

      {/* Footer info */}
      <div className="drawer-footer">
        <span>Agustin C. M.</span>
        <span>Full Stack Developer</span>
      </div>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="navbar-appbar"
        sx={{
          background: 'rgba(8, 12, 28, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(108, 141, 255, 0.12)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' }, px: { xs: 2, sm: 3 } }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            className="navbar-logo"
            sx={{ flexGrow: 1 }}
          >
            ACM
          </Typography>

          {/* Desktop nav */}
          <Box className="navTexts" sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '0.25rem' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link${currentSection === item.id ? ' active' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaItem.href}
              className={`nav-link nav-link--cta${currentSection === ctaItem.id ? ' active' : ''}`}
            >
              {ctaItem.label}
            </a>
          </Box>

          {/* Hamburger (mobile) */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, ml: 'auto' }}
          >
            <MenuIcon sx={{ fontSize: '1.6rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: '82vw',
              maxWidth: '340px',
              background: 'rgba(8, 12, 28, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(108, 141, 255, 0.15)',
              boxSizing: 'border-box',
            },
            '& .MuiBackdrop-root': {
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  currentSection: PropTypes.string,
};
