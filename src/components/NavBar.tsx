import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';

const NavBar: React.FC = () => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box display="flex" px={xs ? 1 : 2}>
      <Box m={1}><Typography style={{ fontWeight: pathname === '/' ? 800 : undefined }}><Link href="/"><a>Ben Werner</a></Link></Typography></Box>
      <Box m={1}><Typography style={{ fontWeight: pathname === '/gallery' ? 800 : undefined }}><Link href="/gallery"><a>Gallery</a></Link></Typography></Box>
    </Box>
  );
};

export default NavBar;
