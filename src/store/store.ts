import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

export const store = configureStore({
    reducer: {
        usersArray: usersReducer
    },
});

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>
// Выведенные типы: {users: UsersState}
export type AppDispatch = typeof store.dispatch