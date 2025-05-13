
import React, { useState, useEffect } from 'react';
import { Task, Trainer, College, TaskType } from '../types';
import { trainers, colleges } from '../services/data';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  initialData?: Task;
  isOpen: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, isOpen }) => {
  const [trainerId, setTrainerId] = useState(initialData?.trainerId || '');
  const [taskType, setTaskType] = useState<TaskType>(initialData?.type || 'training');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  const [collegeId, setCollegeId] = useState(initialData?.collegeId || '');
  const [course, setCourse] = useState(initialData?.course || '');
  const [status, setStatus] = useState(initialData?.status || 'pending');
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
  }, [searchTerm]);

  // Reset form when opening or changing initialData
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTrainerId(initialData.trainerId);
        setTaskType(initialData.type);
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
        setStartTime(initialData.startTime || '');
        setEndTime(initialData.endTime || '');
        setCollegeId(initialData.collegeId || '');
        setCourse(initialData.course || '');
        setStatus(initialData.status);
      } else {
        // Reset form for new task
        setTrainerId('');
        setTaskType('training');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setCollegeId('');
        setCourse('');
        setStatus('pending');
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id'> = {
      trainerId,
      type: taskType,
      title,
      description: description || undefined,
      startDate,
      endDate,
      status: status as 'pending' | 'in-progress' | 'completed',
    };
    
    if (taskType === 'training') {
      taskData.startTime = startTime;
      taskData.endTime = endTime;
      taskData.collegeId = collegeId;
      taskData.course = course;
    }
    
    onSubmit(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setTrainerId(e.target.value)}
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
          
          <div className="form-group">
            <label>Task Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="taskType"
                  value="training"
                  checked={taskType === 'training'}
                  onChange={() => setTaskType('training')}
                />
                Training Day
              </label>
              <label>
                <input
                  type="radio"
                  name="taskType"
                  value="non-training"
                  checked={taskType === 'non-training'}
                  onChange={() => setTaskType('non-training')}
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
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          {taskType === 'training' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>College/Location</label>
                <select
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                >
                  <option value="">-- Select College --</option>
                  {colleges.map(college => (
                    <option key={college.id} value={college.id}>
                      {college.name} ({college.location})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">-- Select Course --</option>
                  <option value="React">React</option>
                  <option value="DSA">DSA</option>
                  <option value="SDET">SDET</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .task-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .task-form-container {
          background-color: white;
          padding: var(--spacing-lg);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .form-group {
          margin-bottom: var(--spacing-md);
        }
        
        .form-group label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 500;
        }
        
        .form-row {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .form-row .form-group {
          flex: 1;
        }
        
        .radio-group {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .radio-group label {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-weight: normal;
        }
        
        .radio-group input {
          width: auto;
          margin: 0;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }
      `}</style>
    </div>
  );
};

export default TaskForm;
