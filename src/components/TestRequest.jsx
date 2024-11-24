import React, { useState } from 'react';
import './TestRequest.css';
const TestRequest = ({ addTest }) => {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [testType, setTestType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctorName && patientName && testType) {
      const testId = `T-${Math.floor(Math.random() * 1000)}`;
      addTest({ testId, doctorName, patientName, testType });
      setDoctorName('');
      setPatientName('');
      setTestType('');
    }
  };

  return (
    <section>
      <h2>Test Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Doctor's Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patient's Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
        >
          <option value="">Select Test</option>
          <option value="Blood Test">Blood Test</option>
          <option value="Urine Test">Urine Test</option>
          <option value="X-ray">X-ray</option>
        </select>
        <button type="submit">Submit Request</button>
      </form>
    </section>
  );
};

export default TestRequest;
