
import { CalendarEvent, Task } from '../types';
import { addTask } from '../services/data';
import * as XLSX from 'xlsx';

export const importEventsFromJSON = (jsonData: string): { success: boolean; message: string; events?: CalendarEvent[] } => {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate the imported data structure
    if (!Array.isArray(data)) {
      return { success: false, message: 'Invalid JSON format. Expected an array of events.' };
    }
    
    // Basic validation of each event
    for (const event of data) {
      if (!event.trainerId || !event.title || !event.startDate || !event.endDate || !event.type) {
        return { 
          success: false, 
          message: 'Invalid event format. Each event must have trainerId, title, startDate, endDate, and type.'
        };
      }
    }
    
    return { success: true, message: `Successfully imported ${data.length} events.`, events: data };
  } catch (error) {
    return { success: false, message: `Error parsing JSON: ${error instanceof Error ? error.message : String(error)}` };
  }
};

export const importEventsFromExcel = (file: File): Promise<{ success: boolean; message: string; events?: Task[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          resolve({ success: false, message: 'No data found in the file.' });
          return;
        }
        
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map Excel columns to our Task format
        const events: Task[] = jsonData.map((row: any) => {
          return {
            id: `task${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            trainerId: row.TrainerID || '',
            title: row.Task || '',
            type: (row.TaskType || '').toLowerCase() === 'training' ? 'training' : 'non-training',
            startDate: row.Date || '',
            endDate: row.Date || '',  // Default to same day if not specified
            status: (row.Status || '').toLowerCase() as any,
            trainerRole: (row.Role || '').toLowerCase() === 'ta' ? 'ta' : 'trainer',
            collegeId: row.ClientID || undefined,
            description: row.Description || '',
          };
        });
        
        // Validate the imported data
        if (events.some(event => !event.trainerId || !event.title || !event.startDate || !event.endDate)) {
          resolve({ 
            success: false, 
            message: 'Invalid Excel format. Required columns: TrainerID, Task, Date'
          });
          return;
        }
        
        resolve({ success: true, message: `Successfully imported ${events.length} events.`, events });
      } catch (error) {
        resolve({ success: false, message: `Error parsing Excel: ${error instanceof Error ? error.message : String(error)}` });
      }
    };
    
    reader.onerror = () => {
      resolve({ success: false, message: 'Error reading the file.' });
    };
    
    reader.readAsBinaryString(file);
  });
};

export const processImportedEvents = (events: Task[]): Task[] => {
  // Add events to the system and return the created events
  return events.map(event => addTask(event));
};
