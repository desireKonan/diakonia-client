import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AssemblyService } from "src/services/assembly.service";

export const fetchAssemblies = createAsyncThunk('assembly/fetchAssemblies', () => {
    return AssemblyService.getAssemblies();
});
  
export const fetchAssemblyById = createAsyncThunk('assembly/fetchAssemblyById', (id) => {
    return AssemblyService.getAssembly(id);
});

const assemblyState = {
    loading: true,
    assemblies: [
      {
        id : 1, 
        name: 'Djibi Tapis rouge', 
        zone : {
            id: 1,
            name: 'Angré'
        }
      }
    ],
    error: ''
}

export const assemblySlice = createSlice({
    name: 'assemblies',
    initialState: assemblyState,
    reducers: {
          saveAssembly(state, action) {
            let assembly = action.payload;
              state.assemblies.push(assembly);
          },
  
          getAssembly(state, action) {
            let assembly = action.payload;
            return state.assemblies.filter(r => r.id === assembly.id);
          },
  
          getAssemblies(state) {
            return state.assemblies;
          },
  
          deleteAssembly(state, action) {
            let id = action.payload;
            return state.assemblies.filter(assembly => assembly.id !== id);
          }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAssemblies.pending, (state) => {
        state.loading = true;
      });
  
      builder.addCase(fetchAssemblies.fulfilled, (state, action) => {
        state.loading = false;
        state.assemblies = action.payload;
        state.error   = '';
      });
  
      builder.addCase(fetchAssemblies.rejected, (state, action) => {
        state.loading = false;
        state.assemblies = [];
        state.error   = action.error.message;
      });
    }
  })
  
  export const { saveAssembly, getAssembly, getAssemblies, deleteAssembly } = assemblySlice.actions
  
  export default assemblySlice.reducer