import { useAppDispatch } from "../../store/hooks";
import { Query, searchUser, queryKeys } from "../../store/usersSlice";

export default function SearchInputs() {
    const dispatch = useAppDispatch();

    const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(searchUser({ title: e.currentTarget.id as keyof Query, query: e.currentTarget.value }))
    }

    return (
        <tr className="inputs-row">
            {
                queryKeys.map((key) => {
                    return (
                        <td><input id={key} key={key} placeholder={`Search by ${key}`} onChange={(e) => { handleSearchInput(e) }} /></td>
                    )
                })
            }
            <td></td>
        </tr>
    )
}