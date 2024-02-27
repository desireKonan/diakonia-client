import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TypeRencontreService } from 'src/services/type-rencontre.service';

export const fetchTypeRencontres = createAsyncThunk('typeRencontre/fetchTypeRencontres', () => {
  return TypeRencontreService.getTypeRencontres();
});

export const fetchTypeRencontreById = createAsyncThunk('typeRencontre/fetchTypeRencontreById', (id) => {
  return TypeRencontreService.getTypeRencontre(id);
});

const typeRencontreState = {
  loading: true,
  typeRencontres: [],
  error: ''
}


export const typeRencontreSlice = createSlice({
  name: 'typeRencontres',
  initialState: typeRencontreState,
  reducers: {
        saveTypeRencontre(state, action) {
          let typeRencontre = action.payload;
          state.typeRencontres.push(typeRencontre);
        },

        getTypeRencontre(state, action) {
          let typeRencontre = action.payload;
          return state.typeRencontres.filter(r => r.id === typeRencontre.id);
        },

        getTypeRencontres(state, action) {
          state.typeRencontres = action.payload;
          console.log(state.typeRencontres, action.payload);
        },

        deleteTypeRencontre(state, action) {
          let id = action.payload;
          state.typeRencontres = state.typeRencontres.filter(typeRencontre => typeRencontre.id !== id);
        }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypeRencontres.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTypeRencontres.fulfilled, (state, action) => {
      state.loading = false;
      state.typeRencontres = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchTypeRencontres.rejected, (state, action) => {
      state.loading = false;
      state.typeRencontres = [];
      state.error   = action.error.message;
    });
  }
})

export const { saveTypeRencontre, getTypeRencontre, getTypeRencontres, deleteTypeRencontre } = typeRencontreSlice.actions;

export default typeRencontreSlice.reducer;