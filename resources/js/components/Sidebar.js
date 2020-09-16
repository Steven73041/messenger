import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Sidebar.css';
import {useStateValue} from '../StateProvider';
import Constants from "./Constants";

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const [{token, user}] = useStateValue();
    const [error, setError] = useState('');

    useEffect(() => {
        window.axios.get(`${Constants.domain}${Constants.users}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            if (response.data) {
                setUsers(response.data);
            }
        }).catch(response => {
            setError(response.data.toString());
        });
    }, [user]);

    return (
        <div className="homeScreen col-sm-4">
            {error && <div className="errors">{error}</div>}
            {users.length ?
                <ul className="usersList">
                    {users.map(user => (
                        <li key={user.id}>
                            <Link className="chatUser" to={`/chat/${user.email}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul> : null}
        </div>
    );
};
export default Sidebar;
