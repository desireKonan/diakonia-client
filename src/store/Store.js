import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import assemblyReducer from './features/parameter/assemblyReducer';
import subCenterReducer from './features/parameter/subCenterReducer';
import TypeActiviteReducer from './features/apps/TypeActiviteSlice';
import ActiviteReducer from './features/apps/ActiviteSlice';
import ParticipantReducer from './features/apps/ParticipantSlice';
import DiscipleReducer from './features/apps/DiscipleSlice';
import MemberSlice from './features/effective/MemberSlice';
import RencontreReducer from './rencontreReducer';
import TypeRencontreReducer from './typeRencontreReducer';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    assemblies: assemblyReducer,
    subCenters: subCenterReducer,
    memberSlice: MemberSlice,
    typeActivitesReducer: TypeActiviteReducer,
    activiteReducer: ActiviteReducer,
    participantReducer: ParticipantReducer,
    discipleReducer: DiscipleReducer,
    rencontreReducer: RencontreReducer,
    typeRencontreReducer: TypeRencontreReducer
  },
});

export default store;
