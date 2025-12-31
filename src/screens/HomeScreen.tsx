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
  const [query, setQuery] = useState('arijit');
  const [songs, setSongs] = useState<Song[]>([]);
  const playSong = usePlayerStore((state) => state.playSong);

  const addToQueue = usePlayerStore((state) => state.addToQueue);

  const fetchSongs = async () => {
    const data = await searchSongs(query);

    const mappedSongs: Song[] = data.map((item: any) => {
      const audio =
        item.downloadUrl?.find((d: any) => d.quality === '320kbps') ||
        item.downloadUrl?.find((d: any) => d.quality === '160kbps') ||
        item.downloadUrl?.find((d: any) => d.quality === '96kbps');

      return {
        id: item.id,
        name: item.name,
        duration: Number(item.duration),
        artists: item.primaryArtists,
        image: item.image?.[2]?.link,
        audioUrl: audio?.link,
      };
    });

    setSongs(mappedSongs);
  };

  useEffect(() => {
    fetchSongs();
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
        onSubmitEditing={fetchSongs}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />

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
            {/* <View style={{ marginLeft: 10, flex: 1 }}>
              <Text numberOfLines={1} style={{ fontWeight: '600' }}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={{ color: 'gray' }}>
                {item.artists}
              </Text>
            </View> */}
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
