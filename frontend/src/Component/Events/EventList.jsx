import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid, Snackbar, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';

const EventList = ({ setEventCount }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registering, setRegistering] = useState(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/');
        setEvents(response.data);
        console.log(response.data);
        localStorage.setItem('events', JSON.stringify(response.data));
        
        const no_of_events = response.data.length;
        setEventCount(no_of_events);
        localStorage.setItem('eventCount', no_of_events);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setEventCount]);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleRegister = async () => {
    setRegistering(true); 
    try {
      const userId = localStorage.getItem('userId'); 
      const email = localStorage.getItem('email'); 
      await axios.post(`http://localhost:8000/events/${selectedEvent.id}/register/`, { userId, email },
        { withCredentials: true }
      );
      setSuccessMessage(`Successfully registered for event: ${selectedEvent.title}`);
    } catch (error) {
      console.log(error);
      
      if (error.response && error.response.status === 401) {
        setError('You need to log in to register for the event.');
      } else if (error.response.data.error === "Event is completely booked") {
        setError("Event is completely booked and cannot be registered");
      } else if (error.response && error.response.status === 403) {
        setError('You do not have permission to register for this event.');
      } else {
        setError('Failed to register for the event. Please try again later.');
      }
    } finally {
      setRegistering(false); 
      setModalOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, zIndex: 1 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: "white" }}>
        Events
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center" className="event-grid-container" sx={{ maxWidth: '100%' }}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id} className="event-grid-item" sx={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
              <Card variant="outlined" className="event-card" sx={{
                width: '100%', maxWidth: '280px', minHeight: '350px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': {
                  transform: 'scale(1.05)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                }, textAlign: 'center', padding: "15px",
              }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', color: '#165580', marginBottom: '15px',
                    textDecoration: 'underline',
                  }}>
                    {event.title.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{
                    mb: 2, overflow: 'hidden', textOverflow: 'ellipsis',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    color: '#444', fontSize: '16px',
                  }}>
                    {event.description}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" sx={{
                    mb: 1, color: '#165580', fontWeight: 'bold',
                  }}>
                    <span style={{ color: 'black' }}>Date:</span> {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" sx={{
                    mb: 1, color: '#165580', fontWeight: 'bold',
                  }}>
                    <span style={{ color: 'black' }}>Capacity:</span> {event.capacity} participants
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" sx={{
                    mb: 2, color: '#165580', fontWeight: 'bold',
                  }}>
                    <span style={{ color: 'black' }}>Location:</span> {event.location}
                  </Typography>
                </CardContent>
                <Button variant="contained" color="secondary" className="event-register-button"
                  onClick={() => handleRegisterClick(event)} sx={{
                    backgroundColor: '#1565c0', margin: '0 auto', marginBottom: '10px',
                    width: '80%', borderRadius: '12px', border: '2px solid white', '&:hover': {
                      backgroundColor: '#0d47a1',
                    },
                  }}>
                  Register
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={!!error} message={error} autoHideDuration={6000} onClose={() => setError('')} />
      <Snackbar open={!!successMessage} message={successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')} />

      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          {registering ? ( 
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            selectedEvent && (
              <>
                <Typography variant="h6">{selectedEvent.title}</Typography>
                <Typography variant="body1">{selectedEvent.description}</Typography>
              </>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleRegister} color="primary" disabled={registering}>Confirm</Button> 
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventList;
