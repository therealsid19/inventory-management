'use client'; 
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase'; 
import {FaGoogle} from 'react-icons/fa';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/inventory'); 
    } catch (err) {
      setError('Error signing in. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box
      width="97.4%"
      height="78.4vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      padding={3}
      sx={{
        background: 'linear-gradient(to right, #00c6ff, #0072ff)', // Blue gradient
        color: 'white'
      }}
      marginLeft={'-8px'}
    >
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignIn}
        startIcon={<FaGoogle />} // Add Google icon to the button
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        Sign In with Google
      </Button>
    </Box>
  );
}
