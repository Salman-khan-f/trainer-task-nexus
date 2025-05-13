
import React from 'react';
import { Task } from '../types';
import { trainers, colleges, getTrainerById, getCollegeById } from '../services/data';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onEdit, onDelete }) => {
  const trainer = getTrainerById(task.trainerId);
  const college = task.collegeId ? getCollegeById(task.collegeId) : null;
  
  if (!trainer) return <div>Trainer not found</div>;
  
  return (
    <div className="task-detail-overlay">
      <div className="task-detail-container">
        <div className="task-detail-header">
          <h2>{task.title}</h2>
          <div className={`task-type ${task.type === 'training' ? 'training' : 'non-training'}`}>
            {task.type === 'training' ? 'Training' : 'Non-Training'}
          </div>
        </div>
        
        <div className="task-detail-content">
          <div className="task-section">
            <h3>Task Details</h3>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`status-badge ${task.status}`}>{task.status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Description:</span>
              <p>{task.description || 'No description provided'}</p>
            </div>
          </div>
          
          <div className="task-section">
            <h3>Trainer</h3>
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span>{trainer.name} ({trainer.id})</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span>{trainer.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span>{trainer.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Specialization:</span>
              <div className="specialization-badges">
                {trainer.specialization.map(spec => (
                  <span key={spec} className="specialization-badge">{spec}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="task-section">
            <h3>Schedule</h3>
            <div className="detail-item">
              <span className="detail-label">Start Date:</span>
              <span>{new Date(task.startDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">End Date:</span>
              <span>{new Date(task.endDate).toLocaleDateString()}</span>
            </div>
            
            {task.type === 'training' && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span>{task.startTime} - {task.endTime}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Course:</span>
                  <span>{task.course}</span>
                </div>
                
                {college && (
                  <div className="college-details">
                    <div className="detail-item">
                      <span className="detail-label">College:</span>
                      <span>{college.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span>{college.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Contact:</span>
                      <span>{college.contact}</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="task-detail-actions">
          <button className="btn-outline" onClick={onClose}>Close</button>
          <div>
            <button className="btn-outline delete-btn" onClick={onDelete}>Delete</button>
            <button className="btn-primary" onClick={onEdit}>Edit</button>
          </div>
        </div>
      </div>
      
      <style>{`
        .task-detail-overlay {
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
        
        .task-detail-container {
          background-color: white;
          padding: var(--spacing-lg);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .task-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--gray-medium);
        }
        
        .task-detail-header h2 {
          margin: 0;
        }
        
        .task-type {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--border-radius);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .task-type.training {
          background-color: var(--info);
          color: white;
        }
        
        .task-type.non-training {
          background-color: var(--warning);
          color: var(--text-dark);
        }
        
        .task-detail-content {
          margin-bottom: var(--spacing-lg);
        }
        
        .task-section {
          margin-bottom: var(--spacing-md);
        }
        
        .task-section h3 {
          margin: 0;
          margin-bottom: var(--spacing-sm);
          color: var(--primary);
          font-size: 1.1rem;
        }
        
        .detail-item {
          margin-bottom: var(--spacing-sm);
          display: flex;
          flex-wrap: wrap;
        }
        
        .detail-label {
          font-weight: 500;
          min-width: 120px;
        }
        
        .status-badge {
          text-transform: capitalize;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        
        .status-badge.pending {
          background-color: var(--warning);
          color: var(--text-dark);
        }
        
        .status-badge.in-progress {
          background-color: var(--info);
          color: white;
        }
        
        .status-badge.completed {
          background-color: var(--success);
          color: white;
        }
        
        .specialization-badges {
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
        
        .college-details {
          margin-top: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px dashed var(--gray-medium);
        }
        
        .task-detail-actions {
          display: flex;
          justify-content: space-between;
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--gray-medium);
        }
        
        .task-detail-actions div {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .delete-btn {
          color: var(--danger);
          border-color: var(--danger);
        }
        
        .delete-btn:hover {
          background-color: var(--danger);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TaskDetail;
