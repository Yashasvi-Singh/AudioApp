import React, { useState } from 'react';

const AudioList = ({ audioList, selectAudio }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const handlePlayToggle = (audioData, i) => {
    if (currentIndex === i) {
      selectAudio(null); 
      setCurrentIndex(null);
    } else {
      selectAudio(audioData);
      setCurrentIndex(i);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % audioList.length;
    selectAudio(audioList[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + audioList.length) % audioList.length;
    selectAudio(audioList[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div>
      <h2>Playlist:</h2>
      <ul>
        {audioList.map((file, i) => (
          <li key={i} onClick={() => handlePlayToggle(file, i)}>
            {file.name}
            {currentIndex === i && <span> - Playing</span>}
          </li>
        ))}
      </ul>
      {currentIndex !== null && (
        <div>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AudioList;
