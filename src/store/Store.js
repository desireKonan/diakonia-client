import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/tickets/TicketSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EcommerceReducer from './apps/eCommerce/EcommerceSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import BlogReducer from './apps/blog/BlogSlice';
import regionReducer from './features/parameter/regionReducer';
import assemblyReducer from './features/parameter/assemblyReducer';
import subCenterReducer from './features/parameter/subCenterReducer';
import memberSlice from './features/effective/memberSlice';
import TypeActiviteReducer from './features/apps/TypeActiviteSlice';
import ActiviteReducer from './features/apps/ActiviteSlice';
import ParticipantReducer from './features/apps/ParticipantSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    ecommerceReducer: EcommerceReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
    regions: regionReducer,
    assemblies: assemblyReducer,
    subCenters: subCenterReducer,
    members: memberSlice,
    typeActivitesReducer: TypeActiviteReducer,
    activiteReducer: ActiviteReducer,
    participantReducer: ParticipantReducer
  },
});

export default store;
