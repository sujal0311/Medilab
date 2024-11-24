// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './Login.css'; // Import the CSS file for custom styles

const mockUsers = [
  { email: 'admin@gmail.com', password: 'Admin@123', role: 'Admin' },
  { email: 'doctor@gmail.com', password: 'Doctor@123', role: 'Doctor' },
  { email: 'lab@gmail.com', password: 'LabIncharge@123', role: 'Lab Incharge' },
  { email: 'staff@gmail.com', password: 'Staff@123', role: 'Dispensary Staff' },
];

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordValidationRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.');
      return;
    } else {
      setPasswordError('');
    }

    const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === role);

    if (user) {
      setError(false);
      handleLogin(user.role); // Pass role to the handler
      switch (user.role) {
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
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <Box component="form" onSubmit={handleSubmit} className="login-box">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid email, password, or role.
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
          className="login-btn"
        >
          Login
        </Button>

        <Typography variant="body2" className="forgot-password">
          Forgot password?
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
