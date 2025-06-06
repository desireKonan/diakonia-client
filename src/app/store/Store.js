import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ActivityReducer from './ActivitySlice';
import AuthReducer from './AuthSlice';


export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    activity: ActivityReducer,
    auth: AuthReducer
  },
});

export default store;
