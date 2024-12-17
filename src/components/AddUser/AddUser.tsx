import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addUser, Query, queryKeys, setEditMode, User } from "../../store/usersSlice"

type PropsType = {
    newUserId: number;
}

export default function AddUser({ newUserId }: PropsType) {
    const dispatch = useAppDispatch();

    const [newUser, setNewUser] = useState<User>({
        id: newUserId,
        name: '',
        username: '',
        email: '',
        phone: ''
    });

    const handleAddUser = () => {
        dispatch(addUser({ user: newUser, isAdding: false }));
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleCancel = () => {
        //end editing
        dispatch(setEditMode(false));
    }

    return (
        <tr className="table-row" key={newUserId}>
            {
                queryKeys.map((key) => {
                    return (
                        <td key={key} className={key}>
                            <input
                                name={key}
                                value={newUser[key]}
                                onChange={(e) => handleInputChange(e)}
                                placeholder={`Enter ${key}`}
                            />
                        </td>
                    )
                })
            }
            <td>
                <button onClick={handleAddUser}>+</button>
                <button onClick={handleCancel}>x</button>
            </td>
        </tr>
    )
}