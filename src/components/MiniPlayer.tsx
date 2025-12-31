import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/playerStore';

export default function MiniPlayer() {
  const navigation = useNavigation<any>();
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Player')}
      activeOpacity={0.9}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        backgroundColor: '#111',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
      }}
    >
      <Image
        source={{ uri: currentSong.image }}
        style={{ width: 44, height: 44, borderRadius: 6 }}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text numberOfLines={1} style={{ color: '#fff', fontWeight: '600' }}>
          {currentSong.name}
        </Text>
        <Text numberOfLines={1} style={{ color: '#aaa', fontSize: 12 }}>
          {currentSong.artists}
        </Text>
      </View>

      <TouchableOpacity onPress={togglePlay}>
        <Text style={{ color: '#fff', fontSize: 16 }}>
          {isPlaying ? '⏸' : '▶️'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Queue')}
        style={{ marginLeft: 20 }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Open Queue</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
