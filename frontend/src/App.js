// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

const GuestRoute = ({ element }) => {
  const { user } = useAuth();

  return !user ? (
    element
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<GuestRoute element={<SignUpForm />} />} />
          <Route path="/login" element={<GuestRoute element={<LoginForm />} />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          {/* Add more routes as needed */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



