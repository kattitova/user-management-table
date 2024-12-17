import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Query, queryKeys, setUsers, User, deleteUser, updateUser } from "../../store/usersSlice";
import getUsers from "../../api/api";
import AddUser from "../AddUser/AddUser";
import SearchInputs from "../SearchInput/SearchInputs";
import "./UsersTable.css";
import { checkInputs, handleInputChange } from "../../functions";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

export default function UsersTable() {
    const { users, searchQueries, isAdding } = useAppSelector((state) => state.usersArray);
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

    const [newUserId, setNewUserId] = useState<number>(0);
    useEffect(() => {
        if (filteredUsers.length > 0)
            setNewUserId(filteredUsers[filteredUsers.length - 1].id + 1);
    }, [filteredUsers]);

    const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteUser(Number(e.currentTarget.name)));
    }

    const [editingUserId, setEditingUserId] = useState<number | null>();
    const [editingData, setEditingData] = useState<Partial<User>>({});

    const handleEditUser = (user: User) => {
        setEditingUserId(user.id);
        setEditingData({ ...user });
    }

    const [errors, setErrors] = useState({
        name: false,
        username: false,
        email: false,
        phone: false
    });

    //save editind user data
    const handleSaveUser = () => {
        if (checkInputs(editingData as User, setErrors)) {
            dispatch(updateUser(editingData as User));
            setEditingUserId(null);
        }
    }

    //create users list for rendering
    const list = filteredUsers.map((user: User) => {
        return (
            <tr className="table-row" key={user.id}>
                {
                    queryKeys.map((key) => {
                        return (
                            <td key={key} className={key}>
                                {editingUserId === user.id
                                    ?
                                    (<input
                                        name={key}
                                        value={editingData[key]}
                                        onChange={(e) => handleInputChange(e, setEditingData)}
                                        placeholder={`Enter ${key}`}
                                        className={errors[key] ? 'error' : ''}
                                    />)
                                    :
                                    (user[key])
                                }

                            </td>
                        )
                    })
                }
                <td>
                    {editingUserId === user.id
                        ?
                        (<button className="save-button" name={`${user.id}`} onClick={() => handleSaveUser()}><FaCheck /></button>)
                        :
                        (<button className="edit-button" name={`${user.id}`} onClick={(e) => handleEditUser(user)}><FaPencilAlt /></button>)
                    }
                    <button className="delete-button" name={`${user.id}`} onClick={(e) => handleDeleteUser(e)}><FaTrash /></button>
                </td>
            </tr>
        )
    });

    return (
        <table>
            <thead className="table-header">
                <tr>
                    {
                        queryKeys.map((key) => {
                            return (
                                <th key={key}>{key}</th>
                            )
                        })
                    }
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <SearchInputs />
                {list}
                {isAdding && (<AddUser newUserId={newUserId} />)}
            </tbody>
        </table>
    )
}