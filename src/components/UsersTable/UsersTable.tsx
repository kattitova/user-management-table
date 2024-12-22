import { queryKeys } from "../../store/usersSlice";
import AddUser from "../AddUser/AddUser";
import SearchInputs from "../SearchInput/SearchInputs";
import UsersList from "./UsersList";
import { useAppSelector } from "../../store/hooks";
import "./UsersTable.css";

export default function UsersTable() {
    const { isAdding } = useAppSelector((state) => state.usersArray);

    return (
        <table>
            <thead className="table-header">
                <tr>
                    {
                        queryKeys.map((key) => {
                            return (
                                <th key={key}>{key}</th>
                            )
                        })
                    }
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <SearchInputs />
                <UsersList />
                {isAdding && (<AddUser />)}
            </tbody>
        </table>
    )
}