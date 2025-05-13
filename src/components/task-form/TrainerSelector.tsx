
import React, { useState, useEffect } from 'react';
import { Trainer } from '../../types';

interface TrainerSelectorProps {
  trainerId: string;
  onTrainerSelect: (trainerId: string) => void;
  trainers: Trainer[];
}

const TrainerSelector: React.FC<TrainerSelectorProps> = ({ 
  trainerId, 
  onTrainerSelect, 
  trainers 
}) => {
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>(trainers);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const filtered = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrainers(filtered);
    } else {
      setFilteredTrainers(trainers);
    }
  }, [searchTerm, trainers]);

  return (
    <>
      <div className="form-group">
        <label>Search Trainer</label>
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Select Trainer</label>
        <select 
          value={trainerId} 
          onChange={(e) => onTrainerSelect(e.target.value)}
          required
        >
          <option value="">-- Select Trainer --</option>
          {filteredTrainers.map(trainer => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name} ({trainer.id}) - {trainer.specialization.join(', ')}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TrainerSelector;
