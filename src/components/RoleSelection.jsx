import React from 'react';
import './RoleSelection.css';
const RoleSelection = ({ setRole }) => {
  return (
    <section id="role-selection">
      <label htmlFor="role">Select Role:</label>
      <select id="role" onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="lab-incharge">Lab Incharge</option>
      </select>
    </section>
  );
};

export default RoleSelection;
