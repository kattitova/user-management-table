import { useAppDispatch } from "../../store/hooks";
import { setEditMode } from "../../store/usersSlice";

export default function useCancelUser() {
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        dispatch(setEditMode(false));
    }

    return { handleCancel };
}