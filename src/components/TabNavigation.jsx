import React from 'react';
import './TabNavigation.css';
const TabNavigation = ({ role }) => {
  return (
    <nav id="tab-navigation">
      {role === 'patient' && <button className="tab-button">Test Request</button>}
      {role === 'lab-incharge' && (
        <>
          <button className="tab-button">Record Test Result</button>
          <button className="tab-button">Share Results</button>
        </>
      )}
    </nav>
  );
};

export default TabNavigation;
