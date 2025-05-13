
import React, { useState } from 'react';
import { Trainer } from '../types';
import { updateTrainer } from '../services/data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TrainerProfileProps {
  trainer: Trainer;
  onClose: () => void;
  isAdmin?: boolean;
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ 
  trainer, 
  onClose, 
  isAdmin = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...trainer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      areaOfExpertise: {
        ...prev.areaOfExpertise,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    updateTrainer(trainer.id, formData);
    setIsEditing(false);
  };

  const downloadPdf = () => {
    const profileElement = document.getElementById('trainer-profile-content');
    
    if (profileElement) {
      html2canvas(profileElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${trainer.name}_Profile.pdf`);
      });
    }
  };

  return (
    <div className="trainer-profile-overlay">
      <div className="trainer-profile-container">
        <div className="trainer-profile-header">
          <h2>Trainer Profile</h2>
          <div className="trainer-profile-actions">
            {isAdmin && (
              <>
                {isEditing ? (
                  <button className="btn-secondary" onClick={handleSave}>Save Changes</button>
                ) : (
                  <button className="btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
                <button className="btn-primary" onClick={downloadPdf}>Download PDF</button>
              </>
            )}
            <button className="btn-outline" onClick={onClose}>Close</button>
          </div>
        </div>
        
        <div className="trainer-profile-content" id="trainer-profile-content">
          <div className="trainer-profile-section profile-header">
            <div className="trainer-avatar">
              {trainer.name.charAt(0)}
            </div>
            <div className="trainer-header-info">
              {isEditing ? (
                <>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="edit-input"
                  />
                  <input 
                    type="text" 
                    name="education" 
                    value={formData.education || ''} 
                    onChange={handleChange} 
                    className="edit-input"
                  />
                </>
              ) : (
                <>
                  <h3>{trainer.name}</h3>
                  <p className="trainer-education">{trainer.education}</p>
                  <p className="trainer-position">{trainer.position}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="trainer-profile-section">
            <h4>Contact Information</h4>
            <div className="profile-info-group">
              <div className="info-label">ID:</div>
              <div className="info-value">{trainer.id}</div>
            </div>
            <div className="profile-info-group">
              <div className="info-label">Email:</div>
              <div className="info-value">
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="edit-input"
                  />
                ) : trainer.email}
              </div>
            </div>
            <div className="profile-info-group">
              <div className="info-label">Phone:</div>
              <div className="info-value">
                {isEditing ? (
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="edit-input"
                  />
                ) : trainer.phone}
              </div>
            </div>
          </div>
          
          <div className="trainer-profile-section">
            <h4>Area of Expertise</h4>
            <div className="profile-info-group">
              <div className="info-label">Programming Languages:</div>
              <div className="info-value">
                {isEditing ? (
                  <input 
                    type="text" 
                    name="programmingLanguages" 
                    value={formData.areaOfExpertise?.programmingLanguages || ''}
                    onChange={handleExpertiseChange} 
                    className="edit-input"
                  />
                ) : trainer.areaOfExpertise?.programmingLanguages}
              </div>
            </div>
            <div className="profile-info-group">
              <div className="info-label">Problem Solving:</div>
              <div className="info-value">
                {isEditing ? (
                  <input 
                    type="text" 
                    name="problemSolving" 
                    value={formData.areaOfExpertise?.problemSolving || ''} 
                    onChange={handleExpertiseChange} 
                    className="edit-input"
                  />
                ) : trainer.areaOfExpertise?.problemSolving}
              </div>
            </div>
            <div className="profile-info-group">
              <div className="info-label">Cloud Technologies:</div>
              <div className="info-value">
                {isEditing ? (
                  <input 
                    type="text" 
                    name="cloudTechnologies" 
                    value={formData.areaOfExpertise?.cloudTechnologies || ''} 
                    onChange={handleExpertiseChange} 
                    className="edit-input"
                  />
                ) : trainer.areaOfExpertise?.cloudTechnologies}
              </div>
            </div>
            <div className="profile-info-group">
              <div className="info-label">Specializations:</div>
              <div className="info-value">
                <div className="specialization-tags">
                  {trainer.specialization.map(spec => (
                    <span key={spec} className="specialization-tag">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="trainer-profile-section">
            <h4>Work Experience</h4>
            {trainer.workExperience?.map((exp, index) => (
              <div key={index} className="work-experience-item">
                <div className="experience-position">{exp.position}</div>
                <div className="experience-company">{exp.company}</div>
                <div className="experience-duration">{exp.duration}</div>
              </div>
            ))}
          </div>
          
          <div className="trainer-profile-section">
            <h4>Professional Summary</h4>
            <div className="profile-bio">
              {isEditing ? (
                <textarea 
                  name="bio" 
                  value={formData.bio || ''} 
                  onChange={handleChange} 
                  className="edit-textarea"
                />
              ) : trainer.bio}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .trainer-profile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: var(--spacing-md);
          overflow-y: auto;
        }
        
        .trainer-profile-container {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          width: 850px;
          max-width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0;
        }
        
        .trainer-profile-header {
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--gray-medium);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 10;
        }
        
        .trainer-profile-header h2 {
          margin: 0;
        }
        
        .trainer-profile-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .trainer-profile-content {
          padding: var(--spacing-md);
        }
        
        .trainer-profile-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .trainer-profile-section h4 {
          color: var(--primary);
          border-bottom: 1px solid var(--gray-medium);
          padding-bottom: var(--spacing-xs);
          margin-bottom: var(--spacing-md);
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .trainer-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
        }
        
        .trainer-header-info h3 {
          margin: 0;
          margin-bottom: var(--spacing-xs);
          font-size: 1.8rem;
        }
        
        .trainer-education {
          color: var(--gray-dark);
          font-size: 0.9rem;
        }
        
        .trainer-position {
          font-weight: 500;
          font-size: 1.1rem;
          margin-top: var(--spacing-xs);
        }
        
        .profile-info-group {
          display: flex;
          margin-bottom: var(--spacing-sm);
        }
        
        .info-label {
          width: 180px;
          font-weight: 500;
          color: var(--text-dark);
        }
        
        .info-value {
          flex: 1;
        }
        
        .specialization-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
        
        .specialization-tag {
          background-color: var(--primary-light);
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        
        .work-experience-item {
          margin-bottom: var(--spacing-md);
        }
        
        .experience-position {
          font-weight: 500;
        }
        
        .experience-company {
          font-size: 0.9rem;
        }
        
        .experience-duration {
          font-size: 0.85rem;
          color: var(--gray-dark);
          margin-top: 2px;
        }
        
        .profile-bio {
          line-height: 1.5;
        }
        
        .edit-input {
          width: 100%;
          padding: var(--spacing-xs) var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
        }
        
        .edit-textarea {
          width: 100%;
          min-height: 100px;
          padding: var(--spacing-xs) var(--spacing-sm);
        }
      `}</style>
    </div>
  );
};

export default TrainerProfile;
