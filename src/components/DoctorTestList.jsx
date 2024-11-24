import React from 'react';
import './DoctorTestList.css';
const DoctorTestList = () => {
  const doctorTests = [
    { doctor: 'Dr. Ramesh Thakur', test: 'Blood Test' },
    { doctor: 'Dr. Divya Dutta', test: 'Urine Test' },
    { doctor: 'Dr. Prithvi Das', test: 'X-ray' },
  ];

  return (
    <section id="doctor-test-section">
      <h2>Doctor & Test List</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Concerned Test</th>
          </tr>
        </thead>
        <tbody>
          {doctorTests.map((entry, index) => (
            <tr key={index}>
              <td>{entry.doctor}</td>
              <td>{entry.test}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DoctorTestList;
