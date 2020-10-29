import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './redux/actions/messages';
import { addJoinedChannel } from './redux/actions/channels';
import MessageList from './components/MessageList';
import ChannelButtons from './components/ChannelButtons';
import SendMessageForm from './components/SendMessageForm';
import NickNameForm from './components/NickNameForm';

// App recieves the socket on it's props
const App = ({socket}) => {
  const [nickName, setNickName] = useState('');
  const currentChannel = useSelector(state => state.channels.currentChannel);
  const joinedChannels = useSelector(state => state.channels.joinedChannels);
  const dispatch = useDispatch();

  // Anytime the current Channel changes, send a `join` message to the server
  useEffect(() => {
    if (currentChannel) {
      console.log(`Joining ${currentChannel}`);
      socket.emit('join', currentChannel);
    }
  },[currentChannel, socket]);

  // Sets up the listener for new socket connections
  useEffect(() => {
    // If there's no current channel
    // there's nothing to do here so just return
    if (!currentChannel) {
      return;
    }

    // If we've already got a listener for this
    // channel, then skip adding a new one
    if (joinedChannels.includes(currentChannel)) {
      return;
    }

    // Listen for connections to the currentChannel
    // And add the incoming messages to Redux.
    socket.on(currentChannel, ({message, channel}) => {
      console.log(
        `Recieved new message for ${channel}: ${message.text}`
      );
      // If the current channel doesn't match the
      // channel the message belongs to, then
      // don't add the message because it shouldn't
      // display
      dispatch(addMessage(message));
    });

    dispatch(addJoinedChannel(currentChannel));
  },[currentChannel, dispatch, joinedChannels, socket]);

  // When the send button is clicked
  // emit a message acorss the socket
  // for the currentChannel
  const onSend = message => {
    console.log(`Sending message ${message} for ${nickName} to ${currentChannel}`);
    socket.emit(currentChannel, {
      message,
      nickName
    });
  }

  // A helper to render the message view or a 'choose a channel' message
  // if the user hasn't choosen one yet
  const renderMessageView = () => {
    if (currentChannel) {
      return (
        <div className="message-view">
          <MessageList />
          <SendMessageForm onSend={onSend} />
        </div>
      );
    } else {
      return <h1>Choose a Channel</h1>;
    }
  };

  // If there's no nickname, draw the nickname form
  if (!nickName) {
    return (
      <main>
        <NickNameForm onChange={setNickName}/>
      </main>
    )
  }

  // Render the component
  return (
    <main>
      <div className="sidebar">
        <ChannelButtons/>
      </div>
      {renderMessageView()}
    </main>
  );
}

export default App;
