import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/api/v1/emp/employees');
            setEmployees(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Error fetching employees. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`/api/v1/emp/employees/${id}`);
                fetchEmployees(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting employee:', error);
                setError('Error deleting employee. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Employee List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/add-employee')}
                    sx={{ fontSize: '1.2rem' }}
                >
                    Add Employee
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer component={Paper} sx={{ border: '1px solid #ccc' }}>
                <Table sx={{ minWidth: 650 }} aria-label="employee table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid #ccc' }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid #ccc' }}>
                                Department
                            </TableCell>
                            <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid #ccc' }}>
                                Position
                            </TableCell>
                            <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid #ccc' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id} hover>
                                <TableCell sx={{ border: '1px solid #ccc', fontSize: '1rem' }}>
                                    {`${employee.first_name} ${employee.last_name}`}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ccc', fontSize: '1rem' }}>
                                    {employee.department}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ccc', fontSize: '1rem' }}>
                                    {employee.position}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                    <Button 
                                        variant="outlined" 
                                        color="info" 
                                        onClick={() => navigate(`/view-employee/${employee._id}`)}
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="warning" 
                                        onClick={() => navigate(`/update-employee/${employee._id}`)}
                                        sx={{ mr: 1 }}
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        onClick={() => deleteEmployee(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EmployeeList;