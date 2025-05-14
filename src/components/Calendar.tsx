import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { Calendar as ShadcnCalendar } from './ui/calendar';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { DateRange } from 'react-day-picker';

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick, onEventClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Get the first day of the month
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  // Get the last day of the month
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  // Get the day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = firstDay.getDay();
  // Total days in month
  const daysInMonth = lastDay.getDate();

  // Function to navigate to previous month
  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  // Function to navigate to next month
  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  // Format date to YYYY-MM-DD for comparison with event dates
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Get events for a specific date
  const getEventsForDate = (date: string) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(date);
      
      return currentDate >= eventStart && currentDate <= eventEnd;
    });
  };

  // Determine if a date is today
  const isToday = (date: string) => {
    const today = new Date();
    return formatDate(today.getFullYear(), today.getMonth(), today.getDate()) === date;
  };

  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };

  const generateCSV = () => {
    // Default to current month if no range selected
    const startDate = dateRange?.from || new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endDate = dateRange?.to || new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    if (!startDate) return; // Safety check
    
    // Headers for CSV
    let csvContent = "Date,TrainerID,TrainerName,Email,Phone,Task,TaskType,Role,ClientLocation,Status\n";
    
    // Create a date range array
    const dateRangeArray: Date[] = [];
    let currentIterationDate = new Date(startDate);
    
    while (currentIterationDate <= (endDate || startDate)) {
      dateRangeArray.push(new Date(currentIterationDate));
      currentIterationDate.setDate(currentIterationDate.getDate() + 1);
    }
    
    // For each date, add row for each event
    dateRangeArray.forEach(date => {
      const dateStr = formatDate(date.getFullYear(), date.getMonth(), date.getDate());
      const dateEvents = getEventsForDate(dateStr);
      
      if (dateEvents.length > 0) {
        dateEvents.forEach(event => {
          const trainer = events.find(e => e.id === event.id)?.trainerName || 'Unknown';
          const formattedDate = format(date, 'yyyy-MM-dd');
          
          // Get trainer details - in a real app, you would fetch this from your service
          // For now, we'll just use what we have
          csvContent += `${formattedDate},${event.trainerId},${trainer},"","",${event.title},${event.type},${event.trainerRole || 'trainer'},${event.collegeName || ''},${event.status}\n`;
        });
      } else {
        // Add an empty row for dates with no events
        csvContent += `${format(date, 'yyyy-MM-dd')},"","","","","","","","",""\n`;
      }
    });
    
    // Create download link and trigger download
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `calendar_${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate || startDate, 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset date range after download
    setDateRange(undefined);
    setShowDatePicker(false);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(year, month, day);
      const dateEvents = getEventsForDate(date);
      const hasEvents = dateEvents.length > 0;
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday(date) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => onDateClick(date)}
        >
          <div className="day-number">{day}</div>
          {hasEvents && (
            <div className="events-container">
              {dateEvents.slice(0, 2).map((event, index) => (
                <div 
                  key={index} 
                  className={`event ${event.type === 'training' ? 'training-event' : 'non-training-event'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <span className="event-title">{event.title}</span>
                  <span className="event-trainer">
                    {event.trainerName} 
                    {event.trainerRole ? ` (${event.trainerRole === 'ta' ? 'TA' : 'Trainer'})` : ''}
                  </span>
                </div>
              ))}
              {dateEvents.length > 2 && (
                <div className="more-events">+{dateEvents.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn-outline" onClick={prevMonth}>&lt; Prev</button>
        <h2>{getMonthName(selectedDate.getMonth())} {selectedDate.getFullYear()}</h2>
        <button className="btn-outline" onClick={nextMonth}>Next &gt;</button>
      </div>

      <div className="calendar-toolbar">
        <Button 
          variant="outline" 
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="export-btn"
        >
          {showDatePicker ? 'Cancel' : 'Export Calendar'}
        </Button>
        
        {showDatePicker && (
          <div className="date-picker-container">
            <div className="date-range-selector">
              <ShadcnCalendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="date-picker p-3 pointer-events-auto"
                numberOfMonths={2}
              />
            </div>
            <div className="date-picker-actions">
              <Button 
                variant="default"
                onClick={generateCSV}
                disabled={!dateRange?.from}
                className="download-btn"
              >
                Download CSV
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  // Download current month
                  setDateRange({
                    from: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
                    to: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
                  });
                  setTimeout(generateCSV, 100);
                }}
              >
                Download Current Month
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-days">
        {renderCalendarDays()}
      </div>
      <style>{`
        .calendar-container {
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius);
          overflow: hidden;
          background-color: white;
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background-color: var(--primary);
          color: white;
        }
        
        .calendar-header h2 {
          margin: 0;
        }
        
        .calendar-header button {
          background-color: transparent;
          color: white;
          border: 1px solid white;
        }
        
        .calendar-toolbar {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-sm);
          border-bottom: 1px solid var(--gray-medium);
          position: relative;
        }
        
        .date-picker-container {
          background-color: white;
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-top: var(--spacing-sm);
          padding: var(--spacing-md);
          z-index: 10;
        }
        
        .date-range-selector {
          margin-bottom: var(--spacing-md);
        }
        
        .date-picker-actions {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: var(--primary-light);
          color: white;
          text-align: center;
          font-weight: 500;
        }
        
        .calendar-weekdays div {
          padding: var(--spacing-sm);
        }
        
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: var(--gray-medium);
        }
        
        .calendar-day {
          min-height: 100px;
          background-color: white;
          padding: var(--spacing-xs);
          position: relative;
          cursor: pointer;
        }
        
        .calendar-day.empty {
          background-color: var(--gray-light);
          cursor: default;
        }
        
        .calendar-day:hover:not(.empty) {
          background-color: var(--gray-light);
        }
        
        .day-number {
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }
        
        .calendar-day.today .day-number {
          background-color: var(--primary);
          color: white;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .events-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .event {
          padding: 2px 4px;
          border-radius: 2px;
          font-size: 0.75rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        
        .event:hover {
          opacity: 0.9;
        }
        
        .training-event {
          background-color: var(--info);
          color: white;
        }
        
        .non-training-event {
          background-color: var(--warning);
          color: var(--text-dark);
        }
        
        .event-title {
          font-weight: 500;
          margin-right: 4px;
        }
        
        .event-trainer {
          font-size: 0.7rem;
          opacity: 0.9;
        }
        
        .more-events {
          font-size: 0.7rem;
          text-align: center;
          color: var(--primary);
        }

        .export-btn {
          align-self: flex-end;
        }
        
        .download-btn {
          background-color: #4CAF50;
          color: white;
        }

        @media (max-width: 768px) {
          .date-picker-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
