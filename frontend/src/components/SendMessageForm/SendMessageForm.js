import React, { useState } from 'react';
import styles from './SendMessageForm.module.css';

const SendMessageForm = ({onSend}) => {
    const [message, setMessage] = useState("");

    // When someone clicks the send button
    // 1. preventDefault form submission
    // 2. call onSend so the parent knows someone pushed it
    // 3. reset the message local state
    const onSubmit = async (e) => {
        e.preventDefault();
        onSend(message);
        setMessage("");
    };

    // Set the message local state as someone types
    const onChange = e => {
        setMessage(e.target.value);
    }

    // Render the component
    return (
      <form className={styles.form} onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={message}></input>
        <button type="submit">Send</button>
      </form>
    );
}

export default SendMessageForm;

