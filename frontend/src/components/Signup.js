import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/v1/user/signup', { username, email, password });
            alert('Signup successful!');
            navigate('/'); // Navigate to login page after successful signup
        } catch (error) {
            alert('Error signing up');
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
                    Signup
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Box>
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
                        Signup
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;
