import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import MiniPlayer from './src/components/MiniPlayer';
import { setupAudio } from './src/utils/audio';

export default function App() {
  useEffect(() => {
    setupAudio();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <MiniPlayer />
    </NavigationContainer>
  );
}
