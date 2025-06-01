import { Play, Pause, CaretRight, CaretLeft } from "@phosphor-icons/react";
import { useAudioContext } from '@/_contexts/audio-provider';
import '@/_styles/controls.css';


export default function Controls() {
  const { 
    volume, 
    playback, 
    handlePlayback, 
    handlePreviousSong, 
    handleNextSong,
    volumeSliderRef, 
    handleVolumeChange 
  } = useAudioContext();

  return (
    <section className="w-full h-1/4">
      <div className="playback w-full flex justify-center items-center">
      <button 
        onClick={handlePreviousSong}
        className="control cursor-pointer"
      >
        <CaretLeft />
        <label className="label">Previous</label>
      </button>

      <button 
        onClick={handlePlayback} 
        className="control cursor-pointer"
      >
        {playback ? <Pause /> : <Play />}
        <label className="label">{playback ? 'Pause' : 'Play'}</label>
      </button>

      <button 
        onClick={handleNextSong} 
        className="control cursor-pointer"
      >
        <CaretRight />
        <label className="label">Next</label>
      </button>
      </div>
      <button className="volume-container">
        <input 
          id="volume"
          className="control cursor-pointer"
          ref={volumeSliderRef}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <label className="label">Volume</label>
      </button>
    </section>
  );
}
