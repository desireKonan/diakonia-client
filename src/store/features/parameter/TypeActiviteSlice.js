import { TypeActiviteService } from 'src/services/type-activite.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: true,
  typeActivites: [],
  typeActivitesContent: 1,
  typeActiviteSearch: '',
  error: ''
};

export const TypeActiviteSlice = createSlice({
  name: 'typeActivites',
  initialState: initialState,
  reducers: {
    getTypeActivites: (state, action) => {
      state.typeActivites = action.payload;
    },
    SearchTypeActivite: (state, action) => {
      state.typeActiviteSearch = action.payload;
    },
    SelectTypeActivite: (state, action) => {
      state.typeActivitesContent = action.payload;
    },

    DeleteTypeActivite(state, action) {
      const index = state.typeActivites.findIndex((typeActivite) => typeActivite.id === action.payload);
      state.typeActivites.splice(index, 1);
    },

    UpdateTypeActivite: {
      reducer: (state, action) => {
        state.typeActivites = state.typeActivites.map((typeActivite) =>
          typeActivite.id === action.payload.id
            ? { ...typeActivite, [action.payload.field]: action.payload.value }
            : typeActivite,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },

    addTypeActivite: {
      reducer: (state, action) => {
        if(action.payload.id) {
          let typeActivite = state.typeActivites.find(typeActivite => typeActivite.id === action.payload.id);
          typeActivite = action.payload;
        } else {
          state.typeActivites.push(action.payload);
        }
      },
      prepare: (id, title, description) => {
        return { payload: { id, title, description } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypeActivites.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTypeActivites.fulfilled, (state, action) => {
      state.loading = false;
      state.typeActivites = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchTypeActivites.rejected, (state, action) => {
      state.loading = false;
      state.typeActivites = [];
      state.error   = action.error.message;
    });
  }
});

export const fetchTypeActivites = createAsyncThunk(`typeActivite/fetchTypeActivites`, () => {
  return TypeActiviteService.getTypeActivites();
});

export const fetchTypeActiviteById = createAsyncThunk(`typeActivite/fetchTypeActiviteById`, (id) => {
  return TypeActiviteService.getTypeActivite(id);
});

export const { SearchTypeActivite, getTypeActivites, SelectTypeActivite, DeleteTypeActivite, UpdateTypeActivite, addTypeActivite } =
  TypeActiviteSlice.actions;

export default TypeActiviteSlice.reducer;
