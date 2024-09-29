import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Home from './Component/Home/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RegisteredEvents from './Component/Events/RegisteredEvents';
import EventList from './Component/Events/EventList';
import AuthModal from './Component/Auth/AuthModal';
import { UserProvider, UserContext } from './Context/UserContext';
import axios from 'axios';
function App() {
  const theme = createTheme();

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

function AppContent() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]); 
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { user, logout } = useContext(UserContext); 
  const [eventCount, setEventCount] = useState(() => {
    const savedCount = localStorage.getItem('eventCount');
    return savedCount ? Number(savedCount) : 0;
  });
  
  useEffect(() => {
    const getEvents = async () => {
        try {
            const response = await axios.get('events/get/');
            let length=response.data.length;
            setFetchedEvents(length); 
            console.log(response.data);
            console.log(length);
            console.log(fetchedEvents);
            
          
        } catch (error) {
            console.error('Error fetching registered events:', error);
           
        }
    };

    getEvents(); 
}, []); 

  useEffect(() => {
    if (!user) {
      setOpenAuthModal(true); 
    } else {
      setOpenAuthModal(false); 
    }
  }, [user]);

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false); 
  };

  const toggleSidebar = () => {
    setOpenSidebarToggle(currentState => !currentState); 
  };

  return (
    <div className="grid-container">
      {user ? (
        <>
          <Header 
            openSidebar={toggleSidebar} 
            onLogout={logout}
          />
          <Sidebar 
            openSidebarToggle={openSidebarToggle} 
            toggleSidebar={toggleSidebar} 
          />
          <Routes>
            <Route path="/home" element={<Home eventCount={eventCount} No_of_Events={fetchedEvents}/>} />
            <Route path="/" element={<Home eventCount={eventCount} No_of_Events={fetchedEvents}/>} />
            <Route path="/registered_events" element={<RegisteredEvents />} />

            <Route path="/events" element={<EventList  setEventCount={setEventCount}/>} />
            {/* <Route path="/my-events" element={<RegisteredEvents />} /> */}
          </Routes>
        </>
      ) : (
        <AuthModal
          open={openAuthModal}
          handleClose={handleCloseAuthModal}
        />
      )}
    </div>
  );
}

export default App;
