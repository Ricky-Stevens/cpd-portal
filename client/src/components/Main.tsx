// Main.tsx

// This module defines the main routing of the application. It uses the
// react-router-dom package to define routes for the application.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import the components for the different pages
import Homepage from './Homepage';
import Login from './Login';
import EditGoal from './EditGoal';
import AddGoal from './AddGoal';

/**
 * Main component is a functional component that defines the main routes of the
 * application. It checks if there's a valid token in the sessionStorage and
 * redirects to the login page if not.
 * @returns The Routes of the application wrapped in a BrowserRouter.
 */
const Main: React.FC = () => {
    // Retrieve the auth token from sessionStorage
    const token = sessionStorage.getItem('token');

    return (
        <Router>
            <Routes>
                {/* Home route */}
                <Route path="/" element={<Homepage />} />

                {/* Login route */}
                <Route path="/login" element={<Login />} />

                {/* Admin edit route */}
                <Route path="/admin/edit/:id" element={token ? <EditGoal /> : <Navigate to="/login" />} />

                {/* Admin add route */}
                <Route path="/admin/add" element={token ? <AddGoal /> : <Navigate to="/login" />} />

                {/* Fallback route */}
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default Main;
