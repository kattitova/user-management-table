import { User } from "../store/usersSlice";

export default async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const selectedUsers = users.map(({ id, name, username, email, phone }: User) => ({ id, name, username, email, phone }));
    return selectedUsers;
}