import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserTypes {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface UsersState {
    users: UserTypes[];
}

const initialState: UsersState = {
    users: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserTypes[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<UserTypes>) => {
            state.users.push(action.payload);
            console.log(state);
        },
        findByName: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
        },
    },
})

export const { setUsers, addUser, findByName } = usersSlice.actions;
export default usersSlice.reducer;