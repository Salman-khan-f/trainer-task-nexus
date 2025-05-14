
import React from 'react';
import { TrainerRole } from '../../types';

interface TrainerRoleSelectorProps {
  trainerRole: TrainerRole;
  onRoleChange: (role: TrainerRole) => void;
  isTrainingType: boolean;
}

const TrainerRoleSelector: React.FC<TrainerRoleSelectorProps> = ({
  trainerRole,
  onRoleChange,
  isTrainingType
}) => {
  if (!isTrainingType) return null;
  
  return (
    <div className="form-group">
      <label>Trainer Role</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="trainerRole"
            value="trainer"
            checked={trainerRole === 'trainer'}
            onChange={() => onRoleChange('trainer')}
          />
          Trainer
        </label>
        <label>
          <input
            type="radio"
            name="trainerRole"
            value="ta"
            checked={trainerRole === 'ta'}
            onChange={() => onRoleChange('ta')}
          />
          Training Assistant (TA)
        </label>
      </div>
    </div>
  );
};

export default TrainerRoleSelector;
