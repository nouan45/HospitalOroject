import React from 'react';  
import { Box, TextField, Button, Typography } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  // Import useNavigate  

const Register = () => {  
    const navigate = useNavigate();  // Initialize navigate  

    // Handler for Sign Up Button  
    const handleSignUp = () => {  
        // After successful registration logic, navigate to Home page  
        navigate("/home");  
    };  

    return (  
        <Box  
            sx={{  
                display: 'flex',  
                flexDirection: 'column',  
                alignItems: 'center',  
                justifyContent: 'center',  
                width: '300px',  
                margin: 'auto',  
                padding: '20px',  
                borderRadius: '10px',  
                boxShadow: 3,  
                backgroundColor: '#f9f9f9',  
            }}  
        >  
            <Typography variant="h4" component="h1" gutterBottom>  
                Sign Up  
            </Typography>  
            <TextField  
                required  
                label="Full Name"  
                variant="outlined"  
                fullWidth  
                margin="normal"  
            />  
            <TextField  
                required  
                label="Email"  
                variant="outlined"  
                type="email"  
                fullWidth  
                margin="normal"  
            />  
            <TextField  
                required  
                label="Password"  
                variant="outlined"  
                type="password"  
                fullWidth  
                margin="normal"  
            />  
            <Button  
                variant="contained"  
                color="primary"  
                fullWidth  
                sx={{ marginTop: "1rem" }} // Optional margin for spacing  
                onClick={handleSignUp}  // Trigger navigate to /home  
            >  
                Sign Up  
            </Button>  
        </Box>  
    );  
};  

export default Register;
