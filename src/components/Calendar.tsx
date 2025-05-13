
import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first day of the month
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  // Get the last day of the month
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  // Get the day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = firstDay.getDay();
  // Total days in month
  const daysInMonth = lastDay.getDate();

  // Function to navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Function to navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

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
                  <span className="event-trainer">{event.trainerName}</span>
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
        <h2>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h2>
        <button className="btn-outline" onClick={nextMonth}>Next &gt;</button>
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
      `}</style>
    </div>
  );
};

export default Calendar;
