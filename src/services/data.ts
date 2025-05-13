import { Trainer, College, Task, UserCredentials } from '../types';

// Mock trainer data (as if imported from Excel) with enhanced details
export const trainers: Trainer[] = Array.from({ length: 50 }, (_, i) => {
  const id = `Neo${i + 1}`;
  const specializations = getRandomSpecializations();
  
  return {
    id,
    name: `Trainer ${i + 1}`,
    email: `trainer${i + 1}@example.com`,
    phone: `555-000-${1000 + i}`,
    specialization: specializations,
    availability: Math.random() > 0.2, // 80% are available
    education: Math.random() > 0.5 ? "B.E Computer Science Engineering" : "M.Sc Computer Science",
    position: "Technical Trainer",
    areaOfExpertise: {
      programmingLanguages: getExpertiseBasedOnSpecialization(specializations, 'language'),
      problemSolving: Math.random() > 0.5 ? "Data Structures and Algorithms" : "System Design",
      cloudTechnologies: Math.random() > 0.5 ? "AWS Cloud Architect" : "Azure Cloud Services"
    },
    workExperience: [
      {
        position: "Technical Trainer",
        company: "iamneo",
        duration: "August 2023 - Present"
      },
      {
        position: "Career Development Coach",
        company: "ETHNUS Consultancy",
        duration: "June 2022 - June 2023"
      }
    ],
    bio: `Dedicated Career Development Coach and Technical Trainer with a strong technical foundation in ${specializations.join(', ')}. Experienced in guiding and mentoring college students and early-career professionals.`
  };
});

function getExpertiseBasedOnSpecialization(specializations: string[], type: 'language' | 'cloud') {
  if (type === 'language') {
    if (specializations.includes('React')) return 'JavaScript, TypeScript, React';
    if (specializations.includes('Java')) return 'Java, Spring Boot';
    if (specializations.includes('Python')) return 'Python, Django';
    if (specializations.includes('DSA')) return 'C++, Java';
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
    role: 'trainer',
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
