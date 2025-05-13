
import React from 'react';
import { College } from '../../types';

interface TrainingFieldsProps {
  collegeId: string;
  course: string;
  onCollegeChange: (collegeId: string) => void;
  onCourseChange: (course: string) => void;
  colleges: College[];
}

const TrainingFields: React.FC<TrainingFieldsProps> = ({
  collegeId,
  course,
  onCollegeChange,
  onCourseChange,
  colleges
}) => {
  return (
    <>
      <div className="form-group">
        <label>College/Location</label>
        <select
          value={collegeId}
          onChange={(e) => onCollegeChange(e.target.value)}
          required
        >
          <option value="">-- Select College --</option>
          {colleges.map(college => (
            <option key={college.id} value={college.id}>
              {college.name} ({college.location})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Course</label>
        <select
          value={course}
          onChange={(e) => onCourseChange(e.target.value)}
          required
        >
          <option value="">-- Select Course --</option>
          <option value="React">React</option>
          <option value="DSA">DSA</option>
          <option value="SDET">SDET</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
    </>
  );
};

export default TrainingFields;
