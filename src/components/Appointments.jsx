import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  Container,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState({ id: null, status: '' });

  // Load appointments from local storage or initialize default data
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      const initialAppointments = [
        { id: 1, patientId: 'P1001', patientName: 'John Doe', doctorId: 'D2001', appointmentDate: '2024-09-01 10:30 AM', status: 'Confirmed' },
        { id: 2, patientId: 'P1002', patientName: 'Jane Smith', doctorId: 'D2002', appointmentDate: '2024-09-02 02:00 PM', status: 'Canceled' },
        // Add more rows as needed
        { id: 3, patientId: 'P1003', patientName: 'Michael Brown', doctorId: 'D2003', appointmentDate: '2024-09-03 01:00 PM', status: 'Confirmed' },
        { id: 4, patientId: 'P1004', patientName: 'Sarah Wilson', doctorId: 'D2004', appointmentDate: '2024-09-04 11:00 AM', status: 'Confirmed' },
        { id: 5, patientId: 'P1005', patientName: 'David Johnson', doctorId: 'D2005', appointmentDate: '2024-09-05 04:00 PM', status: 'Canceled' },
        { id: 6, patientId: 'P1006', patientName: 'Emily Davis', doctorId: 'D2006', appointmentDate: '2024-09-06 09:00 AM', status: 'Confirmed' },
        { id: 7, patientId: 'P1007', patientName: 'Daniel Martinez', doctorId: 'D2007', appointmentDate: '2024-09-07 12:30 PM', status: 'Confirmed' },
        { id: 8, patientId: 'P1008', patientName: 'Jessica Lee', doctorId: 'D2008', appointmentDate: '2024-09-08 03:30 PM', status: 'Confirmed' },
        { id: 9, patientId: 'P1009', patientName: 'Thomas Harris', doctorId: 'D2009', appointmentDate: '2024-09-09 08:30 AM', status: 'Canceled' },
        { id: 10, patientId: 'P1010', patientName: 'Mary Clark', doctorId: 'D2010', appointmentDate: '2024-09-10 02:30 PM', status: 'Confirmed' },
        { id: 11, patientId: 'P1011', patientName: 'James Rodriguez', doctorId: 'D2011', appointmentDate: '2024-09-11 10:00 AM', status: 'Confirmed' },
        { id: 12, patientId: 'P1012', patientName: 'Elizabeth Lewis', doctorId: 'D2012', appointmentDate: '2024-09-12 01:30 PM', status: 'Canceled' },
        { id: 13, patientId: 'P1013', patientName: 'Henry Walker', doctorId: 'D2013', appointmentDate: '2024-09-13 11:30 AM', status: 'Confirmed' },
        { id: 14, patientId: 'P1014', patientName: 'Linda Scott', doctorId: 'D2014', appointmentDate: '2024-09-14 05:00 PM', status: 'Confirmed' },
        { id: 15, patientId: 'P1015', patientName: 'Robert Adams', doctorId: 'D2015', appointmentDate: '2024-09-15 09:30 AM', status: 'Canceled' },
        { id: 16, patientId: 'P1016', patientName: 'Sophia Young', doctorId: 'D2016', appointmentDate: '2024-09-16 01:00 PM', status: 'Confirmed' },
        { id: 17, patientId: 'P1017', patientName: 'Oliver King', doctorId: 'D2017', appointmentDate: '2024-09-17 11:00 AM', status: 'Confirmed' },
        { id: 18, patientId: 'P1018', patientName: 'Charlotte Wright', doctorId: 'D2018', appointmentDate: '2024-09-18 03:00 PM', status: 'Confirmed' },
        { id: 19, patientId: 'P1019', patientName: 'William Green', doctorId: 'D2019', appointmentDate: '2024-09-19 10:30 AM', status: 'Confirmed' },
        { id: 20, patientId: 'P1020', patientName: 'Amelia Hall', doctorId: 'D2020', appointmentDate: '2024-09-20 02:00 PM', status: 'Canceled' },
      ];
      localStorage.setItem('appointments', JSON.stringify(initialAppointments));
      setAppointments(initialAppointments);
    }
  }, []);

  // Handle edit action
  const handleEdit = (row) => {
    setEditAppointment({ id: row.id, status: row.status });
    setEditDialogOpen(true);
  };

  // Handle delete action
  const handleDelete = (row) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== row.id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    toast.success('Appointment deleted successfully!');
  };

  // Save changes made in the edit dialog
  const handleEditSave = () => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === editAppointment.id ? { ...appointment, status: editAppointment.status } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setEditDialogOpen(false);
    toast.success('Appointment status updated successfully!');
  };

  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'Appointment ID', width: 120 },
    { field: 'patientId', headerName: 'Patient ID', width: 120 },
    { field: 'patientName', headerName: 'Patient Name', width: 200 },
    { field: 'doctorId', headerName: 'Doctor ID', width: 120 },
    { field: 'appointmentDate', headerName: 'Appointment Date & Time', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#00B894',
        minHeight: '100vh',
        py: 4, // Adds padding to the top and bottom
      }}
    >
      <Container sx={{ backgroundColor: 'white', borderRadius: '8px', p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Appointments
        </Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={appointments} columns={columns} pageSize={10} checkboxSelection />
        </div>
      </Container>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Appointment Status</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Change the status of the appointment:</Typography>
          <Select
            fullWidth
            value={editAppointment.status}
            onChange={(e) => setEditAppointment({ ...editAppointment, status: e.target.value })}
          >
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
