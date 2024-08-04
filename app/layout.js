'use client'; 
import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { auth } from '@/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <html lang="en">
      <body>
        <Box>
          {!user && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={2}
              bgcolor="#1976d2" 
              color="white"
              position="fixed"
              width="100%"
              top="0"
              zIndex="10"
              marginLeft={'-8px'}
            >
              <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Box sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }}>
                <img src="bg-logo-2.png" alt="IM Logo" style={{ height: '40px' }} />
              </Box>
              </Link>
              <Button variant="outlined" color="inherit" sx={{ marginRight: 5 }}>
                <Link href="/signin" style={{ textDecoration: 'none', color: 'white' }}>
                  Sign In
                </Link>
              </Button>
            </Box>
          )}
          <Box marginTop={!user ? "64px" : "0"}> 
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
