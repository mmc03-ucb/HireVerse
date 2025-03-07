import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';

import LandingPage from './components/LandingPage';
import DynamicLeetCodeList from './components/DynamicLeetCodeList';
import CompanyOverviews from './components/CompanyOverviews';
import CompanyDetails from './components/CompanyDetails';
import GeneralResources from './components/GeneralResources';
import AlumniConnect from './components/AlumniConnect';
import JobBoard from './components/JobBoard';

const createAppTheme = (darkMode) => 
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
    },
  });

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dynamic Leetcode', path: '/dynamic-leetcode-list' },
  { name: 'Alumni', path: '/alumni-connect' },
  { name: 'Companies', path: '/company-overviews' },
  { name: 'Resources', path: '/general-resources' },
  { name: 'Jobs', path: '/job-board' },
];

function App() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = createAppTheme(darkMode);

  const handleThemeChange = () => setDarkMode((prev) => !prev);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {navLinks.map((link) => (
                  <Typography
                    key={link.name}
                    component={Link}
                    to={link.path}
                    sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                  >
                    {link.name}
                  </Typography>
                ))}
              </Box>

              <IconButton color="inherit" onClick={handleThemeChange}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <IconButton color="inherit" onClick={handleMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  {navLinks.map((link) => (
                    <MenuItem key={link.name} onClick={handleClose} component={Link} to={link.path}>
                      {link.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dynamic-leetcode-list" element={<DynamicLeetCodeList />} />
              <Route path="/company-overviews" element={<CompanyOverviews />} />
              <Route path="/company-details/:id" element={<CompanyDetails />} /> {/* Company Details Route */}
              <Route path="/general-resources" element={<GeneralResources />} />
              <Route path="/alumni-connect" element={<AlumniConnect />} />
              <Route path="/job-board" element={<JobBoard />} />
            </Routes>
          </Box>

          <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: theme.palette.background.paper }}>
            <Container maxWidth="lg">
              <Typography variant="body1" align="center">
                Created by Muqueet and Farhan
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
