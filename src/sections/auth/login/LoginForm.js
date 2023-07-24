import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { signin } from '../../../Redux/features/AuthUser';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const { isLogin, loginData } = useSelector((state) => ({
    ...state.auth,
  }));

  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLogin]);

  const handleClick = () => {
    if (!password.length) {
      setIsValid(true);
    }
    if (!email.length) {
      setIsValid(true);
    }
    console.log(email, password);
    return dispatch(signin({ email, password }));
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isValid}
          helperText={isValid ? 'Please fill the password' : ''}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isValid}
          helperText={isValid ? 'Please fill the password' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
