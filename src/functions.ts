import { User } from "./store/usersSlice";

//function save input value to local state
export const handleInputChange = (e: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.currentTarget;
    setState((prevState: User) => ({
        ...prevState,
        [name]: value,
    }));
}

type errorsType = {
    name: boolean;
    username: boolean;
    email: boolean;
    phone: boolean;
}

export const checkInputs = (user: User, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let isValid = true;
    Object.keys(user).forEach((key) => {
        if (user[key as keyof User] === '') {
            setErrors((prevState: errorsType) => ({ ...prevState, [key]: true }));
            isValid = false;
        } else setErrors((prevState: errorsType) => ({ ...prevState, [key]: false }));
    });
    return isValid;
}