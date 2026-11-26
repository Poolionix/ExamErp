import React, { useState } from 'react';
import './Login.css';

export default function Login({ isDarkMode, onToggleTheme, onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="auth-left-panel">
        <div className="auth-brand-header">
          <div className="auth-logo-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <div className="auth-brand-text">
            <span className="auth-brand-title">ExamErp</span>
            <span className="auth-brand-subtitle">STUDENT WORKSPACE</span>
          </div>
        </div>

        <div className="auth-hero-content">
          <span className="auth-badge">STUDY SMARTER, NOT LONGER</span>
          <h1 className="auth-hero-heading">Turn exam pressure into a clear plan.</h1>
          <p className="auth-hero-desc">
            Know what to study, when to study it, and how ready you really are for every exam.
          </p>

          <div className="auth-stats-grid">
            <div className="auth-stat-card">
              <span className="auth-stat-value">62%</span>
              <span className="auth-stat-label">Readiness tracked</span>
            </div>
            <div className="auth-stat-card">
              <span className="auth-stat-value">18h</span>
              <span className="auth-stat-label">Study time planned</span>
            </div>
            <div className="auth-stat-card">
              <span className="auth-stat-value">3</span>
              <span className="auth-stat-label">Exams organized</span>
            </div>
          </div>
        </div>

        <div className="auth-footer-students">
          <div className="auth-avatars-group">
            <div className="auth-mini-avatar">AM</div>
            <div className="auth-mini-avatar">JL</div>
            <div className="auth-mini-avatar">SK</div>
          </div>
          <span className="auth-students-text">Join 2,400+ focused students</span>
        </div>
      </div>

      <div className="auth-right-panel">
        <button 
          className="auth-theme-toggle" 
          onClick={onToggleTheme} 
          type="button" 
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>

        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <span className="auth-welcome-back">WELCOME BACK</span>
            <h2>Sign in to ExamErp</h2>
            <p>Pick up where you left off and keep your study plan moving.</p>
          </div>

          <div className="auth-tabs">
            <button className="auth-tab-btn active" type="button">Sign in</button>
            <button className="auth-tab-btn" type="button" onClick={onSwitchToRegister}>Create account</button>
          </div>

          <button className="auth-google-btn" type="button">
            <span className="google-icon">G</span> Continue with Google
          </button>

          <div className="auth-divider">
            <span>OR CONTINUE WITH EMAIL</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>University email</label>
              <input 
                type="email" 
                placeholder="alex@university.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <div className="auth-label-row">
                <label>Password</label>
                <button type="button" className="forgot-link">Forgot password?</button>
              </div>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="At least 8 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
                title="Toggle password visibility">
                  👁
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign in to dashboard <span>→</span>
            </button>
          </form>

          <p className="for students-note">
            Custom made for students, by students. Your data is safe and secure with us.
          </p>
        </div>

        <button type="button" className="auth-help-btn" title="Help">?</button>
      </div>
    </div>
  );
}