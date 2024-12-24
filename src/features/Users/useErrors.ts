import { useState } from "react";
import { User } from "../../store/usersSlice";

type errorsType = {
    name: boolean;
    username: boolean;
    email: boolean;
    phone: boolean;
}

export default function useErrors() {
    const [errors, setErrors] = useState<Record<string, boolean>>({
        name: false,
        username: false,
        email: false,
        phone: false
    });

    const validInputs = (user: User) => {
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

    return {
        errors,
        validInputs
    }
}
