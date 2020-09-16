import React, {useState} from 'react';
import {useStateValue} from "../../StateProvider";
import {Button} from "@material-ui/core";
import Constants from "../Constants";

const PostBox = () => {
    const [{token}] = useStateValue();
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState('');

    const sendPost = (e) => {
        e.preventDefault();
        window.axios.post(`${Constants.domain}${Constants.sendPost}`, {
            text: text,
            image: image,
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            setText(null);
            setImage(null);
            if (response.data.errors) {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });
    }

    return (
        <div className="postBox">
            {errors ? <ul className="errors">
                {errors.map(error =>
                    <li key={error}>{error}</li>
                )}
            </ul> : null}
            <form className="form postBoxForm">
                <input id="text" type="text" className="form-control" onChange={e => setText(e.target.value)}
                       value={text} placeholder="What's up?"/>

                <input id="image" type="text" className="form-control" onChange={e => setImage(e.target.value)}
                       value={image} placeholder="Enter Image URL"/>

                <Button onClick={e => sendPost(e)} className="btn btn-primary">Share</Button>
            </form>
        </div>
    )
}
export default PostBox;
