import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MaterialsView from './components/Materialsview';
import DiagnosticQuizView from './components/DiagnosticQuiz';
import StudyCalendarView from './components/StudyCalendar';
import Register from './components/Register';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const [exams, setExams] = useState([
    { id: 1, code: 'CS301', name: 'Data Structures', date: '2026-05-24', confidence: 42, status: 'In progress', material: 'PDF • 24 pages' },
    { id: 2, code: 'MA202', name: 'Linear Algebra', date: '2026-05-28', confidence: 68, status: 'In progress', material: 'Lecture notes' },
    { id: 3, code: 'PH104', name: 'Modern Physics', date: '2026-06-02', confidence: 76, status: 'Mastered', material: 'PDF • 24 pages' },
    { id: 4, code: 'CS301', name: 'Dynamic Programming', date: '2026-05-25', confidence: 30, status: 'Review', material: 'Lecture notes' }
  ]);

  const [studyTasks, setStudyTasks] = useState([
    { id: 1, date: '2026-05-18', time: '9:00 • 60 MIN', title: 'Graph traversal', course: 'CS301', priority: 'high' },
    { id: 2, date: '2026-05-18', time: '14:00 • 45 MIN', title: 'Vector spaces', course: 'MA202', priority: 'normal' },
    { id: 3, date: '2026-05-19', time: '10:00 • 60 MIN', title: 'Dynamic programming', course: 'CS301', priority: 'high' },
    { id: 4, date: '2026-05-19', time: '16:00 • 45 MIN', title: 'Quantum states', course: 'PH104', priority: 'normal' },
    { id: 5, date: '2026-05-20', time: '9:30 • 60 MIN', title: 'Practice quiz', course: 'CS301', priority: 'normal' },
    { id: 6, date: '2026-05-21', time: '11:00 • 60 MIN', title: 'Weak topics review', course: 'CS301', priority: 'high' },
  ]);

  const handleAddMaterial = (newMaterial) => {
    setExams((prev) => [...prev, newMaterial]);
  };

  const handleUpdateConfidence = (id, newConfidence) => {
    setExams((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, confidence: newConfidence } : ex))
    );
  };

  const handleAddTask = (newTask) => {
    setStudyTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    setStudyTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-wrapper">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="content-body">
          {currentView === 'dashboard' && (
            <Dashboard 
              exams={exams} 
              setCurrentView={setCurrentView} 
            />
          )}
          {currentView === 'materials' && (
            <MaterialsView 
              exams={exams} 
              onAddMaterial={handleAddMaterial} 
              onUpdateConfidence={handleUpdateConfidence} 
            />
          )}
          {currentView === 'quiz' && (
            <DiagnosticQuizView 
              exams={exams} 
              onCompleteQuiz={(updatedExams) => setExams(updatedExams)}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === 'calendar' && (
            <StudyCalendarView 
              studyTasks={studyTasks} 
              onAddTask={handleAddTask} 
              onDeleteTask={handleDeleteTask} 
            />
          )}
        </main>
      </div>
    </div>
  );
}