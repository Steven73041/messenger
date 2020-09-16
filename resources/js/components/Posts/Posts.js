import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../StateProvider";
import Post from './Post';
import Constants from "../Constants";
import '../../styles/Posts.css';
import PostBox from "./PostBox";
import FlipMove from 'react-flip-move';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState('');
    const [{user, token}] = useStateValue();

    useEffect(() => {
        window.Echo.channel(`posts`).listen(`.NewPost`, (e) => {
            fetchPosts();
        });
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        window.axios.get(`${Constants.domain}${Constants.posts}`, {
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
    };

    return (
        <div className="postsScreen row justify-content-center">
            <div className="posts col-sm-10">
                <PostBox/>
                <div className="postsContainer">
                    {posts.length ?
                        <FlipMove typeName="ul" id="postsList" className="postsList">
                            {posts.map(item => (
                                <Post user={item.user} post={item.post} key={item.post.id}/>
                            ))}
                        </FlipMove> : <div>No Posts found</div>}
                </div>
                {errors ? <ul className="errors">
                    {errors.map(error =>
                        <li key={error}>{error}</li>
                    )}
                </ul> : null}
            </div>
        </div>
    )
}
export default Posts;
