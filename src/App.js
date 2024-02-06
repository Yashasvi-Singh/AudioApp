import React, { useState, useEffect } from 'react';
import AudioUploader from './component/AudioUpload';
import AudioList from './component/AudioList';
import AudioPlayer from './component/AudioPlayer';

function App() {
  const [audioList, selectAudio] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [audioData, setAudioData] = useState(null);

  // Load last playing audio on page reload
  useEffect(() => {
    const storedAudioIndex = localStorage.getItem('currentAudioIndex');
    const storedAudioPosition = localStorage.getItem('audioPosition');

    if (storedAudioIndex !== null) {
      const index = parseInt(storedAudioIndex, 10);
      setCurrentAudioIndex(index);

      if (audioList[index]) {
        setAudioData({ ...audioList[index], position: storedAudioPosition || 0 });
      }
    }
  }, [audioList]);

  const handleFileUpload = (file) => {
    const newAudioList = [...audioList, { name: file.name, url: URL.createObjectURL(file) }];
    selectAudio(newAudioList);
    localStorage.setItem('audioList', JSON.stringify(newAudioList));
  };

  const handleAudioSelect = (audioData, index) => {
    setCurrentAudioIndex(index);
    setAudioData(audioData);
    localStorage.setItem('currentAudioIndex', index.toString());
    localStorage.setItem('audioPosition', '0'); // Reset position when selecting a new audio file
  };

  const handleAudioEnded = () => {
    const nextIndex = (currentAudioIndex + 1) % audioList.length;
    if (audioList[nextIndex]) {
      setCurrentAudioIndex(nextIndex);
      setAudioData({ ...audioList[nextIndex], position: '0' });
      localStorage.setItem('currentAudioIndex', nextIndex.toString());
      localStorage.setItem('audioPosition', '0');
    }
  };

  const handleAudioPositionChange = (position) => {
    localStorage.setItem('audioPosition', position.toString());
  };

  return (
    <div className="App">
      <h1>Audio Player App</h1>
      <AudioUploader onFileUpload={handleFileUpload} />
      <AudioList audioList={audioList} selectAudio={handleAudioSelect} />
      {audioData && (
        <AudioPlayer
          audioData={audioData}
          onEnded={handleAudioEnded}
          onPositionChange={handleAudioPositionChange}
        />
      )}
    </div>
  );
}

export default App;
