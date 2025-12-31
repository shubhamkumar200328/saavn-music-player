import { create } from 'zustand';
import { Audio } from 'expo-av';
import { Song } from '../types/song';
import { getSongById } from '../api/saavnApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PlayerState = {
  sound: Audio.Sound | null;
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  position: number;
  duration: number;

  playSong: (song: Song) => Promise<void>;
  togglePlay: () => Promise<void>;
  setQueue: (songs: Song[]) => void;

  addToQueue: (song: Song) => void;
  removeFromQueue: (id: string) => void;
  loadQueue: () => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],

  addToQueue: async (song) => {
    const updatedQueue = [...get().queue, song];
    set({ queue: updatedQueue });
    await AsyncStorage.setItem('QUEUE', JSON.stringify(updatedQueue));
  },

  removeFromQueue: async (id) => {
    const updatedQueue = get().queue.filter((s) => s.id !== id);
    set({ queue: updatedQueue });
    await AsyncStorage.setItem('QUEUE', JSON.stringify(updatedQueue));
  },

  loadQueue: async () => {
    const stored = await AsyncStorage.getItem('QUEUE');
    if (stored) {
      set({ queue: JSON.parse(stored) });
    }
  },

  sound: null,
  currentSong: null,
  isPlaying: false,
  position: 0,
  duration: 0,

  playSong: async (song) => {
    const songData = await getSongById(song.id);

    const audio =
      songData.downloadUrl?.find((d: any) => d.quality === '320kbps') ||
      songData.downloadUrl?.find((d: any) => d.quality === '160kbps') ||
      songData.downloadUrl?.find((d: any) => d.quality === '96kbps');

    if (!audio?.url) {
      console.warn('Audio URL not found');
      return;
    }

    const { sound } = get();

    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audio.url },
      { shouldPlay: true },
    );

    set({
      sound: newSound,
      currentSong: song,
      isPlaying: true,
    });
  },

  togglePlay: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  setQueue: (songs) => set({ queue: songs }),
}));
