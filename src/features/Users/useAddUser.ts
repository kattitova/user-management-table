import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser, User } from "../../store/usersSlice";
import useErrors from "./useErrors";

export default function useAddUser() {
    const { users } = useAppSelector((state) => state.usersArray);
    const dispatch = useAppDispatch();

    //get new user id
    const newUserId = users.length > 0 ? Math.max(...users.map((u: User) => u.id)) + 1 : 0;

    const [newUser, setNewUser] = useState<User>({
        id: newUserId,
        name: '',
        username: '',
        email: '',
        phone: ''
    });

    const { errors, validInputs } = useErrors();

    const handleAddUser = () => {
        const isValid = validInputs(newUser);
        if (isValid) dispatch(addUser({ user: newUser, isAdding: false }));
    }

    return {
        errors,
        newUserId,
        newUser,
        setNewUser,
        handleAddUser
    }
}
