import React from "react";
import styles from "./ChannelButtons.module.css";

const ChannelButtons = ({ channels, currentChannel, joinChannel }) => {
  return channels.map((channel) => {
    const active = currentChannel === channel.name ? styles.active : "";
    return (
      <a href={`#${channel.name}`}
        className={`${styles.button} ${active}`}
        key={channel.id}
        onClick={() => joinChannel(channel)}
      >
        {`#${channel.name}`}
      </a>
    );
  });
};

export default ChannelButtons;
