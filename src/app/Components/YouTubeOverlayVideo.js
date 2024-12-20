"use client"

import React, { useEffect, useState } from 'react';

const YouTubeOverlayVideo = ({ videoId, logoUrl }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId,
          mute: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setPlaybackQuality('hd1080');
            event.target.playVideo();
          },
        },
      });
    };
  }, [videoId]);

  return (
    <div style={styles.container}>

      <div id="youtube-player" style={styles.video}></div>

      <img src={logoUrl} alt="Logo" style={styles.logo} />

      <div style={styles.datetime}>
        {currentTime.toLocaleDateString()} <p>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: -120,
    left: -220,
    width: '140%',
    height: '140%',
    objectFit: 'cover',
    zIndex: -1,
  },
  logo: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    width: '150px',
    zIndex: 1,
  },
  datetime: {
    position: 'absolute',
    textAlign: 'end',
    top: '10px',
    right: '10px',
    fontSize: '40px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px 10px',
    borderRadius: '5px',
    zIndex: 1,
  },
};

export default YouTubeOverlayVideo;
