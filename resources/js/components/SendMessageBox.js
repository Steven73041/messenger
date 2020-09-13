import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import '../styles/SendMessageBox.css';
import Constants from "./Constants";
import {useStateValue} from "../StateProvider";

const SendMessageBox = ({receiverUserId}) => {
    const [message, setMessage] = useState('');
    const [{token}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            window.axios.post(`${Constants.domain}${Constants.sendMessage}`, {
                receiverUserId: receiverUserId,
                text: message,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then(response => {
                if (response.data) {
                    setMessage('');
                }
            }).catch(error => {
                alert(error.toString());
            });
        }
    };

    return (
        <div className="sendMessageBox">
            <form method="POST" className="sendMessageForm">
                <input className="sendMessageInput" type="text" value={message}
                       onChange={(e) => setMessage(e.target.value)} required placeholder="Enter your message here"/>
                <Button onClick={e => sendMessage(e)} variant="outlined" className="sendMessageButton" type="submit">
                    {"Send"}
                </Button>
            </form>
        </div>
    );
};
export default SendMessageBox;
