import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

//
const token = localStorage.getItem('token');

const initialState = {
  loginData: {},
  loading: false,
  isLogin: false,
  isSubmitted: false,
  jwtToken: token,
  getShiftReportData: {},
};

export const signin = createAsyncThunk('signin', async (body) => {
  const url = 'http://sathiunmuktapp-env.eba-pp925g5c.ap-south-1.elasticbeanstalk.com/authenticate';

  const credentials = {
    userName: body.email,
    password: body.password,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(async (data) => {
      if (data.ok) {
        const value = await data.json();

        const token = data.headers.get('Authorization');

        // Store the token in localStorage
        if (token !== null) {
          localStorage.setItem('token', token);
        }
        localStorage.setItem('data', JSON.stringify(value));

        return value;
      }
      return 'error';
    })
    .catch((error) => {
      return error;
    });

  return response;
});

export const submit = createAsyncThunk('submit', async ({ body }) => {
  const url = 'http://sathiunmuktapp-env.eba-pp925g5c.ap-south-1.elasticbeanstalk.com/shiftReportProd';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(async (data) => {
      if (data.ok) {
        const value = await data.json();
        return value;
      }
      return 'error';
    })
    .catch((error) => {
      return error;
    });

  return response;
});

const authReducer = createSlice({
  name: 'token',
  initialState,

  reducers: {
    authenticate: (state, action) => {
      state.loading = true;
      const storedToken = action.payload;

      if (storedToken) {
        const jwtTokenDecoded = jwtDecode(storedToken);

        if (jwtTokenDecoded.exp * 1000 < Date.now()) {
          localStorage.removeItem();
          state.isAuthenticated = false;
          state.jwtToken = '';
          state.loginData = {};
          state.loading = false;
          state.isLogin = false;
          state.isSubmitted = false;
        } else {
          state.jwtToken = storedToken;
          state.isLogin = true;
        }
      } else {
        state.jwtToken = '';
        state.loginData = {};
        state.loading = false;
        state.isLogin = false;
        state.isSubmitted = false;
      }
    },
    logout: (state, action) => {
      localStorage.removeItem('token');
      state.loginData = {};
      state.loading = false;
      state.isLogin = false;
      state.isSubmitted = false;
      state.jwtToken = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;

        if (action.payload?.firstName) {
          state.isLogin = true;
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submit.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(submit.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubmitted = true;
      })
      .addCase(submit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { authenticate, logout } = authReducer.actions;

export default authReducer.reducer;
