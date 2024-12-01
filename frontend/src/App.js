import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';
import EmployeeSearch from './components/EmployeeSearch';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/update-employee/:id" element={<UpdateEmployee />} />
                <Route path="/view-employee/:id" element={<ViewEmployee />} />
                <Route path="/search-employees" element={<EmployeeSearch />} />
            </Routes>
        </Router>
    );
}

export default App;
