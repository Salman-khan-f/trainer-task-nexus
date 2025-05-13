
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Trainer Management</h1>
      </div>
      
      {user && (
        <div className="navbar-content">
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role === 'superadmin' ? 'Super Admin' : 'Trainer'}</span>
          </div>
          
          <button className="btn-outline logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      
      <style>{`
        .navbar {
          background-color: var(--primary);
          color: white;
          padding: var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .navbar-brand h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        
        .navbar-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          text-align: right;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .user-role {
          font-size: 0.8rem;
          opacity: 0.9;
        }
        
        .logout-btn {
          background-color: transparent;
          color: white;
          border: 1px solid white;
        }
        
        .logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
