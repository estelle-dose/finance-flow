// BudgetForm.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BudgetForm = () => {
  const { user } = useAuth();
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    // Chargez le budget de l'utilisateur depuis votre API
    // Assurez-vous d'avoir une route API pour récupérer le budget par utilisateur
    const fetchBudget = async () => {
      try {
        const response = await fetch(`http://localhost/GITwamp/financeflow/backend/getBudget.php?userId=${user.id}`);
        const data = await response.json();
        if (data.success) {
          setBudget(data.budget);
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
      }
    };

    fetchBudget();
  }, [user.id]);

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyez le nouveau budget à votre API pour mise à jour
    // Assurez-vous d'avoir une route API pour mettre à jour le budget par utilisateur
    try {
      const response = await fetch('http://localhost/GITwamp/financeflow/backend/updateBudget.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, budget }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Budget mis à jour avec succès!');
      } else {
        alert('Erreur lors de la mise à jour du budget');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <div>
      <h2>Gestion du budget</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="budget">Budget mensuel :</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={budget}
          onChange={handleBudgetChange}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default BudgetForm;
