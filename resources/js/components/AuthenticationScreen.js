import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import '../styles/AuthenticationScreen.css';
import {useStateValue} from '../StateProvider';
import Constants from './Constants';
import {actionTypes} from '../reducer';

const AuthenticationScreen = () => {
    //login
    const [loginMail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    //errors
    const [errors, setErrors] = useState('');

    //register
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    //state control
    const [{}, dispatch] = useStateValue();

    const createAccount = (e) => {
        e.preventDefault();
        window.axios.post(`${Constants.domain}${Constants.register}`, {
            name: name,
            email: email,
            password: password,
            photoUrl: photoUrl,
            password_confirmation: confirmPassword
        }).then(response => {
            if (!response.data.errors) {
                dispatch({
                    type: actionTypes.SET_TOKEN_TERM,
                    token: response.data.token,
                });
                dispatch({
                    type: actionTypes.SET_USER_TERM,
                    user: response.data.user,
                });
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.errors);
        });

    };

    const login = (e) => {
        e.preventDefault();
        window.axios.post(`${Constants.domain}${Constants.login}`, {
            email: loginMail,
            password: loginPassword,
        }).then(response => {
            if (!response.data.errors) {
                dispatch({
                    type: actionTypes.SET_TOKEN_TERM,
                    token: response.data.token,
                });
                dispatch({
                    type: actionTypes.SET_USER_TERM,
                    user: response.data.user,
                });
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });

    };

    return (
        <>
            {errors ? errors.map(error => <ul className="registerErrors">
                <li key={error}>{error}</li>
            </ul>) : null}
            <div className="authScreen row">
                <div className="col-md-6">
                    <div className="login">
                        <h2>Login</h2>
                        <form className="loginForm">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="login_email">Email</label>
                                    <input type="email" onChange={e => setLoginEmail(e.target.value)}
                                           id="login_email" className="form-control" value={loginMail} required/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="login_password">Password</label>
                                    <input type="password" onChange={e => setLoginPassword(e.target.value)}
                                           className="form-control"
                                           id="login_password" value={loginPassword} required/>
                                </div>
                            </div>
                            <Button className="loginButton" type="submit" onClick={e => login(e)}>Login</Button>
                        </form>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="register">
                        <h2>Not a user? Register now!</h2>
                        <form className="registerForm" method="POST">

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" onChange={e => setEmail(e.target.value)}
                                           className="form-control" value={email} required id="email"/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" onChange={e => setName(e.target.value)} value={name} id="name"
                                           className="form-control" required/>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <label htmlFor="photoUrl">Photo URL</label>
                                    <input type="text" onChange={e => setPhotoUrl(e.target.value)} id="photoUrl"
                                           className="form-control" value={photoUrl}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={e => setPassword(e.target.value)} id="password"
                                           value={password} className="form-control" required/>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirm_password"
                                           onChange={e => setConfirmPassword(e.target.value)}
                                           value={confirmPassword}
                                           required/>
                                </div>
                            </div>

                            <Button className="registerButton" type="submit"
                                    onClick={createAccount}>Register</Button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    );
};
export default AuthenticationScreen;
