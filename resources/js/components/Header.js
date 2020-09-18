import React, {useEffect, useState} from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom';
import {useStateValue} from '../StateProvider';
import {Button} from "@material-ui/core";
import Constants from './Constants';
import {actionTypes} from '../reducer';

const Header = () => {
    const [{user, token, loading}, dispatch] = useStateValue();
    const [menuItems, setMenuItems] = useState([
        ["Home", "/"],
        ["Read me", "/read-me/"],
    ]);

    useEffect(() => {
    }, []);

    const logout = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_LOADING_TERM,
            loading: true,
        });
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

                dispatch({
                    type: actionTypes.SET_LOADING_TERM,
                    loading: false,
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
            console.log(response);
        });
    };

    const activeMenuItem = (e) => {
        let target = e.target;
        let items = window.document.getElementsByClassName('menuItem');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        target.classList.add('active');
    };

    return (
        <nav className="header navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav w-100">
                    {menuItems.map(item =>
                        <li className={"nav-item"} key={item[1]}>
                            <Link className={`menuItem nav-link ${item[1] === '/' ? `active` : null}`}
                                  onClick={e => activeMenuItem(e)} to={item[1]}>{item[0]}</Link>
                        </li>
                    )}
                    {user ?
                        (<li className={"nav-item"} key={"profile"}>
                            <Link className="menuItem nav-link" onClick={e => activeMenuItem(e)}
                                  to={"/profile/edit"}>Profile</Link>
                        </li>) : null}
                    {user ?
                        (<li className={"nav-item ml-auto"} key={"logout"}>
                            <Button className="menuItem nav-link userLogout btn btn-danger"
                                    onClick={e => (logout(e))}>Logout</Button>
                        </li>) : null}
                </ul>
            </div>
        </nav>
    )
};
export default Header;
