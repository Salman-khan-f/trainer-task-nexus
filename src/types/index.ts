
export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  availability: boolean;
}

export interface College {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export type TaskType = 'training' | 'non-training';

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
}

export interface CalendarEvent extends Task {
  trainerName: string;
  collegeName?: string;
}
