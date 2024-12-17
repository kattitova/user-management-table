import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface Query {
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
}

export const queryKeys: (keyof Query)[] = ['name', 'username', 'email', 'phone'];

export interface UsersState {
    users: User[];
    searchQueries: Query;
    isAdding: boolean;
}

const initialState: UsersState = {
    users: [],
    searchQueries: {},
    isAdding: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<{ user: User, isAdding: boolean }>) => {
            state.users.push(action.payload.user);
            state.isAdding = action.payload.isAdding;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.isAdding = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const ind = state.users.findIndex((user) => user.id === action.payload.id);
            state.users[ind] = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        },
        searchUser: (state, action: PayloadAction<{ title: keyof Query, query: string }>) => {
            state.searchQueries[action.payload.title] = (action.payload.query);
        },
    },
})

export const { setUsers, addUser, setEditMode, updateUser, searchUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;