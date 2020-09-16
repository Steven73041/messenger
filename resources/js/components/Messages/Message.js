import React from 'react';
import {Avatar, Button} from '@material-ui/core';
import Constants from "../Constants";
import {useStateValue} from "../../StateProvider";
import {Link} from 'react-router-dom';

const Message = ({message, user, currentUserMessage}) => {
    const [{token}] = useStateValue();

    const deleteMessage = (e) => {
        e.preventDefault();
        if (currentUserMessage) {
            window.axios.post(`${Constants.domain}${Constants.deleteMessage}`, {
                id: message.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                if (response.data) {
                }
            }).catch(error => {
                alert(error.toString());
            });
        }
    }

    return (
        <li className={`message` + (currentUserMessage ? ` owner` : ``)}>
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
}
export default Message;
