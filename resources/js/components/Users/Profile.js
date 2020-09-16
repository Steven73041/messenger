import React, {useState, useEffect} from 'react';
import {useStateValue} from '../../StateProvider';
import {Button, Avatar} from '@material-ui/core';
import Constants from "../Constants";
import {useParams} from 'react-router-dom';
import '../../styles/Profile.css';

const Profile = () => {
    let {userId} = useParams();
    const [{user, token}] = useStateValue();
    const [profile, setProfile] = useState({});
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = () => {
        window.axios.get(`${Constants.domain}${Constants.getUser}/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (!response.data.errors) {
                setProfile(response.data);
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });
    }


    return (
        <div className={`profile profile-${userId}`}>
            {profile ?
                <div className="profileContainer">
                    <div className="row">
                        <div className="col-sm-3">
                            <Avatar src={user.photoUrl} />
                        </div>
                        <div className="col-sm-9">

                        </div>
                    </div>
                </div>
                :
                <div className="loadingContainer">
                    Loading
                </div>}
        </div>
    )
}
export default Profile;
