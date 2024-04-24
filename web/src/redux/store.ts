import { logger } from 'redux-logger';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ThemeReducer from './features/themeSlice';
import NotificationReducer from './features/notificationSlice';
import ContractsReducer from './features/contractSlice';
import OrdersReducer from './features/orderSlice';

const rootReducer = combineReducers({
    theme: ThemeReducer,
    notification: NotificationReducer,
    contracts: ContractsReducer,
    orders: OrdersReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
