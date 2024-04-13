import { logger } from 'redux-logger'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch
