import React, { useState } from "react";
import './RecordTestResult.css';

const RecordTestResult = ({ pendingTests, recordTestResult }) => {
  const [testId, setTestId] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testId && result) {
      recordTestResult(testId, result);
      setTestId("");
      setResult("");
    }
  };

  return (
    <section>
      <h2>Record Test Result</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Test ID"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
        />
        <textarea
          placeholder="Result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
        <button type="submit">Record Result</button>
      </form>
    </section>
  );
};

export default RecordTestResult;
