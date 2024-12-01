import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Grid, 
    Box, 
    Alert, 
    Snackbar 
} from '@mui/material';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:3001/api/v1/emp/employees', formData);
            setSuccess(true);
            setTimeout(() => navigate('/employees'), 2000);
        } catch (error) {
            console.error('Error adding employee:', error);
            setError(error.response?.data?.message || 'An error occurred while adding the employee.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Add New Employee
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date of Joining"
                                name="date_of_joining"
                                InputLabelProps={{ shrink: true }}
                                value={formData.date_of_joining}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                size="large"
                            >
                                Add Employee
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                message="Employee added successfully!"
            />
        </Container>
    );
};

export default AddEmployee;