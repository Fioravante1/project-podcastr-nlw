import { createContext, useState, ReactNode, useContext } from 'react';
// import { PlayerContext } from '../contexts/PlayerContexts';



type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setIsPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffe: () => void;
  playNext: () => void;
  playPrevius: () => void;
  clearPlayerState: () => void;
  hasNext: boolean;
  hasPrevius: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProps = {
  children: ReactNode;
}


export function PlayerContextProvider({ children }: PlayerContextProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffe() {
    setIsShuffling(!isShuffling);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevius = currentEpisodeIndex > 0;
  const hasNext =  isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevius() {
    if (hasPrevius) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider 
      value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        playList,
        isPlaying, 
        isLooping,
        isShuffling,
        togglePlay, 
        setIsPlayingState, 
        playNext,
        playPrevius,
        hasNext,
        hasPrevius,
        toggleLoop,
        toggleShuffe,
        clearPlayerState
      }}
    >
      { children }
    </PlayerContext.Provider>
  )      
}

export const userPlay = () => {
  return useContext(PlayerContext);
}