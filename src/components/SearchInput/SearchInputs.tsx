import { useAppDispatch } from "../../store/hooks";
import { Query, searchUser, queryKeys } from "../../store/usersSlice";
import { FaSearch } from "react-icons/fa";
import "./SearchInputs.css";

export default function SearchInputs() {
    const dispatch = useAppDispatch();

    const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(searchUser({ title: e.currentTarget.id as keyof Query, query: e.currentTarget.value }))
    }

    return (
        <tr className="search-row">
            {
                queryKeys.map((key) => {
                    return (
                        <td key={`search-${key}`}>
                            <FaSearch />
                            <input id={key} placeholder={`Search by ${key}`} onChange={(e) => { handleSearchInput(e) }} />
                        </td>
                    )
                })
            }
            <td></td>
        </tr>
    )
}