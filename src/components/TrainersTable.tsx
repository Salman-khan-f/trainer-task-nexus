
import React, { useState } from 'react';
import { Trainer } from '../types';

interface TrainersTableProps {
  trainers: Trainer[];
  onViewProfile: (trainer: Trainer) => void;
  onAssignTask: (trainer: Trainer) => void;
}

const TrainersTable: React.FC<TrainersTableProps> = ({ 
  trainers, 
  onViewProfile,
  onAssignTask 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  
  // Get all unique specializations
  const specializations = Array.from(
    new Set(trainers.flatMap(trainer => trainer.specialization))
  ).sort();
  
  // Filter trainers based on search term and specialization
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = !selectedSpecialization || 
      trainer.specialization.includes(selectedSpecialization);
    
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="trainers-table-container">
      <h2>Trainers</h2>
      
      <div className="trainer-filters">
        <input
          type="text"
          placeholder="Search trainers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="trainer-search"
        />
        
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="specialization-filter"
        >
          <option value="">All Specializations</option>
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>
      
      <div className="trainer-count">
        <span>{filteredTrainers.length} trainers</span>
      </div>
      
      <div className="table-responsive">
        <table className="trainers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specializations</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map(trainer => (
              <tr key={trainer.id}>
                <td>{trainer.id}</td>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.phone}</td>
                <td>
                  <div className="specialization-tags">
                    {trainer.specialization.map(spec => (
                      <span key={spec} className="specialization-tag">{spec}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${trainer.availability ? 'available' : 'unavailable'}`}>
                    {trainer.availability ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="action-buttons">
                  <button 
                    className="btn-small btn-outline"
                    onClick={() => onViewProfile(trainer)}
                  >
                    View Profile
                  </button>
                  <button 
                    className="btn-small btn-primary"
                    onClick={() => onAssignTask(trainer)}
                  >
                    Assign Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        .trainers-table-container {
          background-color: white;
          border-radius: var(--border-radius);
          padding: var(--spacing-md);
          box-shadow: var(--shadow-sm);
          margin-bottom: var(--spacing-lg);
        }
        
        .trainers-table-container h2 {
          margin-top: 0;
        }
        
        .trainer-filters {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .trainer-search {
          flex: 2;
        }
        
        .specialization-filter {
          flex: 1;
        }
        
        .trainer-count {
          margin-bottom: var(--spacing-md);
          font-size: 0.9rem;
          color: var(--gray-dark);
        }
        
        .table-responsive {
          overflow-x: auto;
        }
        
        .trainers-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }
        
        .trainers-table th,
        .trainers-table td {
          padding: var(--spacing-sm);
          border-bottom: 1px solid var(--gray-medium);
        }
        
        .trainers-table th {
          text-align: left;
          font-weight: 500;
          background-color: var(--gray-light);
        }
        
        .trainers-table tr:hover {
          background-color: var(--gray-light);
        }
        
        .specialization-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        .specialization-tag {
          background-color: var(--primary-light);
          color: white;
          font-size: 0.75rem;
          padding: 1px 6px;
          border-radius: 10px;
        }
        
        .status-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .status-badge.available {
          background-color: var(--success);
          color: white;
        }
        
        .status-badge.unavailable {
          background-color: var(--danger);
          color: white;
        }
        
        .action-buttons {
          display: flex;
          gap: var(--spacing-xs);
        }
        
        .btn-small {
          padding: 4px 8px;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default TrainersTable;
