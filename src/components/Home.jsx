// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box } from '@mui/material';
import Carousel from './Carousel';
import './Home.css';  // Ensure to keep the custom CSS file for other styles

const Home = () => {
  return (
    <>
      <Carousel />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>

          {/* Manage Users Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/manage-users" style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box 
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://th.bing.com/th/id/OIP.lrXIZMWkZLUwC1X5rlEjKgHaHa?rs=1&pid=ImgDetMain"
                    alt="Manage Users"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Users
                  </Typography>
                  <Typography>
                    Efficiently manage users with easy-to-use tools for adding, editing, and deleting users.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Manage Appointments Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/appointments" style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box 
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://media.istockphoto.com/id/1435257708/vector/book-doctor-appointment-card-template.jpg?s=612x612&w=0&k=20&c=RrS8AL1l46eGv85FsMHKEEc8KnmVPaYybiE3rnUy28g="
                    alt="Manage Appointments"
                    sx={{ width: '120%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Appointments
                  </Typography>
                  <Typography>
                    Schedule and manage patient appointments seamlessly with our integrated system.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Track Feedback Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/feedback" style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box 
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://cdn-icons-png.flaticon.com/512/8163/8163722.png"
                    alt="Track Feedback"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Track Feedback
                  </Typography>
                  <Typography>
                    Keep track of all patient feedback and ensure continuous improvement of services.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default Home;
