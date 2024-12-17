import { useAppDispatch } from "../../store/hooks";
import { setEditMode } from "../../store/usersSlice";
import "./Header.css";
import { FaPlusCircle } from "react-icons/fa";

type propsType = {
    ref: React.RefObject<HTMLElement>;
}

export default function Header({ ref }: propsType) {
    const dispatch = useAppDispatch();

    const handlerAddUser = () => {
        dispatch(setEditMode(true));
        window.scrollTo({
            top: ref.current?.offsetTop,
            behavior: "smooth"
        })
    }

    return (
        <header>
            <h1>User Details</h1>
            <button className="adduser" onClick={handlerAddUser}><FaPlusCircle /> Add New User</button>
        </header>
    )
}