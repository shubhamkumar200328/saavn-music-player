import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import MiniPlayer from './src/components/MiniPlayer';
import { setupAudio } from './src/utils/audio';
import { usePlayerStore } from './src/store/playerStore';

export default function App() {
  const loadQueue = usePlayerStore((state) => state.loadQueue);

  useEffect(() => {
    setupAudio();
    loadQueue();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <MiniPlayer />
    </NavigationContainer>
  );
}
