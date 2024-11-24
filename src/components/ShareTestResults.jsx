import React, { useState } from 'react';
import './ShareTestResults.css';
const ShareTestResults = ({ pendingTests, shareTestResult }) => {
  const [testId, setTestId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testId) {
      shareTestResult(testId);
      setTestId('');
    }
  };

  return (
    <section>
      <h2>Share Results</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Test ID"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
        />
        <button type="submit">Share with Doctor & Patient</button>
      </form>
    </section>
  );
};

export default ShareTestResults;
