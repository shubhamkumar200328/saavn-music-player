import { View, Text, Image, TouchableOpacity } from 'react-native';
import { usePlayerStore } from '../store/playerStore';

export default function PlayerScreen() {
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();

  if (!currentSong) return null;

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>
      <Image
        source={{ uri: currentSong.image }}
        style={{ width: 280, height: 280, borderRadius: 12 }}
      />

      <Text style={{ fontSize: 22, fontWeight: '700', marginTop: 20 }}>
        {currentSong.name}
      </Text>

      <Text style={{ color: 'gray', marginTop: 4 }}>{currentSong.artists}</Text>

      <TouchableOpacity
        onPress={togglePlay}
        style={{
          marginTop: 40,
          backgroundColor: '#000',
          paddingHorizontal: 40,
          paddingVertical: 14,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {isPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
