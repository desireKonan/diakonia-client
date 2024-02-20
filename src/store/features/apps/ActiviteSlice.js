import { ActiviteService } from 'src/services/activite.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: true,
  activites: [],
  activitesContent: 1,
  activiteSearch: '',
  error: ''
};

export const ActiviteSlice = createSlice({
  name: 'activites',
  initialState: initialState,
  reducers: {
    getActivites: (state, action) => {
      state.activites = action.payload;
    },
    getActivite: (state, action) => {
      return state.activites.find(activite => activite.id === action.payload);
    },
    searchActivite: (state, action) => {
      state.activiteSearch = action.payload;
    },
    selectActivite: (state, action) => {
      state.activitesContent = action.payload;
    },
    deleteActivite(state, action) {
      const index = state.activites.findIndex((activite) => activite.id === action.payload);
      state.activites.splice(index, 1);
    },
    updateActivite: {
      reducer: (state, action) => {
        state.activites = state.activites.map((activite) =>
          activite.id === action.payload.id
            ? { ...activite, [action.payload.field]: action.payload.value }
            : activite,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addActivite: {
      reducer: (state, action) => {
        if(action.payload.id) {
          let activite = state.activites.find(activite => activite.id === action.payload.id);
          activite = action.payload;
        } else {
          state.activites.push(action.payload);
        }
      },
      prepare: (id, title, description) => {
        return { payload: { id, title, description } };
      },
    },
    addParticipant: {
      reducer: (state, action) => {
        let participant = action.payload.id;
        if(participant) {
          let activite = state.activites.find(activite => activite.id === participant.activityId);
          if(activite) {
            let newParticipant = activite.participants.find(p => p.id === participant.id);
            if(newParticipant) {
              newParticipant = participant;
            } else {
              activite.participants.push(participant);
            }
          }
        }
      },
      prepare: (id, fullname, discipleId, details, prevStartDate, prevEndDate, effectiveStartDate, effectiveEndDate) => {
        return { payload: { id, fullname, discipleId, details, prevStartDate, prevEndDate, effectiveStartDate, effectiveEndDate } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivites.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchActivites.fulfilled, (state, action) => {
      state.loading = false;
      state.activites = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchActivites.rejected, (state, action) => {
      state.loading = false;
      state.activites = [];
      state.error   = action.error.message;
    });
  }
});

export const fetchActivites = createAsyncThunk(`activite/fetchActivites`, () => {
  return ActiviteService.getActivites();
});

export const fetchActiviteById = createAsyncThunk(`activite/fetchActiviteById`, (id) => {
  return ActiviteService.getActivite(id);
});

export const { searchActivite, getActivites, selectActivite, deleteActivite, updateActivite, addActivite, addParticipant } = ActiviteSlice.actions;

export default ActiviteSlice.reducer;
