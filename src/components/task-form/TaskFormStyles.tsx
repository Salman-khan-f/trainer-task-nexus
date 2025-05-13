
import React from 'react';

const TaskFormStyles: React.FC = () => {
  return (
    <style>{`
      .task-form-overlay {
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
      }
      
      .task-form-container {
        background-color: white;
        padding: var(--spacing-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .form-group {
        margin-bottom: var(--spacing-md);
      }
      
      .form-group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 500;
      }
      
      .form-row {
        display: flex;
        gap: var(--spacing-md);
      }
      
      .form-row .form-group {
        flex: 1;
      }
      
      .radio-group {
        display: flex;
        gap: var(--spacing-md);
      }
      
      .radio-group label {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-weight: normal;
      }
      
      .radio-group input {
        width: auto;
        margin: 0;
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
      }
    `}</style>
  );
};

export default TaskFormStyles;
