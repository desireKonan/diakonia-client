import mock from './mock';
import './chat/Chatdata';
import './contacts/ContactsData';
import './eCommerce/ProductsData';
import './userprofile/PostData';
import './userprofile/UsersData';
import './language/LanguageData';

mock.onAny().passThrough();
