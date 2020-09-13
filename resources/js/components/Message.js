import React from 'react';
import {Avatar, Button} from '@material-ui/core';
import Constants from "./Constants";
import {useStateValue} from "../StateProvider";

const Message = ({messageId, currentUserMessage, text, timestamp, photoUrl, name}) => {
    const [{token}] = useStateValue();

    const deleteMessage = (e) => {
        e.preventDefault();
        if (currentUserMessage) {
            window.axios.post(`${Constants.domain}${Constants.deleteMessage}`, {
                id: messageId,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                if (response.data) {
                    console.log(response.data);
                }
            }).catch(error => {
                alert(error.toString());
            });
        }
    }

    return (
        <li className={`message` + (currentUserMessage ? ` owner` : ``)}>
            <div className="contentBody">
                {!currentUserMessage ? <Avatar src={photoUrl}/> : null}
                <div className="content">
                    <p className="messageDisplayName">{name}</p>
                    <p className="messageText">{text}</p>
                    <p className="messageTimestamp">{timestamp}</p>
                </div>
                {currentUserMessage ? <Avatar src={photoUrl}/> : null}
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
