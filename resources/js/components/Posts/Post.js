import React, {forwardRef} from 'react';
import {Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';

const Post = forwardRef(({user, post}, ref) => {
    return (
        <div className="post" ref={ref}>

            <Link to={`profile/${user.id}`} className="postProfileLink">
                <div className="post__header row align-items-center">
                    <div className="post__avatar col-sm-1">
                        <Avatar src={user.photoUrl}/>
                    </div>
                    <div className="post__headerText col-sm-11">
                        <h3>
                            {user.name}
                            <span className="post__timestamp">{post.created_at}</span>
                        </h3>
                    </div>
                </div>
            </Link>

            <div className="post__body">
                <div className="post__bodyDescription">
                    <p>{post.text}</p>
                </div>
                <div className="post__bodyImage">
                    {post.image && <img src={post.image} alt={post.text}/>}
                </div>
            </div>

        </div>
    );
});
export default Post;
