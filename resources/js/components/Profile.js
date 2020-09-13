import React, {useState, useEffect} from 'react';
import {useStateValue} from '../StateProvider';
import {Button} from '@material-ui/core';
import '../styles/Profile.css';
import Sidebar from "./Sidebar";
import Constants from "./Constants";
import {actionTypes} from "../reducer";

const Profile = () => {
    const [{user, token}, dispatch] = useStateValue();
    const [photoUrl, setPhotoUrl] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setPhotoUrl(user.photoUrl);
        setName(user.name);
    }, [user]);

    const updateProfile = (e) => {
        e.preventDefault();
        let data = {};
        if (name.length) data.name = name;
        if (password && confirmPassword) {
            data.password = password;
            data.password_confirmation = confirmPassword;
        }
        if (photoUrl.length) data.photoUrl = photoUrl;
        window.axios.put(`${Constants.domain}${Constants.updateProfile}`, data, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            if (!response.data.errors) {
                dispatch({
                    type: actionTypes.SET_USER_TERM,
                    user: response.data.user,
                });
                setErrors(null);
                let successMessage = window.document.querySelector('span.successMessage');
                successMessage.style.opacity = 1;
                setTimeout(function () {
                    successMessage.style.opacity = 0;
                }, 3000);
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });
    };

    return (
        <div>
            {errors ? <ul className="errors">
                {errors.map(error =>
                    <li key={error}>{error}</li>
                )}</ul> : null}
            <div className="editProfile row">

                <Sidebar/>

                <div className="col-sm-8">
                    <form className="editProfileForm">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="photoUrl">Photo URL</label>
                                <input type="text" onChange={e => setPhotoUrl(e.target.value)} id="photoUrl"
                                       value={photoUrl} className="form-control"/>
                            </div>
                            <div className="col">
                                <label htmlFor="name">Name</label>
                                <input type="text" onChange={e => setName(e.target.value)} id="name"
                                       value={name} className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={e => setPassword(e.target.value)}
                                       id="password" className="form-control" value={password}/>
                            </div>
                            <div className="col">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword"
                                       onChange={e => setConfirmPassword(e.target.value)}
                                       value={confirmPassword} className="form-control"/>
                            </div>
                        </div>
                        <Button onClick={e => updateProfile(e)} className="updateButton btn btn-submit">Update</Button>
                        <span className="successMessage">Updated!</span>
                    </form>
                </div>

            </div>
        </div>
    )
};
export default Profile;
