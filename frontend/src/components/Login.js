import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please provide both email and password');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
            localStorage.setItem('token', response.data.token); // Save token if using JWT authentication
            alert('Login successful!');
            navigate('/employees');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
