import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser, deleteUser, setEditMode, updateUser, User } from "../../store/usersSlice";
import { checkInputs } from "./inputHandles";

export default function useUsers() {
    const { users } = useAppSelector((state) => state.usersArray);
    const dispatch = useAppDispatch();

    const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteUser(Number(e.currentTarget.name)));
    }

    const [editingUserId, setEditingUserId] = useState<number | null>();
    const [editingData, setEditingData] = useState<Partial<User>>({});

    const handleEditUser = (user: User) => {
        setEditingUserId(user.id);
        setEditingData({ ...user });
    }

    const [errors, setErrors] = useState<Record<string, boolean>>({
        name: false,
        username: false,
        email: false,
        phone: false
    });

    //save editind user data
    const handleSaveUser = () => {
        const isValid = checkInputs(editingData as User, setErrors);
        if (isValid) {
            dispatch(updateUser(editingData as User));
            setEditingUserId(null);
        }
    }

    //get new user id
    const newUserId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 0;

    const [newUser, setNewUser] = useState<User>({
        id: newUserId,
        name: '',
        username: '',
        email: '',
        phone: ''
    });

    const handleAddUser = () => {
        const isValid = checkInputs(newUser, setErrors);
        if (isValid) dispatch(addUser({ user: newUser, isAdding: false }));
    }

    const handleCancel = () => {
        dispatch(setEditMode(false));
    }

    return {
        editingUserId,
        editingData,
        setEditingData,
        errors,
        setErrors,
        handleDeleteUser,
        handleSaveUser,
        handleEditUser,
        handleAddUser,
        handleCancel,
        newUserId,
        newUser,
        setNewUser,
    }

}