import React, {forwardRef} from 'react';
import {Avatar, Button} from '@material-ui/core';
import Constants from "../Constants";
import {useStateValue} from "../../StateProvider";
import {Link} from 'react-router-dom';
import {actionTypes} from "../../reducer";

const Message = forwardRef(({message, user, currentUserMessage}, ref) => {
    const [{token}, dispatch] = useStateValue();

    const deleteMessage = (e) => {
        e.preventDefault();
        if (currentUserMessage) {
            dispatch({
                type: actionTypes.SET_LOADING_TERM,
                loading: true,
            });
            window.axios.post(`${Constants.domain}${Constants.deleteMessage}`, {
                id: message.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                dispatch({
                    type: actionTypes.SET_LOADING_TERM,
                    loading: false,
                });
            }).catch(error => {
                alert(error.toString());
                dispatch({
                    type: actionTypes.SET_LOADING_TERM,
                    loading: false,
                });
            });
        }
    }

    return (
        <li ref={ref} className={`message` + (currentUserMessage ? ` owner` : ``)}>
            <div className="contentBody">

                {!currentUserMessage &&
                <Link to={`/profile/${user.id}`}>
                    <Avatar src={user.photoUrl}/>
                </Link>}

                <div className="content">
                    <p className="messageDisplayName">{user.name}</p>
                    <p className="messageText">{message.text}</p>
                    <p className="messageTimestamp">{message.created_at}</p>
                </div>

                {currentUserMessage &&
                <Link to={`/profile/${user.id}`}>
                    <Avatar src={user.photoUrl}/>
                </Link>}

            </div>
            {currentUserMessage ?
                <div className="contentButton">
                    <Button variant="outlined" onClick={e => deleteMessage(e)}
                            className="messageDelete">&times;</Button>
                </div> : null}
        </li>
    );
});
export default Message;
