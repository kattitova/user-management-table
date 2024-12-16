import './Main.css';

import SearchInputs from '../SearchInput/SearchInputs';
import UsersTable from '../UsersTable/UsersTable';

function Main() {


    const handlerAddUser = () => {
        const newUser = {
            id: 11,
            name: 'John Bin',
            username: 'johnbin',
            email: 'john.bin@gmail.com',
            phone: '1-200-300-400'
        };
        //dispatch(addUser(newUser));
    }

    return (
        <>
            <SearchInputs />

            <button onClick={handlerAddUser}>Add</button>
            <UsersTable />

        </>
    )
}

export default Main;