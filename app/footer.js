'use client';
import { Box, Typography, Link } from '@mui/material';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderTop: '1px solid #ddd',
        background: '#f5f5f5',
      }}
      
    >
      <Box display="flex" gap={2} marginBottom={1}>
        <Link href="https://github.com/therealsid19" target="_blank" color="inherit">
          <FaGithub size={24} />
        </Link>
        <Link href="https://www.linkedin.com/in/siddhant-nair-61186b282" target="_blank" color="inherit">
          <FaLinkedin size={24} />
        </Link>
        <Link href="https://www.instagram.com/therealsid19" target="_blank" color="inherit">
          <FaInstagram size={24} />
        </Link>
      </Box>
      <Typography variant="body2" color="textSecondary">
        © 2024 Pantry Manager. All rights reserved.
      </Typography>
    </Box>
  );
}
