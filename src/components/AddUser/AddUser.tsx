import { queryKeys } from "../../store/usersSlice"
import { handleInputChange } from "../../features/Users/inputHandles";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useUsers from "../../features/Users/useUsers";
import './AddUser.css';
import Tooltip from "../Tooltip/Tooltip";

export default function AddUser() {
    const { errors, newUserId, newUser, setNewUser, handleAddUser, handleCancel } = useUsers();

    return (
        <tr className="table-row" key={newUserId}>
            {
                queryKeys.map((key) => {
                    const isError = errors[key as keyof typeof errors];

                    return (
                        <td key={key} className={key}>
                            <input
                                name={key}
                                value={newUser[key]}
                                onChange={(e) => handleInputChange(e, setNewUser)}
                                placeholder={`Enter ${key}`}
                                className={isError ? 'error' : ''}
                            />
                        </td>
                    )
                })
            }
            <td>
                <button className="save-button" onClick={handleAddUser}>
                    <FaCheck />
                    <Tooltip text='Save' />
                </button>
                <button className="delete-button" onClick={handleCancel}>
                    <FaTimes />
                    <Tooltip text='Cancel' />
                </button>
            </td>
        </tr>
    )
}