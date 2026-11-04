import React, { useState } from 'react';
import './DiagnosticQuiz.css';

export default function DiagnosticQuizView({ exams, onCompleteQuiz, setCurrentView }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      id: 1,
      topic: "Graph algorithms",
      question: "Which algorithm guarantees the shortest path in an unweighted graph?",
      options: [
        { id: "A", text: "Breadth-first search", correct: true },
        { id: "B", text: "Depth-first search", correct: false },
        { id: "C", text: "Dijkstra's algorithm", correct: false },
        { id: "D", text: "Kruskal's algorithm", correct: false }
      ]
    },
    {
      id: 2,
      topic: "Dynamic Programming",
      question: "What is the primary advantage of dynamic programming over recursive backtracking?",
      options: [
        { id: "A", text: "Uses less overall memory", correct: false },
        { id: "B", text: "Memoization avoids redundant calculations", correct: true },
        { id: "C", text: "Does not require base cases", correct: false },
        { id: "D", text: "Runs in O(1) time complexity", correct: false }
      ]
    }
  ];

  const handleNext = () => {
    const currentQ = questions[currentQIndex];
    const chosen = currentQ.options.find(o => o.id === selectedOption);
    
    if (chosen && chosen.correct) {
      setScore(score + 1);
    }

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      // Update confidence scores automatically based on quiz performance
      const updated = exams.map(ex => ex.code === 'CS301' ? { ...ex, confidence: 85 } : ex);
      onCompleteQuiz(updated);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div>
          <span className="section-tag">DIAGNOSTIC QUIZ • CS301</span>
          <h2>Find your knowledge gaps</h2>
          {!quizFinished && <p>Question {currentQIndex + 1} of {questions.length} • {questions[currentQIndex].topic}</p>}
        </div>
        <div className="quiz-timer">Active Session</div>
      </div>

      <div className="card quiz-card">
        {!quizFinished ? (
          <>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}></div>
            </div>

            <div className="quiz-content">
              <span className="badge badge-indigo">QUESTION 0{currentQIndex + 1}</span>
              <h3>{questions[currentQIndex].question}</h3>

              <div className="options-list">
                {questions[currentQIndex].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`option-btn ${selectedOption === opt.id ? 'selected' : ''}`}
                  >
                    <span className="option-badge">{opt.id}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>

              <div className="quiz-actions">
                <button onClick={() => setCurrentView('dashboard')} className="skip-btn">Exit quiz</button>
                <button 
                  disabled={!selectedOption} 
                  onClick={handleNext} 
                  className="btn-primary"
                  style={{ opacity: selectedOption ? 1 : 0.6 }}
                >
                  {currentQIndex + 1 === questions.length ? 'Finish Quiz' : 'Next question →'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2>🎉 Quiz Completed!</h2>
            <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>
              You scored {score} out of {questions.length}. Your CS301 confidence scores have been dynamically updated!
            </p>
            <button onClick={() => setCurrentView('dashboard')} className="btn-primary">
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}