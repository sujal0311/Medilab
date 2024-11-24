import React, { useState, useEffect } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  IconButton,
  Divider,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFeedback, setEditFeedback] = useState({ id: null, reviewedStatus: '' });

  // Initialize local storage on component mount
  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedbackList');
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    } else {
      // Initial data, saving it to local storage
      const initialFeedback = [
        { id: 1, type: 'Complaint', content: 'Great service!', submissionDate: '2024-08-01', reviewedStatus: 'Reviewed' },
        { id: 2, type: 'Suggestion', content: 'The waiting time was too long.', submissionDate: '2024-08-02', reviewedStatus: 'Pending' },
        // Add more feedback items here
        { id: 3, type: 'Complaint', content: 'Friendly staff but the facilities need improvement.', submissionDate: '2024-08-03', reviewedStatus: 'Reviewed' },
        { id: 4, type: 'Suggestion', content: 'Provide more seating in the waiting area.', submissionDate: '2024-08-04', reviewedStatus: 'Pending' },
        { id: 5, type: 'Complaint', content: 'The appointment system is confusing.', submissionDate: '2024-08-05', reviewedStatus: 'Reviewed' },
        { id: 6, type: 'Suggestion', content: 'Add an online appointment scheduling option.', submissionDate: '2024-08-06', reviewedStatus: 'Pending' },
        { id: 7, type: 'Complaint', content: 'Late response to queries.', submissionDate: '2024-08-07', reviewedStatus: 'Reviewed' },
        { id: 8, type: 'Suggestion', content: 'Improve the website interface.', submissionDate: '2024-08-08', reviewedStatus: 'Pending' },
        { id: 9, type: 'Complaint', content: 'Inadequate follow-up on test results.', submissionDate: '2024-08-09', reviewedStatus: 'Reviewed' },
        { id: 10, type: 'Suggestion', content: 'More variety in medication options.', submissionDate: '2024-08-10', reviewedStatus: 'Pending' },
        { id: 11, type: 'Complaint', content: 'Long wait times for prescription fulfillment.', submissionDate: '2024-08-11', reviewedStatus: 'Reviewed' },
        { id: 12, type: 'Suggestion', content: 'Improve communication with patients.', submissionDate: '2024-08-12', reviewedStatus: 'Pending' },
        { id: 13, type: 'Complaint', content: 'Unfriendly behavior from the lab staff.', submissionDate: '2024-08-13', reviewedStatus: 'Reviewed' },
        { id: 14, type: 'Suggestion', content: 'Offer more educational resources on health.', submissionDate: '2024-08-14', reviewedStatus: 'Pending' },
        { id: 15, type: 'Complaint', content: 'Issues with online payment system.', submissionDate: '2024-08-15', reviewedStatus: 'Reviewed' },
        { id: 16, type: 'Suggestion', content: 'Expand the range of available drugs.', submissionDate: '2024-08-16', reviewedStatus: 'Pending' },
        { id: 17, type: 'Complaint', content: 'Problems with the appointment booking system.', submissionDate: '2024-08-17', reviewedStatus: 'Reviewed' },
        { id: 18, type: 'Suggestion', content: 'Include patient feedback in the appointment system.', submissionDate: '2024-08-18', reviewedStatus: 'Pending' },
        { id: 19, type: 'Complaint', content: 'Difficulty in reaching customer support.', submissionDate: '2024-08-19', reviewedStatus: 'Reviewed' },
        { id: 20, type: 'Suggestion', content: 'Improve the clarity of lab test results.', submissionDate: '2024-08-20', reviewedStatus: 'Pending' },
      ];
      localStorage.setItem('feedbackList', JSON.stringify(initialFeedback));
      setFeedbackList(initialFeedback);
    }
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const updatedFeedback = feedbackList.filter((item) => item.id !== id);
    setFeedbackList(updatedFeedback);
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedback));
    toast.success('Feedback deleted successfully!');
  };

  // Handle edit action
  const handleEdit = (id) => {
    const feedbackToEdit = feedbackList.find((item) => item.id === id);
    setEditFeedback({ id: feedbackToEdit.id, reviewedStatus: feedbackToEdit.reviewedStatus });
    setEditDialogOpen(true);
  };

  const handleStatusChange = (e) => {
    setEditFeedback({ ...editFeedback, reviewedStatus: e.target.value });
  };

  const handleEditSave = () => {
    const updatedFeedback = feedbackList.map((item) =>
      item.id === editFeedback.id ? { ...item, reviewedStatus: editFeedback.reviewedStatus } : item
    );
    setFeedbackList(updatedFeedback);
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedback));
    setEditDialogOpen(false);
    toast.success('Feedback status updated successfully!');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#00B894',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container sx={{ backgroundColor: 'white', borderRadius: '8px', p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          User Feedback
        </Typography>
        {feedbackList.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <ListItem sx={{ backgroundColor: '#f1f1f1', borderRadius: '8px', p: 2 }}>
              <ListItemText
                primary={<Typography variant="h6">{item.content}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">Type: {item.type}</Typography>
                    <Typography variant="body2" color="textSecondary">Submitted: {item.submissionDate}</Typography>
                    <Typography variant="body2" color="textSecondary">Status: {item.reviewedStatus}</Typography>
                  </>
                }
              />
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </Container>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Feedback Status</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Change the status of the feedback:</Typography>
          <Select
            fullWidth
            value={editFeedback.reviewedStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
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

export default Feedback;
