import { TypeActiviteService } from 'src/services/type-activite.service';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  typeActivites: [],
  typeActivitesContent: 1,
  typeActiviteSearch: '',
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
        state.typeActivites.push(action.payload);
      },
      prepare: (id, title, description) => {
        return { payload: { id, title, description } };
      },
    },
  },
});

export const { SearchTypeActivite, getTypeActivites, SelectTypeActivite, DeleteTypeActivite, UpdateTypeActivite, addTypeActivite } =
  TypeActiviteSlice.actions;

export const fetchTypeActivites = () => async (dispatch) => {
  try {
    const response = await TypeActiviteService.getTypeActivites();
    dispatch(getTypeActivites(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default TypeActiviteSlice.reducer;
