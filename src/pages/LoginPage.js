import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledCenteredBox = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const StyledAnotherBox = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480, // Adjust the initial max width for smaller screens
  padding: theme.spacing(4),
  boxShadow: theme.shadows[10],
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    maxWidth: 600, // Set a larger max width for 'md' breakpoint and above
  },
}));

// ...

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Card xs={{ p: 3 }}>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <StyledRoot>
        <StyledCenteredBox>
          <Container maxWidth="sm">
            <StyledAnotherBox>
              <LoginForm />
            </StyledAnotherBox>
          </Container>
        </StyledCenteredBox>
      </StyledRoot>
    </Card>
  );
}
