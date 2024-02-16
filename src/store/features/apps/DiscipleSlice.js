import { DiscipleService } from 'src/services/disciple.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: true,
  disciples: [],
  disciplesContent: 1,
  discipleSearch: '',
  error: ''
};

export const DiscipleSlice = createSlice({
  name: 'disciples',
  initialState: initialState,
  reducers: {
    getDisciples: (state, action) => {
      state.disciples = action.payload;
    },
    searchDisciple: (state, action) => {
      state.discipleSearch = action.payload;
    },
    selectDisciple: (state, action) => {
      state.disciplesContent = action.payload;
    },
    deleteDisciple(state, action) {
      const index = state.disciples.findIndex((disciple) => disciple.id === action.payload);
      state.disciples.splice(index, 1);
    },
    updateDisciple: {
      reducer: (state, action) => {
        state.disciples = state.disciples.map((disciple) =>
          disciple.id === action.payload.id
            ? { ...disciple, [action.payload.field]: action.payload.value }
            : disciple,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addDisciple: {
      reducer: (state, action) => {
        if(action.payload.id) {
          let disciple = state.disciples.find(disciple => disciple.id === action.payload.id);
          disciple = action.payload;
        } else {
          state.disciples.push(action.payload);
        }
      },
      prepare: (id, title, description) => {
        return { payload: { id, title, description } };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDisciples.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchDisciples.fulfilled, (state, action) => {
      state.loading = false;
      state.disciples = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchDisciples.rejected, (state, action) => {
      state.loading = false;
      state.disciples = [];
      state.error   = action.error.message;
    });
  }
});

export const fetchDisciples = createAsyncThunk(`disciple/fetchDisciples`, () => {
  return DiscipleService.getDisciples();
});

export const fetchDiscipleById = createAsyncThunk(`disciple/fetchDiscipleById`, (id) => {
  return DiscipleService.getDisciple(id);
});

export const { searchDisciple, getDisciples, selectDisciple, deleteDisciple, updateDisciple, addDisciple } = DiscipleSlice.actions;

export default DiscipleSlice.reducer;
