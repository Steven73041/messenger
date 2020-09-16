import React, {useState} from 'react';
import {useStateValue} from "../../StateProvider";
import Constants from "../Constants";
import '../../styles/PostBox.css';

const PostBox = () => {
    const [{token}] = useStateValue();
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState('');

    const sendPost = (e) => {
        e.preventDefault();
        if (text.length) {
            window.axios.post(`${Constants.domain}${Constants.sendPost}`, {
                text: text,
                image: image,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then(response => {
                setText('');
                setImage('');
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }).catch(response => {
                setErrors(response.data.errors);
            });
        } else {
            let textarea = document.querySelector('.postBoxForm textarea');
            textarea.classList.add('error');
            textarea.focus();
        }
    }

    return (
        <div className="postBox">
            {errors ? <ul className="errors">
                {errors.map(error =>
                    <li key={error}>{error}</li>
                )}
            </ul> : null}
            <form className="form postBoxForm">
                <legend className="text-center">Feed</legend>
                <textarea className="form-control" onChange={e => setText(e.target.value)}
                          value={text} placeholder="What's up?" rows="4" cols="50">{text}</textarea>

                <input type="text" className="form-control" onChange={e => setImage(e.target.value)}
                       value={image} placeholder="Enter Image URL"/>

                <a onClick={e => sendPost(e)} className="btn btn-primary shareButton">Share</a>
            </form>
        </div>
    )
}
export default PostBox;
