import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Dummy authentication status, replace with your auth logic
    const isAuthenticated = localStorage.getItem('token'); // Example based on token

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token or session
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Employee Management
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {isAuthenticated && (
                            <>
                                <Button
                                    color="inherit"
                                    startIcon={<HomeIcon />}
                                    onClick={() => navigate('/employees')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Home
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<SearchIcon />}
                                    onClick={() => navigate('/search-employees')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Search
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {location.pathname === '/' && !isAuthenticated && (
                            <Button 
                                color="inherit" 
                                startIcon={<PersonAddIcon />}
                                onClick={() => navigate('/signup')}
                            >
                                Signup
                            </Button>
                        )}
                        {location.pathname === '/signup' && !isAuthenticated && (
                            <Button 
                                color="inherit" 
                                startIcon={<LoginIcon />}
                                onClick={() => navigate('/')}
                            >
                                Login
                            </Button>
                        )}
                        {isAuthenticated && (
                            <Button 
                                color="inherit" 
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;