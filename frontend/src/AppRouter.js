// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from './AuthContext';
import PrivateRoute from './PrivateRoute';  // Assurez-vous d'importer PrivateRoute

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<App />} />
          {user ? (
            <PrivateRoute path="/dashboard" element={<Dashboard />} />
          ) : (
            <Navigate to="/" />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
