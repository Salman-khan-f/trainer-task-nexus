export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  availability: boolean;
  education?: string;
  position?: string;
  areaOfExpertise?: {
    programmingLanguages?: string;
    problemSolving?: string;
    cloudTechnologies?: string;
  };
  workExperience?: Array<{
    position: string;
    company: string;
    duration: string;
  }>;
  bio?: string;
  profileImage?: string;
  allocations?: {
    [date: string]: {
      task: string;
      role: string;
    };
  };
}

export interface College {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export type TaskType = 'training' | 'non-training';
export type TrainerRole = 'trainer' | 'ta'; // New type for trainer role

export interface Task {
  id: string;
  trainerId: string;
  type: TaskType;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  collegeId?: string;
  course?: string;
  status: 'pending' | 'in-progress' | 'completed';
  trainerRole?: TrainerRole; // New field for trainer role
}

export interface CalendarEvent extends Task {
  trainerName: string;
  collegeName?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
  role: 'superadmin' | 'trainer';
  trainerId?: string;
}

export interface TrainerAssignment {
  trainer: Trainer;
  task: Task;
  location?: string;
}
