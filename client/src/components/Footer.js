import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MUILink from '@mui/material/Link';
import { GitHub, Email, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Footer = () => (
  <Box component="footer" bgcolor="#131516" color="#d8d4cf">
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="column" spacing={1}>
            
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" color="#777676">
                To inspire powerful conversations and collaborations among
                members worldwide so together we can change the world with
                creativity.
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: 'column' }}
            spacing={2}
            justifyContent="space-between">
            <Typography variant="h5" color="#fff">
              Reach Us
            </Typography>
            <Stack>
              <Typography variant="caption" color="#777676">
                Email: contact@vita-app.tech
              </Typography>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Privacy Policy
                </MUILink>
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ sm: 'row', xs: 'column-reverse' }}
          alignItems="center"
          spacing={{ xs: 1, sm: 106 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="caption" color="#777676">
              &copy; Copyright 2022 
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link to="#">
              <GitHub />
            </Link>
            <Link to="#">
              <LinkedIn />
            </Link>
            <Link to="#">
              <Email />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default Footer;