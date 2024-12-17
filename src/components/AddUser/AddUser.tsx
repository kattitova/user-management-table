import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addUser, queryKeys, setEditMode, User } from "../../store/usersSlice"
import { checkInputs, handleInputChange } from "../../functions";
import './AddUser.css';
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

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

    const [errors, setErrors] = useState({
        name: false,
        username: false,
        email: false,
        phone: false
    });

    const handleAddUser = () => {
        if (checkInputs(newUser, setErrors)) dispatch(addUser({ user: newUser, isAdding: false }));
    }

    const handleCancel = () => {
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
                                onChange={(e) => handleInputChange(e, setNewUser)}
                                placeholder={`Enter ${key}`}
                                className={errors[key] ? 'error' : ''}
                            />
                        </td>
                    )
                })
            }
            <td>
                <button className="save-button" onClick={handleAddUser}><FaCheck /></button>
                <button className="delete-button" onClick={handleCancel}><FaTimes /></button>
            </td>
        </tr>
    )
}