import React, {useState, useEffect} from 'react';
import {useStateValue} from '../../StateProvider';
import {Button, Avatar} from '@material-ui/core';
import Constants from "../Constants";
import {useParams} from 'react-router-dom';
import '../../styles/Profile.css';
import Post from "../Posts/Post";
import FlipMove from "react-flip-move";

const Profile = () => {
    let {userId} = useParams();
    const [{user, token}] = useStateValue();
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getUserProfile();
        getUserPosts();
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

    const getUserPosts = () => {
        window.axios.get(`${Constants.domain}${Constants.getUserPosts}/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
            if (!response.data.errors) {
                setPosts(response.data);
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            console.log(response);
            setErrors(response.data.errors);
        });
    }

    return (
        <div className={`profile profile-${userId}`}>
            {profile ?
                <div className="profileContainer">
                    <div className="row">
                        <div className="col-sm-3">
                            <Avatar className="profileAvatar" src={user.photoUrl}/>
                        </div>
                        <div className="col-sm-9">
                            <h2 className="profileName">{profile.name}</h2>
                            <span className="profileCreated">Joined: {profile.created_at}</span>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {posts.length ?
                            <ul id="postsList" className="postsList profilePostsList">
                                {posts.map(item => (
                                    <Post user={profile} post={item} key={item.id}/>
                                ))}
                            </ul> : <div><h3>No Posts found</h3></div>}
                    </div>
                </div>
                :
                <div className="loadingContainer">
                    Loading...
                </div>}
        </div>
    )
}
export default Profile;
