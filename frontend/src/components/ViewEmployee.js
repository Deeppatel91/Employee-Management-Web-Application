import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
                setError('Error fetching employee details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const EmployeeDetail = ({ label, value }) => (
        <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" component="span" fontWeight="bold">
                {label}:
            </Typography>{' '}
            <Typography variant="body1" component="span">
                {value}
            </Typography>
        </Grid>
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : employee ? (
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        Employee Details
                    </Typography>
                    <Grid container spacing={2}>
                        <EmployeeDetail label="First Name" value={employee.first_name} />
                        <EmployeeDetail label="Last Name" value={employee.last_name} />
                        <EmployeeDetail label="Email" value={employee.email} />
                        <EmployeeDetail label="Position" value={employee.position} />
                        <EmployeeDetail label="Salary" value={`$${employee.salary.toLocaleString()}`} />
                        <EmployeeDetail 
                            label="Date of Joining" 
                            value={new Date(employee.date_of_joining).toLocaleDateString()} 
                        />
                        <EmployeeDetail label="Department" value={employee.department} />
                    </Grid>
                </Paper>
            ) : (
                <Alert severity="info">No employee details found.</Alert>
            )}
        </Container>
    );
};

export default ViewEmployee;