import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { usePlayerStore } from '../store/playerStore';

export default function QueueScreen() {
  const { queue, playSong, removeFromQueue } = usePlayerStore();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 16 }}>
        Queue
      </Text>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No songs in queue</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <TouchableOpacity onPress={() => playSong(item)}>
              <Text>{item.name}</Text>
              <Text style={{ color: 'gray' }}>{item.artists}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeFromQueue(item.id)}>
              <Text style={{ color: 'red' }}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
