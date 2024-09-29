import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Snackbar } from '@mui/material';
import Login from './Login'; 
import Register from './Register'; 
import { UserContext } from '../../Context/UserContext'; 
import './AuthModal.css'

const AuthModal = ({ open, handleClose }) => {
  const [isRegister, setIsRegister] = useState(false); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const { login } = useContext(UserContext);

  const handleSwitch = () => {
    setIsRegister(!isRegister);
    resetForm(); 
  };

  const resetForm = () => {
    setError(''); 
    setSuccessMessage(''); 
  };

  const handleLoginSuccess = (userData) => {
    login(userData); 
    setSuccessMessage('Login successful!'); 
    handleClose(); 
  };

  const handleRegisterSuccess = (userData) => {
    login(userData); 
    setSuccessMessage('Registration successful!'); 
    handleClose(); 
  };

  const handleErrorClose = () => {
    setError(''); 
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(''); 
  };

  return (
    <Dialog open={open} className="AuthModal">
      <DialogTitle>{isRegister ? 'Register' : 'Login'}</DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          {isRegister ? (
            <Register 
              onSuccess={handleRegisterSuccess} 
              handleClose={handleClose} 
              setLoading={() => {}} 
            /> 
          ) : (
            <Login 
              onSuccess={handleLoginSuccess} 
              handleClose={handleClose} 
              setLoading={() => {}} 
            /> 
          )}
          <Button onClick={handleSwitch} color="primary">
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Button>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" className="btn">
          Cancel
        </Button>
      </DialogActions>
      
      
      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      />
      
     
      <Snackbar
        open={!!successMessage}
        message={successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      />
    </Dialog>
  );
};

export default AuthModal;
