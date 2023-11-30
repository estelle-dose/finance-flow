// Dashboard.js
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import BudgetForm from './BudgetForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div>
      {user && (
        <>
          <h1>Tableau de bord</h1>
          <p>Bienvenue, {user.email}!</p>
          <button onClick={handleLogout}>Déconnexion</button>

          {/* Ajoutez le formulaire de gestion du budget ici */}
          <BudgetForm />
        </>
      )}
    </div>
  );
};

export default Dashboard;







