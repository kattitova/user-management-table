import { useAppDispatch } from "../../store/hooks";
import { deleteUser } from "../../store/usersSlice";

export default function useDeleteUser() {
    const dispatch = useAppDispatch();

    const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteUser(Number(e.currentTarget.name)));
    }

    return { handleDeleteUser };
}