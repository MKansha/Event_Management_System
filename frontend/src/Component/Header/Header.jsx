
import { useState, useContext } from 'react';
import { Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { BsFillBellFill, BsFillEnvelopeFill, BsJustify } from 'react-icons/bs';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from '../../Context/UserContext'; 
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ openSidebar }) {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("isRegistered");
    navigate('/');
    handleMenuClose();
  };

  return (
    <header className='header'>
      {isSmallScreen && (
        <div className='menu-icon'>
          <IconButton onClick={openSidebar} sx={{ color: "white" }}>
            <BsJustify className='icon' />
          </IconButton>
        </div>
      )}
      <Box 
        display="flex" 
        alignItems="center" 
        flexGrow={1} 
        justifyContent={isSmallScreen ? "space-between" : "center"} 
      >
        <h3 
  style={{
    textAlign: "center",
    margin: isSmallScreen ? "0" : "0 auto", 
    fontSize: isSmallScreen ? "20px" : "30px", 
    color: "White",
    flexGrow: 1,
  }}
>
  Event Management System
</h3>

      </Box>

      
      <Box display="flex" alignItems="center">
      
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
        >
          <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon 
              style={{
                padding: "3px",
                border: "2px solid white",
                borderRadius: "50%",
                marginRight: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }} 
            />
            {user && <span style={{ color: "white", fontWeight: "bold" }}>{user.name}</span>}
          </div>
        </IconButton>
      </Box>

      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
