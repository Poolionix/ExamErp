import React from 'react';
import './Dashboard.css';

export default function Dashboard({ setCurrentView }) {
  return (
    <div className="dashboard-container">
      {/* Title & Action */}
      <div className="dashboard-header">
        <div>
          <div className="date-sub">Tuesday, May 14</div>
          <h2 className="greeting">Good morning, Alex</h2>
          <p className="subtitle">Your exams are getting closer. Let's focus on what matters most.</p>
        </div>
        <button onClick={() => setCurrentView('calendar')} className="btn-primary">
          <span>📅</span> View study plan
        </button>
      </div>

      {/* Next Exam Banner */}
      <div className="card banner-card">
        <div className="banner-left">
          <span className="clock-icon">🕒</span>
          <span className="banner-tag">NEXT EXAM</span>
        </div>
        <div className="banner-details">
          CS301 • Saturday, May 24 • 9:00 AM
        </div>
        <div className="banner-time-units">
          <span>DAYS</span>
          <span>HRS</span>
          <span>MIN</span>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="summary-grid">
        <div className="card readiness-card">
          <div className="readiness-header">
            <div>
              <h3>Overall readiness</h3>
              <p>Across all upcoming exams</p>
            </div>
            <div className="score">62%</div>
          </div>
          <div className="readiness-progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '62%' }}></div>
            </div>
            <div className="progress-labels">
              <span>Needs attention</span>
              <span>Exam ready</span>
            </div>
          </div>
        </div>

        <div className="card alert-card">
          <div className="alert-icon-box">⚠️</div>
          <div className="alert-content">
            <span className="badge badge-warning">HIGH PRIORITY</span>
            <h4>Trees & Graph Traversal</h4>
            <p>Low confidence and likely to appear in CS301.</p>
            <button onClick={() => setCurrentView('quiz')} className="action-link">
              Practice now →
            </button>
          </div>
        </div>
      </div>

      {/* Course Readiness */}
      <div className="courses-section">
        <div className="section-header">
          <h3>Course readiness</h3>
          <button onClick={() => setCurrentView('materials')} className="view-all-btn">
            View all materials
          </button>
        </div>

        <div className="courses-grid">
          <div className="card course-card">
            <div className="course-card-top">
              <span className="badge badge-indigo">CS301</span>
              <span className="course-date">May 24</span>
            </div>
            <h4>Data Structures</h4>
            <div className="course-metric">
              <div className="metric-label">
                <span>Confidence</span>
                <strong>42%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>

          <div className="card course-card">
            <div className="course-card-top">
              <span className="badge badge-indigo">MA202</span>
              <span className="course-date">May 28</span>
            </div>
            <h4>Linear Algebra</h4>
            <div className="course-metric">
              <div className="metric-label">
                <span>Confidence</span>
                <strong>68%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '68%', backgroundColor: '#06b6d4' }}></div>
              </div>
            </div>
          </div>

          <div className="card course-card">
            <div className="course-card-top">
              <span className="badge badge-indigo">PH104</span>
              <span className="course-date">Jun 02</span>
            </div>
            <h4>Modern Physics</h4>
            <div className="course-metric">
              <div className="metric-label">
                <span>Confidence</span>
                <strong>76%</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}