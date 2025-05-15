
import { Trainer, College, Task, UserCredentials } from '../types';

// Mock trainer data based on the provided list and spreadsheet
export const trainers: Trainer[] = [
  {
    id: 'neo10172',
    name: 'Aravindhan S',
    email: 'aravindhan.s@iamneo.ai',
    phone: '6381466026',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo/c/10301',
    name: 'Bindhiya J',
    email: 'bindhiya.j@iamneo.ai',
    phone: '8925702124',
    specialization: ['Parul - C++', 'DSA'],
    availability: false,
    position: 'TA',
    allocations: {
      '2025-04-01': { task: 'Parul - C++, DSA', role: 'TA' },
      '2025-04-02': { task: 'Parul - C++', role: 'TA' }
    }
  },
  {
    id: 'neo10370',
    name: 'Denis Anto Bosco J',
    email: 'denisanto.bosco@iamneo.ai',
    phone: '6381035379',
    specialization: ['Parul - C++', 'DSA'],
    availability: false,
    position: 'Trainer',
    allocations: {
      '2025-04-01': { task: 'Parul - C++, DSA', role: 'Trainer' },
      '2025-04-02': { task: 'Parul - C++', role: 'Trainer' }
    }
  },
  {
    id: 'neo10377',
    name: 'Devisri Shanmugam',
    email: 'devisri.s@iamneo.ai',
    phone: '9629984527',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo10390',
    name: 'Gokulnath S',
    email: 'gokulnath.s@iamneo.ai',
    phone: '8073844150',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo10265',
    name: 'Karan Dharmalingam',
    email: 'karan@iamneo.ai',
    phone: '8248086234',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo10367',
    name: 'Mohammad Abrar',
    email: 'mohammad.abrar@iamneo.ai',
    phone: '8220741428',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo/c/10278',
    name: 'Ramachandramoorthy K B',
    email: 'machandra.moorthy@iamneo.ai',
    phone: '9487057895',
    specialization: ['Parul - C++', 'DSA'],
    availability: false,
    position: 'TA',
    allocations: {
      '2025-04-01': { task: 'Parul - C++, DSA', role: 'TA' },
      '2025-04-02': { task: 'Parul - C++', role: 'TA' }
    }
  },
  {
    id: 'neo10335',
    name: 'Salman Khan',
    email: 'salmankhan@iamneo.ai',
    phone: '9344366702',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  },
  {
    id: 'neo10376',
    name: 'Surya K',
    email: 'surya.k@iamneo.ai',
    phone: '8220924040',
    specialization: [],
    availability: true,
    position: '',
    allocations: {
      '2025-04-01': { task: 'Not alloted', role: 'Not alloted' },
      '2025-04-02': { task: 'Not alloted', role: 'Not alloted' }
    }
  }
];

// Helper functions
function getExpertiseBasedOnSpecialization(specializations: string[], type: 'language' | 'cloud') {
  if (type === 'language') {
    if (specializations.includes('React')) return 'JavaScript, TypeScript, React';
    if (specializations.includes('Java')) return 'Java, Spring Boot';
    if (specializations.includes('Python')) return 'Python, Django';
    if (specializations.includes('DSA')) return 'C++, Java';
    if (specializations.includes('Parul - C++')) return 'C++';
    return 'JavaScript, Java, Python';
  }
  
  return 'AWS, Azure';
}

function getRandomSpecializations() {
  const specializations = ['React', 'DSA', 'SDET', 'JavaScript', 'Python', 'Java', 'DevOps'];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 specializations
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * specializations.length);
    if (!result.includes(specializations[index])) {
      result.push(specializations[index]);
    }
  }
  
  return result;
}

// Mock college data
export const colleges: College[] = [
  { id: 'C1', name: 'Tech Institute', location: 'New York', contact: '555-123-4567' },
  { id: 'C2', name: 'Engineering College', location: 'San Francisco', contact: '555-987-6543' },
  { id: 'C3', name: 'Data Science Academy', location: 'Boston', contact: '555-246-8101' },
  { id: 'C4', name: 'Computer Science University', location: 'Austin', contact: '555-369-1478' },
  { id: 'C5', name: 'Developer Training Center', location: 'Seattle', contact: '555-789-4561' },
  { id: 'C6', name: 'Sree Krishna College of Technology', location: 'Chennai', contact: '555-111-2222' },
  { id: 'C7', name: 'Parul University', location: 'Gujarat', contact: '555-222-3333' },
];

// Generate tasks based on the trainer allocations
export const initialTasks: Task[] = [
  // Generate tasks for April 1, 2025
  {
    id: 'task-20250401-1',
    trainerId: 'neo10370',
    type: 'training',
    title: 'Parul - C++, DSA',
    description: 'Training on C++ and DSA concepts',
    startDate: '2025-04-01',
    endDate: '2025-04-01',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++, DSA',
    status: 'pending',
    trainerRole: 'trainer',
  },
  {
    id: 'task-20250401-2',
    trainerId: 'neo/c/10301',
    type: 'training',
    title: 'Parul - C++, DSA',
    description: 'Assisting with C++ and DSA training',
    startDate: '2025-04-01',
    endDate: '2025-04-01',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++, DSA',
    status: 'pending',
    trainerRole: 'ta',
  },
  {
    id: 'task-20250401-3',
    trainerId: 'neo/c/10278',
    type: 'training',
    title: 'Parul - C++, DSA',
    description: 'Assisting with C++ and DSA training',
    startDate: '2025-04-01',
    endDate: '2025-04-01',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++, DSA',
    status: 'pending',
    trainerRole: 'ta',
  },

  // Generate tasks for April 2, 2025
  {
    id: 'task-20250402-1',
    trainerId: 'neo10370',
    type: 'training',
    title: 'Parul - C++',
    description: 'Training on C++ concepts',
    startDate: '2025-04-02',
    endDate: '2025-04-02',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++',
    status: 'pending',
    trainerRole: 'trainer',
  },
  {
    id: 'task-20250402-2',
    trainerId: 'neo/c/10301',
    type: 'training',
    title: 'Parul - C++',
    description: 'Assisting with C++ training',
    startDate: '2025-04-02',
    endDate: '2025-04-02',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++',
    status: 'pending',
    trainerRole: 'ta',
  },
  {
    id: 'task-20250402-3',
    trainerId: 'neo/c/10278',
    type: 'training',
    title: 'Parul - C++',
    description: 'Assisting with C++ training',
    startDate: '2025-04-02',
    endDate: '2025-04-02',
    startTime: '09:00',
    endTime: '17:00',
    collegeId: 'C7',
    course: 'C++',
    status: 'pending',
    trainerRole: 'ta',
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
