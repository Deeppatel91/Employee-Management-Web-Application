const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Get All Employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Search Employees by Department or Position
router.get('/employees/search', async (req, res) => {
    const { department, position } = req.query;

    try {
        const query = {};
        if (department) query.department = new RegExp(department, 'i'); // Case-insensitive search
        if (position) query.position = new RegExp(position, 'i'); // Case-insensitive search

        const employees = await Employee.find(query)
            .select('first_name last_name email position department date_of_joining salary') // Select only needed fields
            .limit(100); 

        res.status(200).json(employees);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching employees', error: error.message });
    }
});

// Get Employee by ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
});

// Add New Employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully!', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error });
    }
});

// Update Employee
router.put('/employees/:id', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
            first_name, last_name, email, position, salary, date_of_joining, department
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully!', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});

// Delete Employee
router.delete('/employees/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

module.exports = router;
