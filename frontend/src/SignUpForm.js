// SignUpForm.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost/GITwamp/financeflow/backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login({ email });
        alert('Inscription réussie!');
        setIsSignUpSuccessful(true);
      } else {
        alert('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  // Rediriger vers la page de connexion uniquement si l'inscription a réussi
  if (isSignUpSuccessful) {
    navigate('/login');
    // Vous pouvez également renvoyer null ou un composant indiquant que la redirection est en cours.
    return null;
  }

  return (
    <div>
      <h1>Inscription</h1>
      <form>
        <label>Email:</label>
        <input type="text" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Mot de passe:</label>
        <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleSignUp}>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
