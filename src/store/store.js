import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authSlice from './auth/authSlice'
import { calendarReducer } from './calendar/calendarReducer';
import { uiSliceReducer } from './ui/uiSliceReducer';

const reducer = combineReducers({
    auth: authSlice,
    ui: uiSliceReducer,
    calendar: calendarReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;