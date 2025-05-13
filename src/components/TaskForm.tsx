
import React, { useState, useEffect } from 'react';
import { Task, TaskType } from '../types';
import { trainers, colleges } from '../services/data';
import TrainerSelector from './task-form/TrainerSelector';
import TrainingFields from './task-form/TrainingFields';
import TaskBasicDetails from './task-form/TaskBasicDetails';
import TaskFormStyles from './task-form/TaskFormStyles';

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
  const [collegeId, setCollegeId] = useState(initialData?.collegeId || '');
  const [course, setCourse] = useState(initialData?.course || '');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>(initialData?.status || 'pending');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTrainerId(initialData.trainerId);
        setTaskType(initialData.type);
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
        setCollegeId(initialData.collegeId || '');
        setCourse(initialData.course || '');
        setStatus(initialData.status);
      } else {
        setTrainerId('');
        setTaskType('training');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setCollegeId('');
        setCourse('');
        setStatus('pending');
      }
    }
  }, [isOpen, initialData]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'pending' | 'in-progress' | 'completed';
    setStatus(newStatus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id'> = {
      trainerId,
      type: taskType,
      title,
      description: description || undefined,
      startDate,
      endDate,
      status,
    };
    
    if (taskType === 'training') {
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
          <TrainerSelector 
            trainerId={trainerId}
            onTrainerSelect={setTrainerId}
            trainers={trainers}
          />
          
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
            onStatusChange={handleStatusChange}
          />
          
          {taskType === 'training' && (
            <TrainingFields
              collegeId={collegeId}
              course={course}
              onCollegeChange={setCollegeId}
              onCourseChange={setCourse}
              colleges={colleges}
            />
          )}
          
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
      <TaskFormStyles />
    </div>
  );
};

export default TaskForm;
