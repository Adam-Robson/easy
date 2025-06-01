import { useAudioContext } from '@/_contexts/audio-provider';
import { SongType } from '@/_types/audio-provider';

export default function Playlist() {
  
  const { playlist, currentIndex, handleSongChange } = useAudioContext();

  return (
    <ul className="p-1">
      {playlist.map((track: SongType, index: number) => (
        <li
          key={track.id}
          className={(
            `${currentIndex === index ? "active" : ""}`
          )
          }>
          <button
            className="text-left font-normal hover:font-medium cursor-pointer my-1"
            onClick={() => handleSongChange && handleSongChange(index)}
          >
            {track.title}
          </button>
        </li>
      ))}
    </ul>
  )
}
