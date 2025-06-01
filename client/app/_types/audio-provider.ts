
export type SongType = {
  id: number;
  title: string;
  album: string;
  artist: string;
  url: string;
  duration: string;
}

export type AudioContextType = {
  playlist: SongType[];
  song: SongType;
  currentIndex: number;
  playback: boolean;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayback: () => void;
  handleSongChange: (newIndex: number) => void;
  handlePreviousSong: () => void;
  handleNextSong: () => void;
  handleVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
  elapsed: string;
  duration: string;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  volumeSliderRef: React.RefObject<HTMLInputElement | null>;
  togglePlayer: () => void;
  visible: boolean
}

export type AudioProviderPropsType = {
  children: React.ReactNode;
  initialVolume?: number;
  initialIndex?: number;
}


export interface CollectionType {
  id: number;
  title: string;
  cover: string;
  releaseDate: string;
  description: string;
  tracks: SongType[];
}


