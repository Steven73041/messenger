import React, {useEffect, useState} from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom';
import {useStateValue} from '../StateProvider';

const Header = () => {
    const [{user}] = useStateValue();
    const [menuItems, setMenuItems] = useState([
        ["Home", "/"],
        ["Read me", "/read-me/"],
    ]);

    useEffect(() => {

    }, []);

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
                <ul className="navbar-nav mr-auto">
                    {menuItems.map(item =>
                        <li className={"nav-item"} key={item[1]}>
                            <Link className={`menuItem nav-link ${item[1] === '/' ? `active` : null}`}
                                  onClick={e => activeMenuItem(e)} to={item[1]}>{item[0]}</Link>
                        </li>
                    )}
                    {user ?
                        <li className={"nav-item"} key={"profile"}>
                            <Link className="menuItem nav-link" onClick={e => activeMenuItem(e)} to={"/profile/edit"}>Profile</Link>
                        </li> : null}
                </ul>
            </div>
        </nav>
    )
};
export default Header;
