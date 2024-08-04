'use client';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Homepage() {
  const router = useRouter();

  const navigateToInventory = () => {
    router.push('/inventory');
  };

  return (
    <Box
      width="94vw"
      height="75vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#f5f5f5" // Light gray background
      padding={4}
    >
      <Typography variant="h1" gutterBottom>
        Welcome to Inventory Management
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Manage your inventory with ease and efficiency. Add, remove, and track items in real-time.
      </Typography>

    </Box>
  );
}
