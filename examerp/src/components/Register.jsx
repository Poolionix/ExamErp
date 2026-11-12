import React, { useState } from 'react';
import './Register.css';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the terms and privacy policy.');
      return;
    }
    onRegisterSuccess();
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE: Brand Showcase / Promotional Panel */}
      <div className="auth-left-panel">
        <div className="auth-brand-header">
          <div className="auth-logo-box">E</div>
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
            <span className="auth-mini-avatar">AM</span>
            <span className="auth-mini-avatar">JL</span>
            <span className="auth-mini-avatar">SK</span>
          </div>
          <span className="auth-students-text">Join 2,400+ focused students</span>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <span className="auth-welcome-back">START YOUR JOURNEY</span>
            <h2>Create your account</h2>
            <p>Set up your personal exam command center in minutes.</p>
          </div>

          {/* Switch Tabs */}
          <div className="auth-tabs">
            <button className="auth-tab-btn" type="button" onClick={onSwitchToLogin}>Sign in</button>
            <button className="auth-tab-btn active" type="button">Create account</button>
          </div>

          {/* Google Sign-in Button */}
          <button className="auth-google-btn" type="button" onClick={onRegisterSuccess}>
            <span className="google-icon">G</span> Continue with Google
          </button>

          <div className="auth-divider">
            <span>OR CONTINUE WITH EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>Full name</label>
              <input 
                type="text" 
                placeholder="Alex Morgan" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

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
              <label>Password</label>
              <input 
                type="password" 
                placeholder="At least 8 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <span className="auth-input-hint">Use 8+ characters with a number and a symbol.</span>
            </div>

            <div className="auth-checkbox-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                />
                <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create my account <span>→</span>
            </button>
          </form>

          <p className="auth-security-note">
            Protected by enterprise-grade encryption. Your academic data stays private.
          </p>
        </div>
      </div>
    </div>
  );
}
