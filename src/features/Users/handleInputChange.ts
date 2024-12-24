import { User } from "../../store/usersSlice";

//function save input value to local state
export const handleInputChange = (e: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.currentTarget;

    setState((prevState: User) => ({
        ...prevState,
        [name]: value,
    }));
}