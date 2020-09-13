import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Sidebar.css';
import {useStateValue} from '../StateProvider';
import Constants from "./Constants";
import {Button} from "@material-ui/core";
import {actionTypes} from "../reducer";

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const [{token, user}, dispatch] = useStateValue();
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

    const logout = (e) => {
        e.preventDefault();
        window.axios.post(`${Constants.domain}${Constants.logout}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            if (response.data) {
                //remove token
                dispatch({
                    type: actionTypes.SET_TOKEN_TERM,
                    token: null,
                });

                //remove user
                dispatch({
                    type: actionTypes.SET_USER_TERM,
                    user: {},
                });

                //let's remove messages till redirection
                let items = document.querySelectorAll('#messagesList>li');
                items.forEach(item => {
                    item.remove();
                });

                //redirect
                window.location.href = "/";
            }
        }).catch(response => {
            alert(response.data.toString());
        });
    };

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
            <div className="userLogoutButtonContainer">
                <Button className="userLogout btn btn-danger" onClick={e => (logout(e))}>Logout</Button>
            </div>
        </div>
    );
};
export default Sidebar;
