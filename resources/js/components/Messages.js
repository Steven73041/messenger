import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Message from '../components/Message';
import Sidebar from './Sidebar';
import SendMessageBox from '../components/SendMessageBox';
import '../styles/Messages.css';
import FlipMove from 'react-flip-move';
import {useStateValue} from '../StateProvider';
import Constants from "./Constants";

const Messages = () => {
    let {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState('');
    const [{user, token}] = useStateValue();

    useEffect(() => {
        window.Echo.channel(`messages.${user.id}`).listen(`.NewMessage`, (e) => {
            fetchMessages();
        });
        fetchMessages();
    }, [id]);

    const fetchMessages = () => {
        window.axios.get(`${Constants.domain}${Constants.messages}/${id}/${user.email}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (!response.data.errors) {
                setMessages(response.data);
                const messagesList = document.getElementById("messagesList");
                if (messagesList) {
                    messagesList.scrollTop = 1000;
                }
            } else {
                setErrors(response.data.errors);
            }
        }).catch(response => {
            setErrors(response.data.errors);
        });
    };

    return (
        <div className="messagesScreen row">
            <Sidebar currentUser={user}/>
            <div className="messages col-sm-8">
                <FlipMove>
                    {messages.length ?
                        <ul id="messagesList" className="messagesList">
                            {messages.map(item => (
                                <Message currentUserMessage={user.id === item.message.userId} name={item.user.name}
                                         text={item.message.text} key={item.message.id} messageId={item.message.id}
                                         timestamp={item.message.created_at} photoUrl={item.user.photoUrl}/>
                            ))}
                        </ul> : <div>No messages found</div>}
                </FlipMove>
                {errors ? <ul className="errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul> : null}
                <SendMessageBox receiverUserId={id} />
            </div>
        </div>
    );
};
export default Messages;
