import { create } from 'zustand';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '../types/song';
import { getSongById } from '../api/saavnApi';

type PlayerState = {
  sound: Audio.Sound | null;
  currentSong: Song | null;
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  duration: number;

  playSong: (song: Song) => Promise<void>;
  togglePlay: () => Promise<void>;
  nextSong: () => Promise<void>;
  previousSong: () => Promise<void>;
  addToQueue: (song: Song) => Promise<void>;
  removeFromQueue: (id: string) => Promise<void>;
  loadQueue: () => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  sound: null,
  currentSong: null,
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  position: 0,
  duration: 0,

  playSong: async (song) => {
    const songData = await getSongById(song.id);

    const audio =
      songData.downloadUrl?.find((d: any) => d.quality === '320kbps') ||
      songData.downloadUrl?.find((d: any) => d.quality === '160kbps') ||
      songData.downloadUrl?.find((d: any) => d.quality === '96kbps');

    if (!audio?.url) return;

    const { sound, queue } = get();
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audio.url },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          set({
            position: status.positionMillis || 0,
            duration: status.durationMillis || 0,
            isPlaying: status.isPlaying,
          });

          // Auto play next when song ends
          if (status.didJustFinish) {
            get().nextSong();
          }
        }
      },
    );

    let index = queue.findIndex((s) => s.id === song.id);
    if (index === -1) {
      index = queue.length;
      set({ queue: [...queue, song] });
    }

    set({
      sound: newSound,
      currentSong: song,
      currentIndex: index,
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

  nextSong: async () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      await get().playSong(queue[currentIndex + 1]);
    }
  },

  previousSong: async () => {
    const { queue, currentIndex } = get();
    if (currentIndex > 0) {
      await get().playSong(queue[currentIndex - 1]);
    }
  },

  addToQueue: async (song) => {
    const updated = [...get().queue, song];
    set({ queue: updated });
    await AsyncStorage.setItem('QUEUE', JSON.stringify(updated));
  },

  removeFromQueue: async (id) => {
    const updated = get().queue.filter((s) => s.id !== id);
    set({ queue: updated });
    await AsyncStorage.setItem('QUEUE', JSON.stringify(updated));
  },

  loadQueue: async () => {
    const stored = await AsyncStorage.getItem('QUEUE');
    if (stored) {
      set({ queue: JSON.parse(stored) });
    }
  },
}));
