import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateUser, User } from "../../store/usersSlice";
import useErrors from "./useErrors";

export default function useEditUsers() {
    const dispatch = useAppDispatch();

    const [editingUserId, setEditingUserId] = useState<number | null>();
    const [editingData, setEditingData] = useState<Partial<User>>({});

    const handleEditUser = (user: User) => {
        setEditingUserId(user.id);
        setEditingData({ ...user });
    }

    const { errors, validInputs } = useErrors();

    //save editind user data
    const handleSaveUser = () => {
        const isValid = validInputs(editingData as User);
        if (isValid) {
            dispatch(updateUser(editingData as User));
            setEditingUserId(null);
        }
    }

    return {
        editingUserId,
        editingData,
        setEditingData,
        errors,
        handleSaveUser,
        handleEditUser,
    }

}