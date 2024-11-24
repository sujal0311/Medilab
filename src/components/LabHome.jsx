import {React,useState} from 'react'
import ShareTestResults from './ShareTestResults';
import RecordTestResult from './RecordTestResult';
import RoleSelection from './RoleSelection';
import TestRequest from './TestRequest';
import TabNavigation from './TabNavigation';
import DoctorTestList from './DoctorTestList';
import "./LabHome.css"




function LabHome() {
    const [role, setRole] = useState('');
    const [pendingTests, setPendingTests] = useState([]);
  
    // Function to add a pending test
    const addTest = (test) => {
      setPendingTests([...pendingTests, test]);
    };
  
    // Function to record a test result
    const recordTestResult = (testId, result) => {
      setPendingTests(pendingTests.map(test =>
        test.testId === testId ? { ...test, result } : test
      ));
    };
  
    // Function to share test results
    const shareTestResult = (testId) => {
      setPendingTests(pendingTests.filter(test => test.testId !== testId));
    };
  
    return (
      <div className="container">
        <header>
          <h1>MediLab Information System</h1>
        </header>
  
        <RoleSelection setRole={setRole} />
  
        {role && (
          <>
            <DoctorTestList />
            <TabNavigation role={role} />
            
            {role === 'patient' && <TestRequest addTest={addTest} />}
            {role === 'lab-incharge' && (
              <>
                <RecordTestResult pendingTests={pendingTests} recordTestResult={recordTestResult} />
                <ShareTestResults pendingTests={pendingTests} shareTestResult={shareTestResult} />
              </>
            )}
          </>
        )}
      </div>
    );
}

export default LabHome