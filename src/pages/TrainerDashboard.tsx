
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CalendarEvent, Task } from '../types';
import { useUser } from '../context/UserContext';
import TaskDetail from '../components/TaskDetail';
import Calendar from '../components/Calendar';
import {
  getTasksByTrainerId,
  getTrainerById,
  getCollegeById,
  updateTask,
  deleteTask
} from '../services/data';

const TrainerDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  
  // Redirect if not logged in or not trainer
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role !== 'trainer') {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  // Load tasks for this trainer
  useEffect(() => {
    if (user) {
      const loadedTasks = getTasksByTrainerId(user.id);
      setTasks(loadedTasks);
    }
  }, [user]);
  
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
  
  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'upcoming':
        return tasks.filter(task => task.endDate >= today && task.status !== 'completed');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'all':
      default:
        return tasks;
    }
  };
  
  const handleEventClick = (event: CalendarEvent) => {
    // Find the corresponding task
    const task = tasks.find(t => t.id === event.id);
    if (task) {
      setDetailTask(task);
    }
  };
  
  const handleTaskStatusChange = (task: Task, newStatus: 'pending' | 'in-progress' | 'completed') => {
    const updatedTask = { ...task, status: newStatus };
    updateTask(updatedTask);
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === task.id ? updatedTask : t)
    );
    
    setDetailTask(null);
  };
  
  const filteredTasks = getFilteredTasks();
  
  if (!user || user.role !== 'trainer') {
    return null;
  }
  
  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Your Tasks</h2>
        </div>
        
        <div className="trainer-tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Tasks
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Tasks
          </button>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Tasks
          </button>
        </div>
        
        <div className="dashboard-main">
          <div className="tasks-calendar">
            <Calendar 
              events={calendarEvents.filter(event => {
                const today = new Date().toISOString().split('T')[0];
                
                switch (activeTab) {
                  case 'upcoming':
                    return event.endDate >= today && event.status !== 'completed';
                  case 'completed':
                    return event.status === 'completed';
                  case 'all':
                  default:
                    return true;
                }
              })}
              onDateClick={() => {}}
              onEventClick={handleEventClick}
            />
          </div>
          
          <div className="tasks-list">
            <h3>
              {activeTab === 'upcoming' ? 'Upcoming Tasks' : 
               activeTab === 'completed' ? 'Completed Tasks' : 'All Tasks'}
              <span className="task-count">({filteredTasks.length})</span>
            </h3>
            
            {filteredTasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks found</p>
              </div>
            ) : (
              <div className="task-cards">
                {filteredTasks.map(task => {
                  const college = task.collegeId ? getCollegeById(task.collegeId) : null;
                  
                  return (
                    <div 
                      key={task.id} 
                      className="task-card"
                      onClick={() => setDetailTask(task)}
                    >
                      <div className="task-card-header">
                        <h4>{task.title}</h4>
                        <div className={`task-status ${task.status}`}>
                          {task.status}
                        </div>
                      </div>
                      
                      <div className="task-card-type">
                        <span className={`task-type-badge ${task.type}`}>
                          {task.type === 'training' ? 'Training' : 'Non-Training'}
                        </span>
                        {task.type === 'training' && task.course && (
                          <span className="course-badge">{task.course}</span>
                        )}
                      </div>
                      
                      <div className="task-card-dates">
                        <div>
                          <strong>Start:</strong> {new Date(task.startDate).toLocaleDateString()}
                          {task.startTime && ` at ${task.startTime}`}
                        </div>
                        <div>
                          <strong>End:</strong> {new Date(task.endDate).toLocaleDateString()}
                          {task.endTime && ` at ${task.endTime}`}
                        </div>
                      </div>
                      
                      {task.type === 'training' && college && (
                        <div className="task-card-location">
                          <strong>Location:</strong> {college.name}, {college.location}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {detailTask && (
        <TaskDetail 
          task={detailTask}
          onClose={() => setDetailTask(null)}
          onEdit={() => {
            if (detailTask.status === 'pending') {
              handleTaskStatusChange(detailTask, 'in-progress');
            } else if (detailTask.status === 'in-progress') {
              handleTaskStatusChange(detailTask, 'completed');
            }
          }}
          onDelete={() => setDetailTask(null)}
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
          margin-bottom: var(--spacing-md);
        }
        
        .dashboard-header h2 {
          margin: 0;
        }
        
        .trainer-tabs {
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
        
        .tasks-calendar {
          margin-bottom: var(--spacing-lg);
        }
        
        .tasks-list h3 {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .task-count {
          margin-left: var(--spacing-sm);
          font-size: 1rem;
          color: var(--gray-dark);
        }
        
        .no-tasks {
          background-color: white;
          padding: var(--spacing-lg);
          text-align: center;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
        }
        
        .task-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        .task-card {
          background-color: white;
          padding: var(--spacing-md);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .task-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .task-card-header h4 {
          margin: 0;
        }
        
        .task-status {
          text-transform: capitalize;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .task-status.pending {
          background-color: var(--warning);
          color: var(--text-dark);
        }
        
        .task-status.in-progress {
          background-color: var(--info);
          color: white;
        }
        
        .task-status.completed {
          background-color: var(--success);
          color: white;
        }
        
        .task-card-type {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }
        
        .task-type-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .task-type-badge.training {
          background-color: var(--info);
          color: white;
        }
        
        .task-type-badge.non-training {
          background-color: var(--warning);
          color: var(--text-dark);
        }
        
        .course-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          background-color: var(--primary-light);
          color: white;
        }
        
        .task-card-dates {
          margin-bottom: var(--spacing-sm);
          font-size: 0.9rem;
        }
        
        .task-card-location {
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .trainer-tabs {
            flex-wrap: wrap;
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

export default TrainerDashboard;
