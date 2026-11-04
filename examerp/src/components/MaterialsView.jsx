import React, { useState } from 'react';
import './MaterialsView.css';

export default function MaterialsView({ exams = [], onAddMaterial, onUpdateConfidence }) {
  const [activeTab, setActiveTab] = useState('All courses');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [courseCode, setCourseCode] = useState('CS301');
  const [topicName, setTopicName] = useState('');
  const [initialConfidence, setInitialConfidence] = useState(50);

  // Capture file selected from PC via native explorer
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setTopicName(cleanName);
      setShowModal(true);
    }
  };

  // Robust filtering: compare lowercase strings
  const filteredExams = exams.filter((item) => {
    if (activeTab === 'All courses') return true;
    return item.code?.trim().toLowerCase() === activeTab.trim().toLowerCase();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    const fileTypeExt = selectedFile ? selectedFile.name.split('.').pop().toUpperCase() : 'PDF';
    const fileSizeMB = selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB' : '24 pages';

    const newEntry = {
      id: Date.now(),
      code: courseCode,
      name: topicName,
      material: `${fileTypeExt} • ${fileSizeMB}`,
      confidence: Number(initialConfidence),
      status: initialConfidence > 70 ? 'Mastered' : initialConfidence < 40 ? 'Review' : 'In progress'
    };

    onAddMaterial(newEntry);
    setTopicName('');
    setSelectedFile(null);
    setShowModal(false);
  };

  return (
    <div className="materials-container">
      {/* Hidden native PC file input */}
      <input 
        type="file" 
        id="pc-file-input"
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
      />

      <div className="materials-header">
        <div>
          <span className="section-tag">KNOWLEDGE BASE</span>
          <h2>Materials & Topics</h2>
          <p>Upload your course files from your PC and manage your study topics.</p>
        </div>
        {/* Using a label pointing to file input guarantees PC explorer opens */}
        <label htmlFor="pc-file-input" className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
          + Add material
        </label>
      </div>

      {/* Modal popup after picking file from PC */}
      {showModal && (
        <div className="modal-overlay">
          <div className="card modal-box">
            <h3>Configure Uploaded Material</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Selected File: <strong>{selectedFile?.name}</strong>
            </p>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Course Code:
                <select value={courseCode} onChange={(e) => setCourseCode(e.target.value)}>
                  <option value="CS301">CS301</option>
                  <option value="MA202">MA202</option>
                  <option value="PH104">PH104</option>
                </select>
              </label>
              <label>
                Topic Name:
                <input 
                  type="text" 
                  value={topicName} 
                  onChange={(e) => setTopicName(e.target.value)} 
                  placeholder="e.g., Graph Algorithms" 
                  required 
                />
              </label>
              <label>
                Initial Confidence ({initialConfidence}%):
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={initialConfidence} 
                  onChange={(e) => setInitialConfidence(e.target.value)} 
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Add to Knowledge Base</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card table-card">
        <div className="table-filter-bar">
          <div className="tabs-group">
            {['All courses', 'CS301', 'MA202', 'PH104'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="records-count">{filteredExams.length} topics visible</span>
        </div>

        <table className="materials-table">
          <thead>
            <tr>
              <th>TOPIC</th>
              <th>MATERIAL</th>
              <th>CONFIDENCE (Drag to adjust)</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="topic-cell">
                    <span className="badge badge-indigo">{item.code}</span>
                    <span className="topic-name">{item.name}</span>
                  </div>
                </td>
                <td className="material-cell">{item.material}</td>
                <td>
                  <div className="confidence-cell">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={item.confidence} 
                      onChange={(e) => onUpdateConfidence(item.id, Number(e.target.value))}
                      style={{ width: '120px', cursor: 'pointer' }}
                    />
                    <span className="text-xs font-bold" style={{ minWidth: '35px' }}>{item.confidence}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${item.confidence > 70 ? 'badge-success' : item.confidence < 40 ? 'badge-warning' : 'badge-indigo'}`}>
                    {item.confidence > 70 ? 'Mastered' : item.confidence < 40 ? 'Review' : 'In progress'}
                  </span>
                </td>
              </tr>
            ))}
            {filteredExams.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No study materials found for {activeTab}. Click "+ Add material" to upload files from your PC!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}