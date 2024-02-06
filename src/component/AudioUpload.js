// src/AudioUploader.js
import React, { useState, useEffect } from 'react';

const AudioUpload = ({ onFileUpload }) => {
  const [buttonName, setButtonName] = useState("Play");
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioData, setAudioData] = useState(null);

  useEffect(() => {
    if (audioData) {
      setButtonName("Play");
      const player = new Audio(audioData);
      player.onended = () => {
        setButtonName("Play");
      };
      setAudioPlayer(player);
    }
  }, [audioData]);

  const handleClick = () => {
    if (buttonName === "Play") {
      audioPlayer.play();
      setButtonName("Pause");
    } else {
      audioPlayer.pause();
      setButtonName("Play");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const audioBase64 = event.target.result;
        setAudioData(audioBase64);
        // Save audioBase64 to localStorage
        localStorage.setItem('audioData', audioBase64);
        onFileUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonName}</button>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
    </div>
  );
};

export default AudioUpload;
