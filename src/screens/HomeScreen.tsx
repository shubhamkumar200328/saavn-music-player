import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { searchSongs } from '../api/saavnApi';
import { Song } from '../types/song';
import { usePlayerStore } from '../store/playerStore';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const playSong = usePlayerStore((state) => state.playSong);

  const addToQueue = usePlayerStore((state) => state.addToQueue);

  const [tab, setTab] = useState<'songs' | 'artists'>('songs');

  const fetchData = async () => {
    if (tab === 'songs') {
      const data = await searchSongs(query);
      setSongs(
        data.map((item: any) => ({
          id: item.id,
          name: item.name,
          duration: Number(item.duration),
          artists: item.primaryArtists,
          image: item.image?.[2]?.link,
          audioUrl: undefined, // fetched later via songs API
        })),
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingBottom: 80,
        backgroundColor: '#12d630e1',
      }}
    >
      <TextInput
        placeholder="Search songs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchData}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => setTab('songs')}
          style={{ marginRight: 16 }}
        >
          <Text style={{ fontWeight: tab === 'songs' ? '700' : '400' }}>
            Songs
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => playSong(item)}
            style={{ flexDirection: 'row', marginBottom: 12 }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, borderRadius: 6 }}
            />
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => playSong(item)}
                style={{ flex: 1 }}
              >
                <Text>{item.name}</Text>
                <Text>{item.artists}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => addToQueue(item)}>
                <Text style={{ fontSize: 18 }}>➕</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
