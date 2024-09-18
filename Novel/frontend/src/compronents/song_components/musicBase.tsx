import React from 'react';
import { useMusic } from './musicprovider';

const MusicPlayer: React.FC = () => {
  const { isPlaying, toggleMusic, nextSong, prevSong, currentSong } = useMusic();

  return (
    <div>
      <h3>Now Playing: {currentSong}</h3>
      <button onClick={toggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      <button onClick={prevSong}>Previous Song</button>
      <button onClick={nextSong}>Next Song</button>
    </div>
  );
};

export default MusicPlayer;