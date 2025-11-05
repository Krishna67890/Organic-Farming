import React from 'react';
import { FaBoxOpen, FaSearch, FaSeedling, FaFrown } from 'react-icons/fa';
import './EmptyState.css';

const EmptyState = ({ 
  title = "No items found", 
  message = "There's nothing to display here yet.", 
  icon = "box",
  action = null 
}) => {
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
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-message">{message}</p>
        {action && (
          <div className="empty-state-action">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;