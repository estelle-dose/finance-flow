// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...props }) => {
  const { user } = useAuth();

  return user ? (
    // Si l'utilisateur est connecté, affichez le composant
    <Route {...props} element={element} />
  ) : (
    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

