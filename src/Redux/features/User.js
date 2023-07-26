import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//
const token = localStorage.getItem('token');

const initialState = {
  loginData: {},
  loading: false,
  isLogin: false,
  isSubmitted: false,
  getShiftReportData: [],
};

export const getShiftReport = createAsyncThunk('shiftReport', async (body) => {
  const url = `http://sathiunmuktapp-env.eba-pp925g5c.ap-south-1.elasticbeanstalk.com/shiftReportProdDate/${body.newDateFormat}/${body?.shiftValue}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (data) => {
      if (data.ok) {
        const value = await data.json();
        localStorage.setItem('shiftReport', JSON.stringify(value));
        return value;
      }
      return 'error';
    })
    .catch((error) => {
      return error;
    });

  return response;
});
export const updateShiftReport = createAsyncThunk('updateShiftReport', async (body) => {
  console.log('requestssss', body);
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

const userReducer = createSlice({
  name: 'token',
  initialState: {
    dateValue: {},
    shiftValue: {},
  },

  reducers: {
    date: (state, action) => {
      state.dateValue = action.payload;
    },
    shift: (state, action) => {
      state.shiftValue = action.payload;
    },
    clear: (state, action) => {
      state.shiftValue = '';
      state.dateValue = '';
      state.getShiftReportData = [];
      const value = [];
      localStorage.setItem('shiftReport', JSON.stringify(value));
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getShiftReport.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShiftReport.fulfilled, (state, action) => {
        state.loading = false;
        state.getShiftReportData = action.payload;
      })
      .addCase(getShiftReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { date, shift, clear } = userReducer.actions;
export default userReducer.reducer;
