import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './userSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: [ 'userName', 'isLoading' ]
};

const rootReducer = combineReducers({
	user: persistReducer(persistConfig, userReducer)
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
			}
		})
});

export const persistor = persistStore(store);
