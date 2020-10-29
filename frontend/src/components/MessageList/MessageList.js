import React, { useEffect } from 'react';
import { baseUrl } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages } from '../../redux/actions/messages';
import styles from './MessageList.module.css';
import moment from 'moment';

console.log(styles);
const MessageList = ({currentChannel}) => {
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentChannel) {
            return;
        }
        let messages = [];
        (async () => {
        try {
            const response = await fetch(
                `${baseUrl}/channels/${currentChannel}/messages`
            );
            if (!response.ok) {
                throw new Error("Response not okay");
            }
            messages = await response.json();
        } catch (e) {
            console.error(e);
        }
        dispatch(addMessages(messages));
        })();
    }, [currentChannel, dispatch]);

    if (!currentChannel) {
        return null;
    }

    const renderMessages = messages => (
        messages.map(message => {
            const date = moment(message.createdAt).format('hh:mm:ss');
            return (
              <li className={styles.message} key={message.id}>
                <h4 className={styles.nickName}>
                  {message.nickName}
                  <span className={styles.date}>{date}</span>
                </h4>
                <p className={styles.text}>{message.text}</p>
              </li>
            );
        })
    );

    return (
        <ul className={styles.list}>
            {renderMessages(messages)}
        </ul>
    );
}

export default MessageList;