
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { authenticateUser } from '../services/data';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = authenticateUser(username, password);
    
    if (credentials) {
      login({
        id: credentials.trainerId || username,
        name: username,
        role: credentials.role
      });
      
      if (credentials.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/trainer');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Trainer Management System</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-primary login-btn">
            Login
          </button>
        </form>
        
        <div className="login-info">
          <p><strong>For Admin:</strong> Username: Salman, Password: Salman123</p>
          <p><strong>For Trainers:</strong> Username: Neo1 to Neo50, Password: Same as username</p>
        </div>
      </div>
      
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--gray-light);
        }
        
        .login-card {
          background: white;
          padding: var(--spacing-lg);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-md);
          width: 400px;
          max-width: 90%;
        }
        
        .login-card h2 {
          text-align: center;
          margin-bottom: var(--spacing-lg);
          color: var(--primary);
        }
        
        .login-btn {
          width: 100%;
          margin-top: var(--spacing-md);
          padding: var(--spacing-md);
        }
        
        .error-message {
          color: var(--danger);
          margin-bottom: var(--spacing-md);
          font-size: 0.9rem;
        }
        
        .login-info {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--gray-medium);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
