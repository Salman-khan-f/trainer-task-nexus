
import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, isBefore } from 'date-fns';
import { Calendar as ShadcnCalendar } from './ui/calendar';
import { Button } from './ui/button';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from '../hooks/use-toast';
import { getTrainerById, getCollegeById } from '../services/data';
import { CalendarEvent } from '../types';
import { Radio, RadioGroup } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronDown } from 'lucide-react';

interface CalendarDownloadOptionsProps {
  events: CalendarEvent[];
}

const CalendarDownloadOptions: React.FC<CalendarDownloadOptionsProps> = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedTab, setSelectedTab] = useState('quick');
  const [selectedOption, setSelectedOption] = useState('current-week');
  const [isDownloading, setIsDownloading] = useState(false);

  // Get current date
  const currentDate = new Date();
  
  // Define quick selection ranges
  const quickRanges = {
    'current-day': {
      from: currentDate,
      to: currentDate,
      label: 'Today'
    },
    'current-week': {
      from: startOfWeek(currentDate, { weekStartsOn: 0 }),
      to: endOfWeek(currentDate, { weekStartsOn: 0 }),
      label: 'Current Week'
    },
    'next-week': {
      from: startOfWeek(addDays(currentDate, 7), { weekStartsOn: 0 }),
      to: endOfWeek(addDays(currentDate, 7), { weekStartsOn: 0 }),
      label: 'Next Week'
    },
    'current-month': {
      from: startOfMonth(currentDate),
      to: endOfMonth(currentDate),
      label: 'Current Month'
    },
    'next-month': {
      from: startOfMonth(addDays(endOfMonth(currentDate), 1)),
      to: endOfMonth(addDays(endOfMonth(currentDate), 1)),
      label: 'Next Month'
    }
  };

  // Handle quick selection change
  const handleQuickSelectionChange = (value: string) => {
    setSelectedOption(value);
    const range = quickRanges[value as keyof typeof quickRanges];
    setDateRange({
      from: range.from,
      to: range.to
    });
  };

  // Generate and download CSV
  const generateCSV = () => {
    if (!dateRange?.from) {
      toast({
        title: "Date Range Required",
        description: "Please select a date range before downloading.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const startDate = dateRange.from;
      const endDate = dateRange.to || startDate;
      
      // Headers for CSV
      let csvContent = "Date,EmployeeID,Trainer Name,Email,Phone,Task,Task Type,Role,Client/College,Status\n";
      
      // Create a date range array
      const dateRangeArray: Date[] = [];
      let currentIterationDate = new Date(startDate);
      
      while (currentIterationDate <= endDate) {
        dateRangeArray.push(new Date(currentIterationDate));
        currentIterationDate.setDate(currentIterationDate.getDate() + 1);
      }
      
      // For each date, add row for each event
      dateRangeArray.forEach(date => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const dateEvents = events.filter(event => {
          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);
          return date >= eventStart && date <= eventEnd;
        });
        
        if (dateEvents.length > 0) {
          dateEvents.forEach(event => {
            const trainer = getTrainerById(event.trainerId);
            const college = event.collegeId ? getCollegeById(event.collegeId) : undefined;
            const formattedDate = format(date, 'yyyy-MM-dd');
            
            csvContent += `${formattedDate},${trainer?.id || ''},${trainer?.name || ''},"${trainer?.email || ''}","${trainer?.phone || ''}",${event.title},${event.type},${event.trainerRole || 'trainer'},${college?.name || ''},${event.status}\n`;
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
      link.setAttribute("download", `calendar_${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Complete",
        description: `Calendar data exported for ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}`,
      });
      
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Export Calendar <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Export Calendar Data</DialogTitle>
        </DialogHeader>
        
        <Tabs 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Selection</TabsTrigger>
            <TabsTrigger value="custom">Custom Dates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="mt-4 space-y-4">
            <RadioGroup 
              value={selectedOption} 
              onValueChange={handleQuickSelectionChange}
              className="flex flex-col space-y-3"
            >
              {Object.entries(quickRanges).map(([key, range]) => (
                <div className="flex items-center space-x-2" key={key}>
                  <Radio id={key} value={key} />
                  <Label htmlFor={key} className="text-sm">
                    {range.label} ({format(range.from, 'MMM d')} - {format(range.to, 'MMM d, yyyy')})
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              onClick={generateCSV}
              disabled={isDownloading || !dateRange?.from}
              className="w-full mt-4"
            >
              {isDownloading ? 'Generating...' : 'Download CSV'}
            </Button>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4 space-y-4">
            <div className="date-range-selector flex justify-center">
              <ShadcnCalendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="pointer-events-auto"
                disabled={(date) => isBefore(date, new Date('2023-01-01'))}
              />
            </div>
            
            <div className="text-sm text-center text-gray-500 mt-2">
              {dateRange?.from ? (
                <>
                  Selected: <strong>{format(dateRange.from, 'PPP')}</strong>
                  {dateRange.to && dateRange.to.getTime() !== dateRange.from.getTime() && (
                    <> to <strong>{format(dateRange.to, 'PPP')}</strong></>
                  )}
                </>
              ) : (
                'Select a date range to download'
              )}
            </div>
            
            <Button 
              onClick={generateCSV}
              disabled={isDownloading || !dateRange?.from}
              className="w-full mt-4"
            >
              {isDownloading ? 'Generating...' : 'Download CSV'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDownloadOptions;
