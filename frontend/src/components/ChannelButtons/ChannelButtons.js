import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addChannels, setCurrentChannel } from '../../redux/actions/channels';
import styles from "./ChannelButtons.module.css";

const ChannelButtons = () => {
  // Grab the channels and currentChannel from Redux
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const dispatch = useDispatch();

  // Fetch the channels list from the server
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/channels`);
        const channels = await response.json();
        dispatch(addChannels(channels));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  // When someon clicks the channel button,
  // set the current Channel in Redux
  const joinChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  }

  // Render the buttons, one for each channel
  return channels.map((channel) => {
    const active = currentChannel === channel.id ? styles.active : "";
    return (
      <button
        className={`${styles.button} ${active}`}
        key={channel.id}
        onClick={() => joinChannel(channel.id)}
      >
        {`#${channel.name}`}
      </button>
    );
  });
};

export default ChannelButtons;
