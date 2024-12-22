import { useAppSelector } from "../../store/hooks";
import { Query, User } from "../../store/usersSlice";

export default function useFilterUsers() {
    const { users, searchQueries } = useAppSelector((state) => state.usersArray);

    //filter users by name, username, email, phone
    const filteredUsers = users.filter((user: User) => {
        const queriesArray = Object.keys(searchQueries) as (keyof Query)[];
        if (queriesArray.length > 0) {
            return queriesArray.every((query) => {
                const searchValue = searchQueries[query];
                if (!searchValue) return true;
                return user[query].toLowerCase().includes(searchValue.toLowerCase());
            });
        }
        return true;
    });

    return { filteredUsers };
}