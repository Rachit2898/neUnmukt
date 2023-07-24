import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/AuthUser';
import userReducer from '../features/User';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
