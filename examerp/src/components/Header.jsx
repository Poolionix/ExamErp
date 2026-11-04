import React from 'react';
import './Header.css';

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-subtitle">
        BSc Computer Science • Semester 4
      </div>
      <div className="header-right">
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="theme-toggle-btn"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div className="header-user">
          <div className="user-details">
            <div className="user-name">Alex Morgan</div>
            <div className="user-role">Student</div>
          </div>
          <div className="user-avatar">AM</div>
        </div>
      </div>
    </header>
  );
}