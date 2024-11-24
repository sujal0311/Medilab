// src/components/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './Signup.css'; // Import the CSS file for custom styles

const mockUsers = [
  { email: 'admin@gmail.com', password: 'Admin@123', role: 'Admin' },
  { email: 'doctor@gmail.com', password: 'Doctor@123', role: 'Doctor' },
  { email: 'lab@gmail.com', password: 'LabIncharge@123', role: 'Lab Incharge' },
  { email: 'staff@gmail.com', password: 'Staff@123', role: 'Dispensary Staff' },
];

const SignupPage = ({ handleSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (!passwordValidationRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.');
      return;
    } else {
      setPasswordError('');
    }

    // Check if email is already in use
    if (mockUsers.some((user) => user.email === email)) {
      setEmailError('Email already exists. Please use a different one.');
      return;
    } else {
      setEmailError('');
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    } else {
      setError('');
    }

    // Add new user to mock data
    const newUser = { email, password, role };
    mockUsers.push(newUser); // Add user to mock data (in a real app, save to a database)

    handleSignup(); // Update app state for successful signup
    switch (role) {
      case 'Admin':
        navigate('/admin-dashboard');
        break;
      case 'Doctor':
        navigate('/doctor-dashboard');
        break;
      case 'Lab Incharge':
        navigate('/lab-dashboard');
        break;
      case 'Dispensary Staff':
        navigate('/staff-dashboard');
        break;
      default:
        navigate('/');
    } // Navigate to login page after successful signup
  };

  return (
    <div className="signup-container">
      <Box component="form" onSubmit={handleSubmit} className="signup-box">
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {emailError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {emailError}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          helperText={emailError}
          error={emailError !== ''}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText={passwordError}
          error={passwordError !== ''}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Lab Incharge">Lab Incharge</MenuItem>
            <MenuItem value="Dispensary Staff">Dispensary Staff</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="signup-btn"
        >
          Signup
        </Button>
        <Typography variant="body2" className="login-redirect">
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Box>
    </div>
  );
};

export default SignupPage;
