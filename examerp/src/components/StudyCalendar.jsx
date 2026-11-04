import React, { useState } from 'react';
import './StudyCalendar.css';

export default function StudyCalendarView({ studyTasks, onAddTask, onDeleteTask }) {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('2026-05-18'); // Set to a Monday
  
  // Form state for adding tasks
  const [taskDate, setTaskDate] = useState('2026-05-18');
  const [time, setTime] = useState('10:00 • 60 MIN');
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS301');
  const [priority, setPriority] = useState('normal');

  // Generate 7 days dynamically for a full week view
  const generateWeekDays = (baseDateStr) => {
    const base = new Date(baseDateStr);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(base);
      current.setDate(base.getDate() + i);
      const label = current.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }).toUpperCase();
      const isoString = current.toISOString().split('T')[0];
      days.push({ label, iso: isoString });
    }
    return days;
  };

  const currentWeekDays = generateWeekDays(startDate);

  const shiftWeek = (weeksCount) => {
    const current = new Date(startDate);
    current.setDate(current.getDate() + (weeksCount * 7));
    setStartDate(current.toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      date: taskDate,
      time,
      title,
      course,
      priority
    });

    setTitle('');
    setShowModal(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          <span className="section-tag">SMART STUDY PLAN</span>
          <h2>Your 7-Day Priority Calendar</h2>
          <p>Organize your weekly schedule across all 7 days.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setShowModal(true)} className="btn-primary">+ Add study block</button>
          <button onClick={() => alert("Calendar schedule exported!")} className="btn-outline">📥 Export</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="card modal-box">
            <h3>Schedule Study Block</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Select Date:
                <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required />
              </label>
              <label>
                Time & Duration:
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 15:00 • 45 MIN" required />
              </label>
              <label>
                Topic / Task Name:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Binary Trees Review" required />
              </label>
              <label>
                Course:
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="CS301">CS301</option>
                  <option value="MA202">MA202</option>
                  <option value="PH104">PH104</option>
                </select>
              </label>
              <label>
                Priority Level:
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="normal">Normal (Study Block)</option>
                  <option value="high">High Priority</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card calendar-nav-bar">
        <div className="date-controls">
          <button onClick={() => shiftWeek(-1)} className="nav-arrow">‹ Prev Week</button>
          <span className="date-range">
            Week of: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 'bold', cursor: 'pointer' }} />
          </span>
          <button onClick={() => shiftWeek(1)} className="nav-arrow">Next Week ›</button>
        </div>
        <div className="calendar-legend">
          <span><span className="dot dot-high"></span> High priority</span>
          <span><span className="dot dot-normal"></span> Study block</span>
        </div>
      </div>

      {/* 7-Column Grid Layout */}
      <div className="calendar-grid-7">
        {currentWeekDays.map((d) => {
          const dayTasks = studyTasks.filter(t => t.date === d.iso);
          return (
            <div key={d.iso} className="day-column">
              <div className="day-header">{d.label}</div>
              {dayTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`event-card ${task.priority === 'high' ? 'event-high' : 'event-normal'}`}
                  style={{ position: 'relative' }}
                >
                  <button 
                    onClick={() => onDeleteTask(task.id)} 
                    title="Remove task"
                    style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    ✕
                  </button>
                  <span className="event-time">{task.time}</span>
                  <h5>{task.title}</h5>
                  <span className="event-course">{task.course}</span>
                </div>
              ))}
              {dayTasks.length === 0 && (
                <div style={{ fontSize: '0.70rem', color: '#cbd5e1', textAlign: 'center', padding: '1rem 0' }}>No tasks</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}