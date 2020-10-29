import React, { useEffect, useRef } from 'react';
import { apiUrl } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/actions/messages';
import styles from './MessageList.module.css';
import moment from 'moment';

const MessageList = () => {
    // Use the currentChannel and messages from Redux
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const messages = useSelector(state => state.messages[currentChannel]);
    const dispatch = useDispatch();
    const messageElement = useRef(null);

    useEffect(() => {
        if (messageElement.current) {
            messageElement.current.scrollIntoView();
        }
    });

    // Fetch the list of messages for a channel
    useEffect(() => {
        // If there's no current channel, there's nothing
        // to do, so just return
        if (!currentChannel) {
            return;
        }

        (async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/channels/${currentChannel}/messages`
                );
                if (!response.ok) {
                    throw new Error("Response not okay");
                }
                const channel = await response.json();
                dispatch(setMessages(channel.Messages, channel));
            } catch (e) {
                console.error(e);
            }
        })();
    }, [currentChannel, dispatch]);

    // If there's no current Channel, just render nothing
    if (!currentChannel) {
        return null;
    }

    //A helper function to render the list of messages
    const renderMessages = messages => {
        if (!messages) {
            return null;
        }
        return messages.map(message => {
            // format the date with moment.js
            const date = moment(message.createdAt).format('hh:mm:ss');
            // Render a single message
            return (
              <li ref={messageElement} className={styles.message} key={message.id}>
                <h4 className={styles.nickName}>
                  {message.nickName}
                  <span className={styles.date}>{date}</span>
                </h4>
                <p className={styles.text}>{message.text}</p>
              </li>
            );
        })
    };

    // Render the component
    return (
        <ul className={styles.list}>
            {renderMessages(messages)}
        </ul>
    );
}

export default MessageList;