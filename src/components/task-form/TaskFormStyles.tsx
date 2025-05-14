
import React from 'react';

export const TaskFormStyles: React.FC = () => {
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
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }
      
      .task-form-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      
      .task-form-container {
        background-color: white;
        border-radius: var(--border-radius);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .task-form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--gray-medium);
      }
      
      .task-form-header h2 {
        margin: 0;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      
      .close-btn:hover {
        background-color: var(--gray-light);
      }
      
      form {
        padding: var(--spacing-md);
      }
      
      .form-group {
        margin-bottom: var(--spacing-md);
      }
      
      label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 500;
      }
      
      input, select, textarea {
        width: 100%;
        padding: var(--spacing-sm);
        border: 1px solid var(--gray-medium);
        border-radius: var(--border-radius);
        font-size: 1rem;
      }
      
      textarea {
        min-height: 100px;
        resize: vertical;
      }
      
      .form-section {
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid var(--gray-light);
      }
      
      .form-section-title {
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: var(--spacing-md);
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
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
      }
      
      @media (max-width: 768px) {
        .radio-group {
          flex-direction: column;
          gap: var(--spacing-sm);
        }
      }
    `}</style>
  );
};
