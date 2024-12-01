const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const app = express();
const cors = require('cors');
app.use(cors());


// Middleware
app.use(express.json());

// MongoDB URI
const MONGODB_URI = 'mongodb+srv://Deep:Deep9195@cluster0.ztcjj.mongodb.net/employee_management?retryWrites=true&w=majority';
const PORT = 3001;

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Employee Management Backend</h1>');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
