
import React, { useState } from 'react';
import { Trainer } from '../types';

interface TrainerListProps {
  trainers: Trainer[];
  onTrainerSelect: (trainer: Trainer) => void;
}

const TrainerList: React.FC<TrainerListProps> = ({ trainers, onTrainerSelect }) => {
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
    <div className="trainer-list-container">
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
      
      <div className="trainers-grid">
        {filteredTrainers.map(trainer => (
          <div 
            key={trainer.id} 
            className="trainer-card"
            onClick={() => onTrainerSelect(trainer)}
          >
            <div className="trainer-header">
              <div className="trainer-name-id">
                <h3>{trainer.name}</h3>
                <span className="trainer-id">{trainer.id}</span>
              </div>
              <div className={`trainer-status ${trainer.availability ? 'available' : 'unavailable'}`}>
                {trainer.availability ? 'Available' : 'Unavailable'}
              </div>
            </div>
            
            <div className="trainer-contact">
              <div>{trainer.email}</div>
              <div>{trainer.phone}</div>
            </div>
            
            <div className="trainer-specializations">
              {trainer.specialization.map(spec => (
                <span key={spec} className="specialization-badge">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .trainer-list-container {
          background-color: white;
          border-radius: var(--border-radius);
          padding: var(--spacing-md);
          box-shadow: var(--shadow-sm);
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
        
        .trainers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        .trainer-card {
          background-color: var(--gray-light);
          border-radius: var(--border-radius);
          padding: var(--spacing-md);
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid var(--gray-medium);
        }
        
        .trainer-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .trainer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-sm);
        }
        
        .trainer-name-id h3 {
          margin: 0;
          margin-bottom: 4px;
        }
        
        .trainer-id {
          font-size: 0.8rem;
          color: var(--gray-dark);
        }
        
        .trainer-status {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
        
        .trainer-status.available {
          background-color: var(--success);
          color: white;
        }
        
        .trainer-status.unavailable {
          background-color: var(--danger);
          color: white;
        }
        
        .trainer-contact {
          margin-bottom: var(--spacing-sm);
          font-size: 0.9rem;
          color: var(--text-dark);
        }
        
        .trainer-specializations {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
        
        .specialization-badge {
          background-color: var(--primary-light);
          color: white;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default TrainerList;
