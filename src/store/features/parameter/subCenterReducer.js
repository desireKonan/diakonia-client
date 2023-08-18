import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubCenterService } from 'src/services/subCenter.service';

export const fetchSubCenters = createAsyncThunk('subCenter/fetchSubCenters', () => {
  return SubCenterService.getSubCenters();
});

export const fetchSubCenterById = createAsyncThunk('subCenter/fetchSubCenterById', (id) => {
  return SubCenterService.getSubCenter(id);
});

const subCenterState = {
  loading: true,
  subCenters: [
    {id : 1, name: 'District'}
  ],
  error: ''
}


export const subCenterSlice = createSlice({
  name: 'subCenters',
  initialState: subCenterState,
  reducers: {
        saveSubCenter(state, action) {
          let subCenter = action.payload;
          state.subCenters.push(subCenter);
        },

        getSubCenter(state, action) {
          let subCenter = action.payload;
          return state.subCenters.filter(r => r.id === subCenter.id);
        },

        getSubCenters(state, action) {
          state.subCenters = action.payload;
        },

        deleteSubCenter(state, action) {
          let id = action.payload;
          state.subCenters = state.subCenters.filter(subCenter => subCenter.id !== id);
        }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubCenters.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSubCenters.fulfilled, (state, action) => {
      state.loading = false;
      state.subCenters = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchSubCenters.rejected, (state, action) => {
      state.loading = false;
      state.subCenters = [];
      state.error   = action.error.message;
    });
  }
})

export const { saveSubCenter, getSubCenter, getSubCenters, deleteSubCenter } = subCenterSlice.actions

export default subCenterSlice.reducer