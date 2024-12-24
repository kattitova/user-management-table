import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import useEditUsers from "../../features/Users/useEditUsers";
import { handleInputChange } from "../../features/Users/handleInputChange";
import { queryKeys, User } from "../../store/usersSlice";
import useFilterUsers from "../../features/Users/useFilterUsers";
import Tooltip from "../Tooltip/Tooltip";
import useDeleteUser from "../../features/Users/useDeleteUser";

export default function UsersList() {
    const {
        editingUserId,
        editingData,
        setEditingData,
        errors,
        handleSaveUser,
        handleEditUser,
    } = useEditUsers();

    const { filteredUsers } = useFilterUsers();
    const { handleDeleteUser } = useDeleteUser();

    return (
        <>
            {
                filteredUsers.map((user: User) => {
                    return (
                        <tr className="table-row" key={user.id}>
                            {
                                queryKeys.map((key) => {
                                    const isError = errors[key as keyof typeof errors];

                                    return (
                                        <td key={key} className={key}>
                                            {editingUserId === user.id
                                                ?
                                                (
                                                    <input
                                                        name={key}
                                                        value={editingData[key]}
                                                        onChange={(e) => handleInputChange(e, setEditingData)}
                                                        placeholder={`Enter ${key}`}
                                                        className={isError ? 'error' : ''}
                                                    />
                                                )
                                                :
                                                (user[key])
                                            }

                                        </td>
                                    )
                                })
                            }
                            <td className="action-column">
                                {editingUserId === user.id
                                    ?
                                    (<button
                                        className="save-button"
                                        name={`${user.id}`}
                                        onClick={() => handleSaveUser()}
                                    >
                                        <FaCheck />
                                        <Tooltip text='Save' />
                                    </button>)
                                    :
                                    (<button
                                        className="edit-button"
                                        name={`${user.id}`}
                                        onClick={(e) => handleEditUser(user)}
                                    >
                                        <FaPencilAlt />
                                        <Tooltip text='Edit' />
                                    </button>)
                                }
                                <button
                                    className="delete-button"
                                    name={`${user.id}`}
                                    onClick={(e) => handleDeleteUser(e)}
                                >
                                    <FaTrash />
                                    <Tooltip text='Delete' />
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}