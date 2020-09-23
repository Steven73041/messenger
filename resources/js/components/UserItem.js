import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useStateValue} from "../StateProvider";

const UserItem = ({itemUser}) => {
    const [{user}] = useStateValue();
    const [newMessages, setNewMessages] = useState(false);

    useEffect(() => {
        window.Echo.channel(`messages.${itemUser.id}.${user.email}`).listen(`.NewMessage`, (e) => {
            if (itemUser.id !== user.id) {
                setNewMessages(true);
            }
        });
    }, []);

    const clearNewMessage = (e) => {
        setNewMessages(false);
    }

    return (
        <Link to={`/chat/${itemUser.email}`}
              onClick={e => clearNewMessage(e)}
              className="chatUser">
            {itemUser.name}&nbsp;
            {newMessages ? <span className="badge badge-info">!</span> : null}
        </Link>
    )
}
export default UserItem;
