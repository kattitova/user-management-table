import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Query, queryKeys, setUsers, User, deleteUser } from "../../store/usersSlice";
import getUsers from "../../api/api";

export default function UsersTable() {
    const { users, searchQueries } = useAppSelector((state) => state.usersArray);
    const dispatch = useAppDispatch();

    useEffect(() => {
        //get users from the endpoint and use only needed information
        getUsers().then(users => {
            const selectedUsers = users.map(({ id, name, username, email, phone }: User) => ({ id, name, username, email, phone }));
            dispatch(setUsers(selectedUsers));
        });
    }, []);

    //filter users by name, username, email, phone
    const filteredUsers = users.filter((user: User) => {
        const queriesArray = Object.keys(searchQueries) as (keyof Query)[];
        if (queriesArray.length > 0) {
            return queriesArray.every((query) => {
                const searchValue = searchQueries[query];
                if (!searchValue) return true;
                return user[query].toLowerCase().includes(searchValue.toLowerCase());
            });
        }
        return true;
    });

    const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteUser(e.currentTarget.id));
    }

    //create users list for rendering
    const list = filteredUsers.map((user: User) => {
        return (
            <tr className="table-row" key={user.id}>
                {
                    queryKeys.map((key) => {
                        return (
                            <td key={key} className={key}>{user[key]}</td>
                        )
                    })
                }
                <td><button id={user.username} onClick={(e) => handleDeleteUser(e)}>Delete</button></td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    {
                        queryKeys.map((key) => {
                            return (
                                <td key={key}>{key}</td>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}