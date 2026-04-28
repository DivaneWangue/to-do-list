import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn } from '../utils/auth';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/welcome', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!login(username, password)) {
      setError('Nom d’utilisateur et mot de passe requis pour accéder à l’application.');
      return;
    }

    navigate('/welcome', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Connexion</h1>
        <p>Identifiez-vous pour accéder à votre application To-Do.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Nom d’utilisateur</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre nom"
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
