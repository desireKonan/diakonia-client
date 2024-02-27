import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RencontreService } from 'src/services/rencontre.service';

export const fetchRencontres = createAsyncThunk('rencontre/fetchRencontres', () => {
  return RencontreService.getRencontres();
});

export const fetchRencontreById = createAsyncThunk('rencontre/fetchRencontreById', (id) => {
  return RencontreService.getRencontre(id);
});

const rencontreState = {
  loading: true,
  rencontres: [],
  error: ''
}


export const rencontreSlice = createSlice({
  name: 'rencontres',
  initialState: rencontreState,
  reducers: {
        saveRencontre(state, action) {
          let rencontre = action.payload;
          state.rencontres.push(rencontre);
        },

        getRencontre(state, action) {
          let rencontre = action.payload;
          return state.rencontres.filter(r => r.id === rencontre.id);
        },

        getRencontres(state, action) {
          state.rencontres = action.payload;
        },

        deleteRencontre(state, action) {
          let id = action.payload;
          state.rencontres = state.rencontres.filter(rencontre => rencontre.id !== id);
        }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRencontres.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchRencontres.fulfilled, (state, action) => {
      state.loading = false;
      state.rencontres = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchRencontres.rejected, (state, action) => {
      state.loading = false;
      state.rencontres = [];
      state.error   = action.error.message;
    });
  }
})

export const { saveRencontre, getRencontre, getRencontres, deleteRencontre } = rencontreSlice.actions

export default rencontreSlice.reducer