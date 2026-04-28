import { useNavigate } from 'react-router-dom';
import { getUsername, logout } from '../utils/auth';
import './WelcomePage.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const username = getUsername();

  const handleStart = () => {
    navigate('/tasks');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Bienvenue{username ? `, ${username}` : ''} !</h1>
        <p>Votre espace To-Do est prêt. Ajoutez des tâches, suivez les échéances et soyez alerté(e) lorsque l’heure approche.</p>

        <div className="welcome-actions">
          <button className="btn-primary" onClick={handleStart}>
            Accéder à mes tâches
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
