// import React, { useState, useContext } from 'react';
// import { TextField, Button, Container, Snackbar } from '@mui/material';
// import axios from 'axios';
// import { UserContext } from '../../Context/UserContext';
// import { useNavigate } from 'react-router-dom';
// const Login = ({ handleClose }) => {
//     const { login } = useContext(UserContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//           const response = await axios.post('http://localhost:8000/api/users/login/', { email, password }, { withCredentials: true });
  
//           if (response.data && response.data.user) {
//             console.log(response.data.user);
            
//               const userData = { name: response.data.user.username,id: response.data.user.id };
//               setSuccessMessage('Login successful!');
//               console.log(userData);
              
//               login(userData);  // Call login to set user context

//               navigate("/home")
//               handleClose();  // Close modal after login
//           } else {
//               setError('Invalid login credentials.');
//           }
//       } catch (error) {
//           setError('Login failed. Please try again.');
//       }
//   };
  
//     return (
//         <Container maxWidth="sm">
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                     Login
//                 </Button>
//             </form>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             <Snackbar
//                 open={!!successMessage}
//                 message={successMessage}
//                 autoHideDuration={6000}
//                 onClose={() => setSuccessMessage('')}
//             />
//         </Container>
//     );
// };

// export default Login;




import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Snackbar } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleClose }) => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', { email, password }, { withCredentials: true });

            if (response.data && response.data.user) {
                console.log(response.data.user);

                const userData = { name: response.data.user.username, id: response.data.user.id,email: response.data.user.email };
                setSuccessMessage('Login successful!');
                console.log(userData);

                login(userData);  

                navigate("/home")
                handleClose();  
            } else {
                setError('Invalid login credentials.');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        className="bg-gray-100 rounded-lg"
                        InputProps={{
                            classes: {
                                input: 'text-gray-700',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        className="bg-gray-100 rounded-lg"
                        InputProps={{
                            classes: {
                                input: 'text-gray-700',
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Login
                    </Button>
                </form>
                {error && <div className="text-red-600 text-center mt-4">{error}</div>}
            </div>
            <Snackbar
                open={!!successMessage}
                message={successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
            />
        </Container>
    );
};

export default Login;
