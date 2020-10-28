import React, { useState, useEffect } from 'react';
// Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { addMessage } from './store/actions';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');


function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([]);
  // Redux
  // const dispatch = useDispatch();
  // const messages = Object.values(useSelector(state => state.messages));

  useEffect(() => {
    socket.on('message', msg => {
      setChat([...chat, msg]);
    })
  })

  // Redux
  // useEffect(() => {
  //   socket.on('message', msg => {
  //     dispatch(addMessage(msg));
  //   })
  // })


  const onChange = e => {
    setMessage(e.target.value);
  }

  // Redux
  // const onChange = e => {
  //   e.preventDefault();
  //   setMessage(e.target.value);
  // }

  const onSubmit = async e => {
    e.preventDefault();
    socket.emit('message', message)
    console.log(message);
    const res = await fetch('http://localhost:4000/messages', {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let thing = await res.json();
    console.log(thing);
    setMessage('');
  }

  const daChat = () => {
    return chat.map((message, i) => {
      return <div key={i}>
        <pre>{message}</pre>
      </div>
    })
  }
  return (
    <div className="app">
      <form onSubmit={onSubmit}>
        <h1>YOYOYOOYOY</h1>
        <input onChange={onChange} type="text" value={message}></input>
        <button type="submit">Send</button>
      </form>
      <div>
        <h1>HEY LOOK IT'S WORDS</h1>
        {daChat()}
      </div>
    </div>
  );
}

export default App;
