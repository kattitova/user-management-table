import { useEffect, useState } from 'react';
import './Main.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUsers, addUser, findByName, UserTypes } from '../../store/usersSlice';

async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
}

function Main() {
    const users = useAppSelector((state) => state.usersArray.users);
    const dispatch = useAppDispatch();

    //const [usersArray, setUsersArray] = useState([]);

    useEffect(() => {
        getUsers().then(users => {
            const selectedUsers = users.map((user: UserTypes) => {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                };
            });
            dispatch(setUsers(selectedUsers));
            //setUsersArray(selectedUsers);
        });
    }, []);

    const list = users.map((user: UserTypes) => {
        return (
            <div className="table-row" key={user.id}>
                <div className="id">{user.id}</div>
                <div className="name">{user.name}</div>
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
            </div>
        )
    });

    const handlerAddUser = () => {
        const newUser = {
            id: 11,
            name: 'John Bin',
            username: 'johnbin',
            email: 'john.bin@gmail.com',
            phone: '1-200-300-400'
        };
        dispatch(addUser(newUser));
        //dispatch(findByName('find'));
    }

    return (
        <>
            <button onClick={handlerAddUser}>Add</button>
            <div className="table">{list}</div>
        </>
    )
}

export default Main;