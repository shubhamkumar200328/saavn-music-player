import { Audio } from 'expo-av';

export const setupAudio = async () => {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
};
