import React, { useState } from 'react';
import styles from './SendMessageForm.module.css';

const SendMessageForm = ({onMessage}) => {
    const [message, setMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        onMessage(message);
        setMessage("");
    };

    const onChange = e => {
        setMessage(e.target.value);
    }

    return (
      <form className={styles.form} onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={message}></input>
        <button type="submit">Send</button>
      </form>
    );
}

export default SendMessageForm;

