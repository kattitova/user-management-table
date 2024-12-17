import { useState } from 'react';
import SearchInputs from '../SearchInput/SearchInputs';
import UsersTable from '../UsersTable/UsersTable';
import './Main.css';
import { useAppDispatch } from '../../store/hooks';
import { setEditMode } from '../../store/usersSlice';

function Main() {
    const dispatch = useAppDispatch();

    const handlerAddUser = () => {
        dispatch(setEditMode(true));
    }

    return (
        <>
            <h1>User Details</h1>
            <button onClick={handlerAddUser}>+ Add New</button>

            <UsersTable />

        </>
    )
}

export default Main;