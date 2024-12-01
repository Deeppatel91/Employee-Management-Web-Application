import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';

const EmployeeSearch = () => {
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission
        setLoading(true);
        setError('');
        setEmployees([]);

        try {
            const response = await axios.get('http://localhost:3001/api/v1/emp/employees/search', {
                params: {
                    department: searchParams.department,
                    position: searchParams.position
                }
            });
            setEmployees(response.data);
            if (response.data.length === 0) {
                setError('No employees found matching the criteria.');
            }
        } catch (err) {
            setError('Failed to fetch employees. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Search for Employees
            </Typography>
            <Box component="form" onSubmit={handleSearch} noValidate autoComplete="off" sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={searchParams.department}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="Position"
                            name="position"
                            value={searchParams.position}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            disabled={loading}
                            sx={{ height: '100%' }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Search'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            {employees.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="employee search results">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Position</strong></TableCell>
                                <TableCell><strong>Department</strong></TableCell>
                                <TableCell><strong>Date of Joining</strong></TableCell>
                                <TableCell><strong>Salary</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map(emp => (
                                <TableRow key={emp._id} hover>
                                    <TableCell>{`${emp.first_name} ${emp.last_name}`}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.position}</TableCell>
                                    <TableCell>{emp.department}</TableCell>
                                    <TableCell>{new Date(emp.date_of_joining).toLocaleDateString()}</TableCell>
                                    <TableCell>${emp.salary.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default EmployeeSearch;