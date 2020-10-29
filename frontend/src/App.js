import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { addMessage } from './redux/actions/messages';
import MessageList from './components/MessageList';
import ChannelButtons from './components/ChannelButtons';
import SendMessageForm from './components/SendMessageForm';
import NickNameForm from './components/NickNameForm';

import io from 'socket.io-client';
import { baseUrl } from './config';

const socket = io.connect(baseUrl);

function App() {
  const [channels, setChannels] = useState([]);
  const [nickName, setNickName] = useState('');
  const [currentChannel, setCurrentChannel] = useState('');
  const [channelsJoined, setChannelsJoined] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChannel) {
      console.log(`Joining ${currentChannel}`);
      socket.emit("join", currentChannel);
    }
  },[currentChannel]);

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(`${baseUrl}/channels`);
        const channels = await response.json();
        setChannels(channels);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!channelsJoined.includes(currentChannel)) {
      socket.on(currentChannel, (message) => {
        console.log(
          `Recieved new message for ${currentChannel}: ${message.text}`
        );
        dispatch(addMessage(message));
      });
      setChannelsJoined([
        ...channelsJoined,
        currentChannel
      ]);
    }
  },[currentChannel, dispatch, channelsJoined]);

  const onMessage = message => {
    socket.emit(currentChannel, {
      message,
      nickName
    });
  }

  const joinChannel = channel => {
    setCurrentChannel(channel.name);
  }

  if (!nickName) {
    return (
      <main>
        <NickNameForm onChange={setNickName}/>
      </main>
    )
  }

  const renderMessageView = () => {
    if (currentChannel) {
      return (
        <div className="message-view">
          <MessageList currentChannel={currentChannel} />
          <SendMessageForm onMessage={onMessage} />
        </div>
      )
    } else {
      return <h1>Choose a Channel</h1>
    }
  }

  return (
    <main>
      <div className="sidebar">
        <ChannelButtons
          channels={channels}
          currentChannel={currentChannel}
          joinChannel={joinChannel}
        />
      </div>
      {renderMessageView()}
    </main>
  );
}

export default App;
