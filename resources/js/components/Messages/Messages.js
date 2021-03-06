import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Message from './Message';
import Sidebar from '../Sidebar';
import SendMessageBox from './SendMessageBox';
import '../../styles/Messages.css';
import FlipMove from 'react-flip-move';
import {useStateValue} from '../../StateProvider';
import Constants from "./../Constants";
import {actionTypes} from "../../reducer";

const Messages = () => {
    let {id} = useParams();
    const [receiver, setReceiver] = useState(null);
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState('');
    const [{user, token}, dispatch] = useStateValue();

    useEffect(() => {
        window.Echo.leave(`messages.${user.id}.${receiver}`);
        setReceiver(id);
    }, [id]);

    useEffect(() => {
        window.Echo.channel(`messages.${user.id}.${receiver}`).listen(`.NewMessage`, (e) => {
            fetchMessages();
        });
        fetchMessages();
    }, [receiver]);

    const fetchMessages = () => {
        dispatch({
            type: actionTypes.SET_LOADING_TERM,
            loading: true,
        });
        window.axios.get(`${Constants.domain}${Constants.messages}/${id}/${user.email}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (!response.data.errors) {
                setMessages(response.data);
                const messagesList = document.getElementById("messagesList");
                if (messagesList) {
                    messagesList.scrollTop = 10000;
                }
            } else {
                setErrors(response.data.errors);
            }
            dispatch({
                type: actionTypes.SET_LOADING_TERM,
                loading: false,
            });
        }).catch(response => {
            dispatch({
                type: actionTypes.SET_LOADING_TERM,
                loading: false,
            });
            setErrors(response.data.errors);
        });
    };

    return (
        <div className="messagesScreen row">
            <Sidebar/>
            <div className="messages col-sm-8">
                {messages[0]?.name && <h3>{messages[0].name}</h3>}
                {messages.length ?
                    <FlipMove typeName="ul" id="messagesList" className="messagesList">
                        {messages.map(item => (
                            <Message currentUserMessage={user.id === item.message.userId}
                                     message={item.message} key={item.message.id} messageUser={item.user} email={id}/>
                        ))}
                    </FlipMove> : <div>No messages found</div>}

                {errors ? <ul className="errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul> : null}
                <SendMessageBox receiverUserId={id}/>
            </div>
        </div>
    );
};
export default Messages;
