// app/homepage.js
'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';

export default function Homepage() {
  const router = useRouter();

  const navigateToInventory = () => {
    router.push('/inventory');
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2}
    >
      <Typography variant="h2">Welcome to Inventory Management</Typography>
      <Button variant="contained" color="primary" onClick={navigateToInventory}>
        Go to Inventory
      </Button>
    </Box>
  );
}
