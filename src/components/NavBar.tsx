import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const NAV_BAR_HEIGHT = 40;

const NavBar: React.FC = () => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box display="flex" justifyContent="space-between" px={xs ? 1 : 2} height={40}>
      <Box display="flex">
        <Box m={1}>
          <Typography>
            <Link href="/">
              <a style={{ fontWeight: pathname === '/' ? 800 : 400 }}>BW</a>
            </Link>
          </Typography>
        </Box>
        <Box m={1}>
          <Typography>
            <Link href="/gallery">
              <a style={{ fontWeight: pathname === '/gallery' ? 800 : 400 }}>Gallery</a>
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Box m={1}>
          <Typography>
            <Link href="/contact">
              <a style={{ fontWeight: pathname === '/contact' ? 800 : 400 }}>
                Contact
              </a>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
