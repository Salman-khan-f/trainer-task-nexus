
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import TrainerList from '../components/TrainerList';
import TrainersTable from '../components/TrainersTable';
import TaskForm from '../components/TaskForm';
import TaskDetail from '../components/TaskDetail';
import TrainerProfile from '../components/TrainerProfile';
import { CalendarEvent, Task, Trainer } from '../types';
import { useUser } from '../context/UserContext';
import {
  trainers,
  colleges,
  loadTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask,
  getTrainerById,
  getCollegeById
} from '../services/data';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'trainers' | 'trainersTable'>('calendar');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role !== 'superadmin') {
      navigate('/trainer');
    }
  }, [user, navigate]);
  
  // Load tasks on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);
  
  // Convert tasks to calendar events
  useEffect(() => {
    const events: CalendarEvent[] = tasks.map(task => {
      const trainer = getTrainerById(task.trainerId);
      const college = task.collegeId ? getCollegeById(task.collegeId) : undefined;
      
      return {
        ...task,
        trainerName: trainer?.name || 'Unknown',
        collegeName: college?.name
      };
    });
    
    setCalendarEvents(events);
  }, [tasks]);
  
  const handleDateClick = (date: string) => {
    // Open form to create new task on this date
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  };
  
  const handleEventClick = (event: CalendarEvent) => {
    // Find the corresponding task
    const task = tasks.find(t => t.id === event.id);
    if (task) {
      setDetailTask(task);
    }
  };
  
  const handleTrainerSelect = (trainer: Trainer) => {
    // Open form to create new task for this trainer
    setSelectedTask(null);
    setIsTaskFormOpen(true);
  };
  
  const handleViewProfile = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsProfileOpen(true);
  };
  
  const handleTaskSubmit = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      // Update existing task
      const updated = updateTask({ ...taskData, id: selectedTask.id });
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === updated.id ? updated : task)
      );
    } else {
      // Add new task
      const newTask = addTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    
    setIsTaskFormOpen(false);
    setSelectedTask(null);
  };
  
  const handleEditTask = () => {
    if (detailTask) {
      setSelectedTask(detailTask);
      setDetailTask(null);
      setIsTaskFormOpen(true);
    }
  };
  
  const handleDeleteTask = () => {
    if (detailTask) {
      deleteTask(detailTask.id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== detailTask.id));
      setDetailTask(null);
    }
  };
  
  if (!user || user.role !== 'superadmin') {
    return null;
  }
  
  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Super Admin Dashboard</h2>
          <button 
            className="btn-primary" 
            onClick={() => {
              setSelectedTask(null);
              setIsTaskFormOpen(true);
            }}
          >
            Assign New Task
          </button>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar View
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trainers' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainers')}
          >
            Trainers Cards
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trainersTable' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainersTable')}
          >
            Trainers Table
          </button>
        </div>
        
        <div className="dashboard-main">
          {activeTab === 'calendar' ? (
            <Calendar 
              events={calendarEvents}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          ) : activeTab === 'trainers' ? (
            <TrainerList 
              trainers={trainers}
              onTrainerSelect={handleTrainerSelect}
            />
          ) : (
            <TrainersTable 
              trainers={trainers}
              onViewProfile={handleViewProfile}
              onAssignTask={handleTrainerSelect}
            />
          )}
        </div>
      </div>
      
      {isTaskFormOpen && (
        <TaskForm 
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setIsTaskFormOpen(false);
            setSelectedTask(null);
          }}
          initialData={selectedTask || undefined}
          isOpen={isTaskFormOpen}
        />
      )}
      
      {detailTask && (
        <TaskDetail 
          task={detailTask}
          onClose={() => setDetailTask(null)}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
      
      {isProfileOpen && selectedTrainer && (
        <TrainerProfile
          trainer={selectedTrainer}
          onClose={() => {
            setSelectedTrainer(null);
            setIsProfileOpen(false);
          }}
          isAdmin={true}
        />
      )}
      
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .dashboard-content {
          flex: 1;
          padding: var(--spacing-md);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .dashboard-header h2 {
          margin: 0;
        }
        
        .dashboard-tabs {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .tab-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: white;
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius);
          font-weight: 500;
        }
        
        .tab-btn.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .dashboard-main {
          margin-bottom: var(--spacing-lg);
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }
          
          .dashboard-tabs {
            width: 100%;
          }
          
          .tab-btn {
            flex: 1;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
