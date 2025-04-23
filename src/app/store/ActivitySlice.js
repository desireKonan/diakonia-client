import { createSlice } from "@reduxjs/toolkit";

const ActivitySlice = createSlice({
    name: 'activites',
    initialState: {
      items: [],
      currentPage: 1,
      totalPages: 1,
      totalActivities: 0,
      loading: false,
      error: null,
      lastUpdated: null
    },
    reducers: {
      // Reducers synchrones
      updateActivity: (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      },
      deleteActivity: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalActivities -= 1;
      },
      resetActivities: (state) => {
        state.items = [];
        state.currentPage = 1;
        state.totalPages = 1;
        state.totalActivities = 0;
      }
    },
    // extraReducers: (builder) => {
    //   builder
    //     // Gestion du chargement
    //     .addCase(fetchActivitys.pending, (state) => {
    //       state.loading = true;
    //       state.error = null;
    //     })
    //     .addCase(fetchActivitys.fulfilled, (state, action) => {
    //       state.loading = false;
    //       state.items = action.payload.data;
    //       state.currentPage = action.payload.page;
    //       state.totalPages = action.payload.totalPages;
    //       state.totalActivitys = action.payload.totalActivitys;
    //       state.lastUpdated = new Date().toISOString();
    //     })
    //     .addCase(fetchActivitys.rejected, (state, action) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     })
        
    //     // Gestion de l'ajout
    //     .addCase(addActivity.pending, (state) => {
    //       state.loading = true;
    //       state.error = null;
    //     })
    //     .addCase(addActivity.fulfilled, (state, action) => {
    //       state.loading = false;
    //       state.items.unshift(action.payload);
    //       state.totalActivitys += 1;
    //     })
    //     .addCase(addActivity.rejected, (state, action) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     });
    // }
  });
  
  // Export des actions
  export const { updateActivity, deleteActivity, resetList } = ActivitySlice.actions;
  
  // Export du reducer
  export default ActivitySlice.reducer;