import { View, Text, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePlayerStore } from '../store/playerStore';

export default function PlayerScreen() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    sound,
    position,
    duration,
  } = usePlayerStore();

  if (!currentSong) return null;

  // helper: ms → mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>
      {/* Album Art */}
      <Image
        source={{ uri: currentSong.image }}
        style={{ width: 280, height: 280, borderRadius: 12 }}
      />

      {/* Song Info */}
      <Text style={{ fontSize: 22, fontWeight: '700', marginTop: 20 }}>
        {currentSong.name}
      </Text>
      <Text style={{ color: 'gray', marginTop: 4 }}>{currentSong.artists}</Text>

      {/* Seek Bar */}
      <View style={{ width: '100%', marginTop: 30 }}>
        <Slider
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={async (value) => {
            await sound?.setPositionAsync(value);
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          <Text>{formatTime(position)}</Text>
          <Text>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={previousSong}>
          <Text style={{ fontSize: 22 }}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => sound?.setPositionAsync(Math.max(position - 10000, 0))}
          style={{ marginHorizontal: 20 }}
        >
          <Text style={{ fontSize: 18 }}>⏪ 10s</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlay}
          style={{
            backgroundColor: '#000',
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 30,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            sound?.setPositionAsync(Math.min(position + 10000, duration))
          }
          style={{ marginHorizontal: 20 }}
        >
          <Text style={{ fontSize: 18 }}>10s ⏩</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSong}>
          <Text style={{ fontSize: 22 }}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
