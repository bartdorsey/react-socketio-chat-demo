import React, { useState } from 'react';
import styles from './NickNameForm.module.css';

const NickNameForm = ({onChange}) => {
    const [nickName, setNickName] = useState('');

    const updateNickName = e => {
        setNickName(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        onChange(nickName);
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label>Enter your nickname</label>
            <input type="text" onChange={updateNickName} value={nickName}/>
        </form>
    )
}

export default NickNameForm;