import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Typography,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load users from local storage or initialize with default data
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const initialUsers = [
        { id: 1, username: 'JohnDoe', email: 'johndoe@example.com', role: 'Doctor', status: 'Active' },
        { id: 2, username: 'JaneSmith', email: 'janesmith@example.com', role: 'Patient', status: 'Inactive' },
        { id: 3, username: 'RajeshPatel', email: 'rajeshpatel@example.com', role: 'Lab Incharge', status: 'Active' },
        { id: 4, username: 'AnitaVerma', email: 'anitaverma@example.com', role: 'Patient', status: 'Active' },
        { id: 5, username: 'DrSharma', email: 'drsharma@example.com', role: 'Doctor', status: 'Active' },
        { id: 6, username: 'VikasSingh', email: 'vikassingh@example.com', role: 'Dispensary Staff', status: 'Active' },
        { id: 7, username: 'NehaKhan', email: 'nehakhan@example.com', role: 'Patient', status: 'Inactive' },
        { id: 8, username: 'RaviKumar', email: 'ravikumar@example.com', role: 'Doctor', status: 'Active' },
        { id: 9, username: 'SoniaGupta', email: 'soniagupta@example.com', role: 'Lab Incharge', status: 'Active' },
        { id: 10, username: 'KiranJoshi', email: 'kiranjoshi@example.com', role: 'Dispensary Staff', status: 'Inactive' },
        { id: 11, username: 'AmitSingh', email: 'amitsingh@example.com', role: 'Patient', status: 'Active' },
        { id: 12, username: 'PriyaRao', email: 'priya.rao@example.com', role: 'Doctor', status: 'Active' },
        { id: 13, username: 'RahulPatel', email: 'rahulpatel@example.com', role: 'Lab Incharge', status: 'Active' },
        { id: 14, username: 'SunitaYadav', email: 'sunitayadav@example.com', role: 'Patient', status: 'Inactive' },
        { id: 15, username: 'DrGhosh', email: 'drghosh@example.com', role: 'Doctor', status: 'Active' },
        { id: 16, username: 'VivekNair', email: 'viveknair@example.com', role: 'Dispensary Staff', status: 'Active' },
        { id: 17, username: 'MeeraSethi', email: 'meerasethi@example.com', role: 'Patient', status: 'Active' },
        { id: 18, username: 'AlokChauhan', email: 'alokchauhan@example.com', role: 'Lab Incharge', status: 'Active' },
        { id: 19, username: 'SwatiRana', email: 'swatirana@example.com', role: 'Dispensary Staff', status: 'Inactive' },
        { id: 20, username: 'RohanSharma', email: 'rohansharma@example.com', role: 'Patient', status: 'Active' },
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }
  }, []);

  // Handle delete user
  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('User deleted successfully!');
    setDeleteDialogOpen(false);
  };

  // Handle toggle status
  const handleStatusToggle = (user) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success(`User status updated to ${user.status === 'Active' ? 'Inactive' : 'Active'}`);
  };

  // Handle open edit dialog
  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  // Handle save edits
  const handleEditSave = () => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? selectedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('User details updated successfully!');
    setEditDialogOpen(false);
  };

  // Handle edit input changes
  const handleEditChange = (field, value) => {
    setSelectedUser({ ...selectedUser, [field]: value });
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'User ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="primary" onClick={() => handleEditOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color={params.row.status === 'Active' ? 'success' : 'default'}
            onClick={() => handleStatusToggle(params.row)}
          >
            {params.row.status === 'Active' ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </IconButton>
          <IconButton color="error" onClick={() => { setSelectedUser(params.row); setDeleteDialogOpen(true); }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#00B894', minHeight: '100vh', py: 4 }}>
      <Container sx={{ backgroundColor: 'white', borderRadius: '8px', p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={users} columns={columns} pageSize={10} checkboxSelection />
        </div>
      </Container>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Edit Dialog */}
      {selectedUser && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent>
            <TextField
              label="Username"
              fullWidth
              value={selectedUser.username}
              onChange={(e) => handleEditChange('username', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={selectedUser.email}
              onChange={(e) => handleEditChange('email', e.target.value)}
              sx={{ mb: 2 }}
            />
            <Select
              fullWidth
              value={selectedUser.role}
              onChange={(e) => handleEditChange('role', e.target.value)}
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="Lab Incharge">Lab Incharge</MenuItem>
              <MenuItem value="Dispensary Staff">Dispensary Staff</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedUser && (
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the user "{selectedUser.username}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ManageUsers;
