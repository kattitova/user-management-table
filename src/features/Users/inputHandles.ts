import { User } from "../../store/usersSlice";

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

//check inputs on empty value
export const checkInputs = (user: User, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let isValid = true;
    const newErrors: errorsType = {} as errorsType;

    Object.keys(user).forEach((key) => {
        if (user[key as keyof User] === '') {
            newErrors[key as keyof errorsType] = true;
            isValid = false;
        } else newErrors[key as keyof errorsType] = false;
    });

    setErrors(newErrors);

    return isValid;
}