// src/AudioPlayer.js
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ audioData, onEnded }) => {
  const [audio] = useState(new Audio(audioData.url));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.src = audioData.url;

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onEnded();
    });

    return () => {
      audio.removeEventListener('ended', () => {});
    };
  }, [audio, audioData, onEnded]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h2>Now Playing:</h2>
      <p>{audioData.name}</p>
      <audio controls onPlay={handlePlayPause} onPause={handlePlayPause}>
        <source src={audioData.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
