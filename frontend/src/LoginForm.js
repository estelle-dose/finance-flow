// LoginForm.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';  // Assurez-vous que le chemin est correct ici
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/GITwamp/financeflow/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login({ email });
        alert('Connexion réussie!');
        history('/dashboard'); // Utilisez history directement
      } else {
        alert('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}> {/* Utilisez onSubmit au lieu de onClick */}
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Se connecter</button> {/* Utilisez type="submit" ici */}
      </form>
    </div>
  );
};

export default LoginForm;
