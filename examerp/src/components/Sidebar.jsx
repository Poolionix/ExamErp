import React from 'react';
import './Sidebar.css';

export default function Sidebar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'materials', label: 'Materials & Topics', icon: '📖' },
    { id: 'quiz', label: 'Diagnostic Quiz', icon: '❓' },
    { id: 'calendar', label: 'Study Calendar', icon: '📅' }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="brand-logo">E</div>
          <div className="brand-info">
            <h2>ExamErp</h2>
            <span>STUDENT WORKSPACE</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`nav-button ${currentView === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="weekly-goal-card">
        <div className="goal-header">WEEKLY GOAL</div>
        <div className="goal-title">8.5 of 12 hours</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: '70%' }}></div>
        </div>
      </div>
    </aside>
  );
}