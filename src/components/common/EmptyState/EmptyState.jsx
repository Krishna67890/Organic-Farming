// src/components/common/EmptyState/EmptyState.jsx
import React from 'react';
import { FaBoxOpen, FaSearch, FaSeedling, FaFrown } from 'react-icons/fa';
import './EmptyState.css';

const EmptyState = ({ 
  title = "No items found", 
  message = "There's nothing to display here yet.", 
  icon = "box",
  action = null 
}) => {
  // SAFETY CHECKS - Prevent object rendering errors
  const safeTitle = typeof title === 'string' ? title : "No items found";
  const safeMessage = typeof message === 'string' ? message : "There's nothing to display here yet.";
  
  // SAFE ACTION HANDLING - Fix the object rendering issue
  const renderAction = () => {
    if (!action) return null;
    
    // If action is a React element, render it directly
    if (React.isValidElement(action)) {
      return <div className="empty-state-action">{action}</div>;
    }
    
    // If action is an object with label and onClick
    if (action && typeof action === 'object' && action.label) {
      return (
        <button 
          className="empty-state-action"
          onClick={action.onClick}
        >
          {action.label} {/* ✅ This renders the string, not the object */}
        </button>
      );
    }
    
    // If action is a string (fallback)
    if (typeof action === 'string') {
      return <div className="empty-state-action">{action}</div>;
    }
    
    // If it's some other object, don't render it
    console.warn('EmptyState: Invalid action prop received:', action);
    return null;
  };

  const getIcon = () => {
    switch (icon) {
      case 'search':
        return <FaSearch className="empty-state-icon" />;
      case 'seedling':
        return <FaSeedling className="empty-state-icon" />;
      case 'sad':
        return <FaFrown className="empty-state-icon" />;
      case 'box':
      default:
        return <FaBoxOpen className="empty-state-icon" />;
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state-content">
        {getIcon()}
        <h3 className="empty-state-title">{safeTitle}</h3>
        <p className="empty-state-message">{safeMessage}</p>
        {renderAction()}
      </div>
    </div>
  );
};

export default EmptyState;