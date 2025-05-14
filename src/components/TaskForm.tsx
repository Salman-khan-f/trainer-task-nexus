import React, { useState } from 'react';
import TaskBasicDetails from './task-form/TaskBasicDetails';
import TrainerSelector from './task-form/TrainerSelector';
import TrainingFields from './task-form/TrainingFields';
import TrainerRoleSelector from './task-form/TrainerRoleSelector';
import { TaskType, Task } from '../types';
import { TaskFormStyles } from './styles/TaskFormStyles';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  initialData?: Task;
  isOpen: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, isOpen }) => {
  const [taskType, setTaskType] = useState<TaskType>(initialData?.type || 'training');
  const [trainerId, setTrainerId] = useState(initialData?.trainerId || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  const [collegeId, setCollegeId] = useState(initialData?.collegeId || '');
  const [course, setCourse] = useState(initialData?.course || '');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>(initialData?.status || 'pending');
  const [trainerRole, setTrainerRole] = useState<'trainer' | 'ta'>(initialData?.trainerRole || 'trainer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id'> = {
      trainerId,
      type: taskType,
      title,
      description,
      startDate,
      endDate,
      status,
      ...(taskType === 'training' && {
        startTime,
        endTime,
        collegeId,
        course,
        trainerRole // Add the trainer role
      })
    };
    
    onSubmit(taskData);
  };

  return (
    <div className={`task-form-overlay ${isOpen ? 'open' : ''}`}>
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <TaskBasicDetails 
            taskType={taskType}
            title={title}
            description={description}
            startDate={startDate}
            endDate={endDate}
            status={status}
            onTaskTypeChange={setTaskType}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onStatusChange={e => setStatus(e.target.value as 'pending' | 'in-progress' | 'completed')}
          />
          
          <TrainerSelector 
            selectedTrainerId={trainerId}
            onTrainerChange={setTrainerId}
          />
          
          {/* Add the new TrainerRoleSelector component */}
          <TrainerRoleSelector
            trainerRole={trainerRole}
            onRoleChange={setTrainerRole}
            isTrainingType={taskType === 'training'}
          />
          
          {taskType === 'training' && (
            <TrainingFields
              startTime={startTime}
              endTime={endTime}
              collegeId={collegeId}
              course={course}
              onStartTimeChange={setStartTime}
              onEndTimeChange={setEndTime}
              onCollegeIdChange={setCollegeId}
              onCourseChange={setCourse}
            />
          )}
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
      <TaskFormStyles />
    </div>
  );
};

export default TaskForm;
