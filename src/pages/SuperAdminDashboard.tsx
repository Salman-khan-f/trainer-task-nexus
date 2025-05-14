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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [trainerAssignments, setTrainerAssignments] = useState<Array<{trainer: Trainer, task: Task, location?: string}>>([]);
  
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
    // Get all tasks for this date
    const tasksOnDate = tasks.filter(task => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);
      const selectedDate = new Date(date);
      
      return selectedDate >= taskStart && selectedDate <= taskEnd;
    });
    
    // Build list of trainer assignments for this date
    const assignments = tasksOnDate.map(task => {
      const trainer = getTrainerById(task.trainerId);
      const location = task.collegeId ? getCollegeById(task.collegeId)?.name : undefined;
      
      return {
        trainer: trainer!,
        task,
        location
      };
    });
    
    setTrainerAssignments(assignments);
    setSelectedDate(date);
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
            <>
              <Calendar 
                events={calendarEvents}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />
              
              {selectedDate && (
                <div className="day-assignments-container">
                  <div className="day-assignments-header">
                    <h3>Trainer Assignments - {new Date(selectedDate).toLocaleDateString()}</h3>
                    <button 
                      className="btn-outline btn-sm" 
                      onClick={() => setSelectedDate(null)}
                    >
                      Close
                    </button>
                  </div>
                  
                  {trainerAssignments.length === 0 ? (
                    <p className="no-assignments">No trainers assigned for this date.</p>
                  ) : (
                    <div className="day-assignments-list">
                      {trainerAssignments.map((assignment, index) => (
                        <div className="assignment-card" key={index}>
                          <div className="assignment-header">
                            <h4>{assignment.trainer.name}</h4>
                            <div className="assignment-actions">
                              <button 
                                className="btn-link"
                                onClick={() => handleViewProfile(assignment.trainer)}
                              >
                                View Profile
                              </button>
                            </div>
                          </div>
                          <div className="assignment-details">
                            <div className="assignment-detail">
                              <span className="detail-label">Task:</span>
                              <span className="detail-value">{assignment.task.title}</span>
                            </div>
                            <div className="assignment-detail">
                              <span className="detail-label">Type:</span>
                              <span className="detail-value">{assignment.task.type === 'training' ? 'Training' : 'Non-Training'}</span>
                            </div>
                            {assignment.location && (
                              <div className="assignment-detail">
                                <span className="detail-label">Client/Location:</span>
                                <span className="detail-value">{assignment.location}</span>
                              </div>
                            )}
                            <div className="assignment-detail">
                              <span className="detail-label">Status:</span>
                              <span className={`status-badge status-${assignment.task.status}`}>{assignment.task.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
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
        
        /* Day assignments styles */
        .day-assignments-container {
          margin-top: var(--spacing-md);
          background-color: white;
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        
        .day-assignments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background-color: var(--primary-light);
          color: white;
        }
        
        .day-assignments-header h3 {
          margin: 0;
        }
        
        .day-assignments-list {
          padding: var(--spacing-md);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        .no-assignments {
          padding: var(--spacing-md);
          text-align: center;
          color: var(--gray-dark);
        }
        
        .assignment-card {
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        
        .assignment-header {
          background-color: var(--gray-light);
          padding: var(--spacing-sm) var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .assignment-header h4 {
          margin: 0;
          font-size: 1rem;
        }
        
        .assignment-details {
          padding: var(--spacing-md);
        }
        
        .assignment-detail {
          display: flex;
          margin-bottom: var(--spacing-xs);
        }
        
        .detail-label {
          width: 120px;
          font-weight: 500;
          color: var(--gray-dark);
        }
        
        .detail-value {
          flex: 1;
        }
        
        .status-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          text-transform: capitalize;
        }
        
        .status-pending {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        
        .status-in-progress {
          background-color: var(--info-light);
          color: var(--info);
        }
        
        .status-completed {
          background-color: var(--success-light);
          color: var(--success);
        }
        
        .btn-link {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: var(--primary);
          cursor: pointer;
          text-decoration: underline;
        }
        
        .btn-sm {
          padding: 4px 8px;
          font-size: 0.8rem;
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
          
          .day-assignments-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
