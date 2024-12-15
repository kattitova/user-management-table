import { useEffect, useState } from "react";
import "./Main.css";

async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
}

type userTypes = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

function Main() {
    const [usersArray, setUsersArray] = useState([]);
    const [usersTable, setUsersTable] = useState([]);

    useEffect(() => {
        getUsers().then(users => {
            const selectedUsers = users.map((user: userTypes) => {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                };
            });
            setUsersArray(selectedUsers);
        });
    }, []);

    const list = usersArray.map((user: userTypes) => {
        return (
            <div className="table-row">
                <div className="id">{user.id}</div>
                <div className="name">{user.name}</div>
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
            </div>
        )
    });

    return (
        <div className="table">{list}</div>
    )
}

export default Main;