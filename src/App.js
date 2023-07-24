import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './Redux/features/AuthUser';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  const { isLogin } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    const jwtToken = localStorage.getItem('token');

    dispatch(authenticate(jwtToken));
  }, [isLogin]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
