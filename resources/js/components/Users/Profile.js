import React, {useState, useEffect} from 'react';
import {useStateValue} from '../../StateProvider';
import {Avatar} from '@material-ui/core';
import Constants from "../Constants";
import {useParams} from 'react-router-dom';
import '../../styles/Profile.css';
import '../../styles/Posts.css';
import Post from "../Posts/Post";

const Profile = () => {
    let {userId} = useParams();
    const [following, setFollowing] = useState(null);
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
                setFollowing(response.data.following);
                setProfile(response.data.user);
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
            if (!response.data.errors) {
                setPosts(response.data);
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });
    }

    const followingUser = (response) => {
        if (response.data.message === 'followed') {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
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
                            <h2 className="profileName">
                                {profile.name}
                                {user.id !== profile.id && <div className="followButtons">
                                    {!following ?
                                        <a className="btn btn-primary"
                                           onClick={e => Constants.followFunction(e, token, profile.id).then(response => followingUser(response))}>Follow</a>
                                        :
                                        <a className="btn btn-outline-primary"
                                           onClick={e => Constants.unfollowFunction(e, token, profile.id).then(response => followingUser(response))}>Unfollow</a>
                                    }
                                </div>}
                            </h2>
                            <span className="profileCreated">Joined: {profile.created_at}</span>
                        </div>
                    </div>
                    <div className="row justify-content-center postsContainer">
                        {posts.length &&
                        <ul id="postsList" className="postsList profilePostsList">
                            {posts.map(item => (
                                <Post user={profile} post={item} key={item.id}/>
                            ))}
                        </ul>}
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
