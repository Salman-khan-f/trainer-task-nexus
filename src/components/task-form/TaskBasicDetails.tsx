
import React from 'react';
import { TaskType } from '../../types';

interface TaskBasicDetailsProps {
  taskType: TaskType;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  onTaskTypeChange: (type: TaskType) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TaskBasicDetails: React.FC<TaskBasicDetailsProps> = ({
  taskType,
  title,
  description,
  startDate,
  endDate,
  status,
  onTaskTypeChange,
  onTitleChange,
  onDescriptionChange,
  onStartDateChange,
  onEndDateChange,
  onStatusChange
}) => {
  return (
    <>
      <div className="form-group">
        <label>Task Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="taskType"
              value="training"
              checked={taskType === 'training'}
              onChange={() => onTaskTypeChange('training')}
            />
            Training Day
          </label>
          <label>
            <input
              type="radio"
              name="taskType"
              value="non-training"
              checked={taskType === 'non-training'}
              onChange={() => onTaskTypeChange('non-training')}
            />
            Non-Training Day
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={onStatusChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </>
  );
};

export default TaskBasicDetails;
