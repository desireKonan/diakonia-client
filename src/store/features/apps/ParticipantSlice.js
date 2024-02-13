import { ParticipantService } from 'src/services/participant.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: true,
  participants: [],
  participantsContent: 1,
  participantSearch: '',
  error: ''
};

export const ParticipantSlice = createSlice({
  name: 'participants',
  initialState: initialState,
  reducers: {
    getParticipants: (state, action) => {
      state.participants = action.payload;
    },
    searchParticipant: (state, action) => {
      state.participantSearch = action.payload;
    },
    selectParticipant: (state, action) => {
      state.participantsContent = action.payload;
    },
    deleteParticipant(state, action) {
      const index = state.participants.findIndex((participant) => participant.id === action.payload);
      state.participants.splice(index, 1);
    },
    updateParticipant: {
      reducer: (state, action) => {
        state.participants = state.participants.map((participant) =>
          participant.id === action.payload.id
            ? { ...participant, [action.payload.field]: action.payload.value }
            : participant,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addParticipant: {
      reducer: (state, action) => {
        if(action.payload.id) {
          let participant = state.participants.find(participant => participant.id === action.payload.id);
          participant = action.payload;
        } else {
          state.participants.push(action.payload);
        }
      },
      prepare: (id, title, description) => {
        return { payload: { id, title, description } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchParticipants.fulfilled, (state, action) => {
      state.loading = false;
      state.participants = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchParticipants.rejected, (state, action) => {
      state.loading = false;
      state.participants = [];
      state.error   = action.error.message;
    });
  }
});

export const fetchParticipants = createAsyncThunk(`participant/fetchParticipants`, () => {
  return ParticipantService.getParticipants();
});

export const fetchParticipantById = createAsyncThunk(`participant/fetchParticipantById`, (id) => {
  return ParticipantService.getParticipant(id);
});

export const { searchParticipant, getParticipants, selectParticipant, deleteParticipant, updateParticipant, addParticipant } = ParticipantSlice.actions;

export default ParticipantSlice.reducer;
