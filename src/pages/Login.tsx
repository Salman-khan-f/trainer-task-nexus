
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const [role, setRole] = useState<'superadmin' | 'trainer'>('superadmin');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useUser();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'superadmin' ? '/admin' : '/trainer');
    }
  }, [user, navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in a real app, you'd call an API
    setTimeout(() => {
      login({
        id: role === 'superadmin' ? 'admin1' : 'T1',
        name: role === 'superadmin' ? 'Admin User' : 'Trainer 1',
        role: role,
      });
      
      navigate(role === 'superadmin' ? '/admin' : '/trainer');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Trainer Management</h1>
          <p>Login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Login As</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${role === 'superadmin' ? 'active' : ''}`}
                onClick={() => setRole('superadmin')}
              >
                Super Admin
              </button>
              <button
                type="button"
                className={`role-btn ${role === 'trainer' ? 'active' : ''}`}
                onClick={() => setRole('trainer')}
              >
                Trainer
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={role === 'superadmin' ? 'admin@example.com' : 'trainer1@example.com'}
              readOnly
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value="**********"
              readOnly
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>This is a demo application. Login with either role to see different views.</p>
        </div>
      </div>
      
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--gray-light);
        }
        
        .login-container {
          background-color: white;
          border-radius: var(--border-radius);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-md);
          width: 100%;
          max-width: 400px;
        }
        
        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }
        
        .login-header h1 {
          margin-bottom: var(--spacing-xs);
          color: var(--primary);
        }
        
        .login-header p {
          color: var(--gray-dark);
        }
        
        .login-form {
          margin-bottom: var(--spacing-lg);
        }
        
        .role-selector {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .role-btn {
          flex: 1;
          padding: var(--spacing-md);
          border: 1px solid var(--gray-medium);
          background-color: white;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }
        
        .role-btn.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .login-btn {
          width: 100%;
          padding: var(--spacing-md);
          margin-top: var(--spacing-md);
        }
        
        .login-footer {
          text-align: center;
          color: var(--gray-dark);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
