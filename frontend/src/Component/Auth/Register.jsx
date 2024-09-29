// // src/Component/Auth/Register.js
// import { useState, useEffect } from 'react';
// import { TextField, Button, Container, Snackbar } from '@mui/material';
// import axios from 'axios';
// import Login from './Login'; // Ensure this imports your Login component

// const Register = ({ handleClose, onSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [notification, setNotification] = useState({ message: '', severity: '' });
//   const [isRegistered, setIsRegistered] = useState(false);

//   // Check if registration is already completed (persisting state)
//   useEffect(() => {
//     const registrationStatus = localStorage.getItem('isRegistered');
//     if (registrationStatus === 'true') {
//       setIsRegistered(true);
//     }
//   }, []);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/users/register/', { email, password, name });
//       setIsOtpSent(true);
//       setNotification({ message: 'OTP sent to your email!', severity: 'success' });
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
//       setNotification({ message: errorMessage, severity: 'error' });
//       console.error('Registration error:', error);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/users/verify-otp/', { email, otp });
      
//       console.log('Verification response:', response);  // Log response
//       console.log('Verification response:', response.status);  // Log response
//       if (response.status === 200) {
//         console.log('OTP verification successful');
//         setNotification({ message: 'Registration successful!', severity: 'success' });
//         // onSuccess(); // Call onSuccess to update the authentication state
//         setIsRegistered(true);
//         localStorage.setItem('isRegistered', 'true'); // Persist registration status
  
//         // Reset form fields after successful registration
//         setEmail('');
//         setPassword('');
//         setName('');
//         setOtp('');
//         setIsOtpSent(false);
//       } else {
//         console.log('OTP verification failed');
//         throw new Error('Failed verification');
//       }
//     } catch (error) {
//       console.error('Error caught in catch block:', error);
//       setNotification({ message: 'OTP verification failed. Please try again.', severity: 'error' });
//     }
//   };
  
//   // If the user has registered successfully, show the Login component
//   if (isRegistered) {
//     return <Login />; // Render Login component
//   }

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleRegister}>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Register
//         </Button>
//       </form>

//       {isOtpSent && (
//         <form onSubmit={handleVerifyOtp} style={{ marginTop: '20px' }}>
//           <TextField
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             fullWidth
//             required
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Verify OTP
//           </Button>
//         </form>
//       )}

//       <Snackbar
//         open={!!notification.message}
//         message={notification.message}
//         autoHideDuration={6000}
//         onClose={() => setNotification({ message: '', severity: '' })}
//         severity={notification.severity} // Note: Snackbar does not natively support severity, you may need a custom implementation
//       />
//     </Container>
//   );
// };

// export default Register;

// src/Component/Auth/Register.js
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Snackbar, CircularProgress } from '@mui/material';
import axios from 'axios';
import Login from './Login'; // Ensure this imports your Login component

const Register = ({ handleClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [notification, setNotification] = useState({ message: '', severity: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Check if registration is already completed (persisting state)
  useEffect(() => {
    const registrationStatus = localStorage.getItem('isRegistered');
    if (registrationStatus === 'true') {
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await axios.post('http://localhost:8000/api/users/register/', { email, password, name });
      setIsOtpSent(true);
      setNotification({ message: 'OTP sent to your email!', severity: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      setNotification({ message: errorMessage, severity: 'error' });
      console.error('Registration error:', error);
    } finally {
      setLoading(false); // Reset loading regardless of success or failure
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post('http://localhost:8000/api/users/verify-otp/', { email, otp });
      
      console.log('Verification response:', response);  // Log response
      if (response.status === 200) {
        console.log('OTP verification successful');
        setNotification({ message: 'Registration successful!', severity: 'success' });
        setIsRegistered(true);
        localStorage.setItem('isRegistered', 'true'); // Persist registration status
  
        // Reset form fields after successful registration
        setEmail('');
        setPassword('');
        setName('');
        setOtp('');
        setIsOtpSent(false);
      } else {
        console.log('OTP verification failed');
        throw new Error('Failed verification');
      }
    } catch (error) {
      console.error('Error caught in catch block:', error);
      setNotification({ message: 'OTP verification failed. Please try again.', severity: 'error' });
    } finally {
      setLoading(false); 
    }
  };
 
  if (isRegistered) {
    return <Login />; 
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleRegister}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          Register
        </Button>
      </form>

      {isOtpSent && (
        <form onSubmit={handleVerifyOtp} style={{ marginTop: '20px' }}>
          <TextField
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            Verify OTP
          </Button>
        </form>
      )}

    
      {loading && (
        <CircularProgress
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}

      <Snackbar
        open={!!notification.message}
        message={notification.message}
        autoHideDuration={6000}
        onClose={() => setNotification({ message: '', severity: '' })}
        severity={notification.severity} 
      />
    </Container>
  );
};

export default Register;
