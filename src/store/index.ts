import {configureStore} from '@reduxjs/toolkit';
import {reducers} from './reducers';
import {IChat} from './reducers/messages/types';
import {IUser} from './reducers/user/types';

// Store configuration
export interface StoreState {
  user: IUser;
  messages: IChat[];
}

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export {store};
