import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegionService } from 'src/services/region.service';

export const fetchRegions = createAsyncThunk('region/fetchRegions', () => {
  return RegionService.getRegions();
});

export const fetchRegionById = createAsyncThunk('region/fetchRegionById', (id) => {
  return RegionService.getRegion(id);
});

const regionState = {
  loading: true,
  regions: [
    {id : 1, label: 'District'}
  ],
  error: ''
}


export const regionSlice = createSlice({
  name: 'regions',
  initialState: regionState,
  reducers: {
        saveRegion(state, action) {
          let region = action.payload;
          state.regions.push(region);
        },

        getRegion(state, action) {
          let region = action.payload;
          return state.regions.filter(r => r.id === region.id);
        },

        getRegions(state, action) {
          state.regions = action.payload;
        },

        deleteRegion(state, action) {
          let id = action.payload;
          state.regions = state.regions.filter(region => region.id !== id);
        }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchRegions.fulfilled, (state, action) => {
      state.loading = false;
      state.regions = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchRegions.rejected, (state, action) => {
      state.loading = false;
      state.regions = [];
      state.error   = action.error.message;
    });
  }
})

export const { saveRegion, getRegion, getRegions, deleteRegion } = regionSlice.actions

export default regionSlice.reducer