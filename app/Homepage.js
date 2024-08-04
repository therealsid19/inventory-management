'use client';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Footer from './footer'; // Adjust the path if necessary

export default function Homepage() {
  const router = useRouter();

  const navigateToInventory = () => {
    router.push('/inventory');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      padding={4}
      sx={{
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Example gradient
        paddingBottom: '100px', // Space for the fixed footer
        marginLeft: '-8px',
        width:'96.1%'
      }}
    >
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginBottom={2}
      >
        <Typography variant="h1" gutterBottom>
          Welcome to Inventory Management
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Manage your inventory with ease and efficiency. Add, remove, and track items in real-time.
        </Typography>

      </Box>

      {/* Include the Footer component */}
      <Footer />
    </Box>
  );
}
