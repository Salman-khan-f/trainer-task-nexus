
import { Trainer, College, Task, UserCredentials } from '../types';

// Updated trainer data with 10 specific trainers
export const trainers: Trainer[] = [
  {
    id: 'neo10172',
    name: 'Aravindhan S',
    email: 'aravindhan.s@iamneo.ai',
    phone: '6381466026',
    specialization: ['JavaScript'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo/c/10301',
    name: 'Bindhiya J',
    email: 'bindhiya.j@iamneo.ai',
    phone: '8925702124',
    specialization: ['C++', 'DSA'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Parul - C++, DSA',
        role: 'TA'
      },
      '2025-04-02': {
        task: 'Parul - C++',
        role: 'TA'
      }
    }
  },
  {
    id: 'neo10370',
    name: 'Denis Anto Bosco J',
    email: 'denisanto.bosco@iamneo.ai',
    phone: '6381035379',
    specialization: ['C++', 'DSA'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Parul - C++, DSA',
        role: 'Trainer'
      },
      '2025-04-02': {
        task: 'Parul - C++',
        role: 'Trainer'
      }
    }
  },
  {
    id: 'neo10377',
    name: 'Devisri Shanmugam',
    email: 'devisri.s@iamneo.ai',
    phone: '9629984527',
    specialization: ['JavaScript'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo10390',
    name: 'Gokulnath S',
    email: 'gokulnath.s@iamneo.ai',
    phone: '8073844150',
    specialization: ['JavaScript'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo10265',
    name: 'Karan Dharmalingam',
    email: 'karan@iamneo.ai',
    phone: '8248086234',
    specialization: ['JavaScript', 'React'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo10367',
    name: 'Mohammad Abrar',
    email: 'mohammad.abrar@iamneo.ai',
    phone: '8220741428',
    specialization: ['JavaScript', 'React'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo/c/10278',
    name: 'Ramachandramoorthy K B',
    email: 'machandra.moorthy@iamneo.ai',
    phone: '9487057895',
    specialization: ['C++', 'DSA'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Parul - C++, DSA',
        role: 'TA'
      },
      '2025-04-02': {
        task: 'Parul - C++',
        role: 'TA'
      }
    }
  },
  {
    id: 'neo10335',
    name: 'Salman Khan',
    email: 'salmankhan@iamneo.ai',
    phone: '9344366702',
    specialization: ['JavaScript', 'React'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  },
  {
    id: 'neo10376',
    name: 'Surya K',
    email: 'surya.k@iamneo.ai',
    phone: '8220924040',
    specialization: ['JavaScript'],
    availability: true,
    allocations: {
      '2025-04-01': {
        task: 'Not alloted',
        role: 'Not alloted'
      },
      '2025-04-02': {
        task: 'Not alloted',
        role: 'Not alloted'
      }
    }
  }
];

// Now we need to update the Trainer type in types/index.ts to include the allocations
// Let's also update the UserCredentials to match our new trainer IDs

// Mock college data
export const colleges: College[] = [
  { id: 'C1', name: 'Tech Institute', location: 'New York', contact: '555-123-4567' },
  { id: 'C2', name: 'Engineering College', location: 'San Francisco', contact: '555-987-6543' },
  { id: 'C3', name: 'Data Science Academy', location: 'Boston', contact: '555-246-8101' },
  { id: 'C4', name: 'Computer Science University', location: 'Austin', contact: '555-369-1478' },
  { id: 'C5', name: 'Developer Training Center', location: 'Seattle', contact: '555-789-4561' },
  { id: 'C6', name: 'Sree Krishna College of Technology', location: 'Chennai', contact: '555-111-2222' },
];

// Sample initial tasks
export const initialTasks: Task[] = [
  {
    id: 'task1',
    trainerId: 'Neo1',
    type: 'training',
    title: 'React Fundamentals',
    description: 'Introduction to React basics and hooks',
    startDate: '2025-05-14',
    endDate: '2025-05-14',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C1',
    course: 'React',
    status: 'pending',
  },
  {
    id: 'task2',
    trainerId: 'Neo2',
    type: 'training',
    title: 'Data Structures',
    description: 'Advanced data structures concepts',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    startTime: '10:00',
    endTime: '16:00',
    collegeId: 'C2',
    course: 'DSA',
    status: 'pending',
  },
  {
    id: 'task3',
    trainerId: 'Neo3',
    type: 'non-training',
    title: 'Curriculum Development',
    description: 'Develop new SDET curriculum',
    startDate: '2025-05-13',
    endDate: '2025-05-20',
    status: 'in-progress',
  },
];

// Authentication data
export const userCredentials: UserCredentials[] = [
  { username: 'Salman', password: 'Salman123', role: 'superadmin' },
  ...trainers.map(trainer => ({ 
    username: trainer.id, 
    password: trainer.id, 
    role: 'trainer' as const,
    trainerId: trainer.id
  }))
];

// Authenticate user
export const authenticateUser = (username: string, password: string): UserCredentials | null => {
  return userCredentials.find(
    cred => cred.username === username && cred.password === password
  ) || null;
};

// Local storage keys
const TASKS_STORAGE_KEY = 'trainer_management_tasks';

// Initial load from localStorage or use defaults
export const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : initialTasks;
};

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Get tasks for a specific trainer
export const getTasksByTrainerId = (trainerId: string): Task[] => {
  const tasks = loadTasks();
  return tasks.filter(task => task.trainerId === trainerId);
};

// Add a new task
export const addTask = (task: Omit<Task, 'id'>): Task => {
  const tasks = loadTasks();
  const newTask = {
    ...task,
    id: `task${Date.now()}`,
  };
  
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return newTask;
};

// Update an existing task
export const updateTask = (updatedTask: Task): Task => {
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  
  saveTasks(updatedTasks);
  return updatedTask;
};

// Delete a task
export const deleteTask = (taskId: string): void => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
};

// Get a trainer by ID
export const getTrainerById = (trainerId: string): Trainer | undefined => {
  return trainers.find(trainer => trainer.id === trainerId);
};

// Update trainer details
export const updateTrainer = (trainerId: string, updatedData: Partial<Trainer>): Trainer | undefined => {
  const trainerIndex = trainers.findIndex(trainer => trainer.id === trainerId);
  
  if (trainerIndex !== -1) {
    trainers[trainerIndex] = { ...trainers[trainerIndex], ...updatedData };
    return trainers[trainerIndex];
  }
  
  return undefined;
};

// Get a college by ID
export const getCollegeById = (collegeId: string): College | undefined => {
  return colleges.find(college => college.id === collegeId);
};
