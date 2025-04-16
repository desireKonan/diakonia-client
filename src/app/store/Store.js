import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ActivityReducer from './ActivitySlice';


export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    activity: ActivityReducer
  },
});

export default store;
