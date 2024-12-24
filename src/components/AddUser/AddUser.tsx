import { queryKeys } from "../../store/usersSlice"
import { handleInputChange } from "../../features/Users/handleInputChange";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Tooltip from "../Tooltip/Tooltip";
import useCancelUser from "../../features/Users/useCancelUser";
import useAddUser from "../../features/Users/useAddUser";
import './AddUser.css';

export default function AddUser() {
    const { errors, newUserId, newUser, setNewUser, handleAddUser } = useAddUser();
    const { handleCancel } = useCancelUser();

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