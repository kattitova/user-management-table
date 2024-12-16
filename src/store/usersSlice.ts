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
}

const initialState: UsersState = {
    users: [],
    searchQueries: {},
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.username !== action.payload)
        },
        searchUser: (state, action: PayloadAction<{ title: keyof Query, query: string }>) => {
            state.searchQueries[action.payload.title] = (action.payload.query);
        },
    },
})

export const { setUsers, addUser, searchUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;