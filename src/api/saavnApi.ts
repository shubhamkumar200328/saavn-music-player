const BASE_URL = 'https://saavn.sumit.co';

export const searchSongs = async (query: string) => {
  const res = await fetch(`${BASE_URL}/api/search/songs?query=${query}`);
  const json = await res.json();
  return json.data.results;
};

export const getSongById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/songs/${id}`);
  const json = await res.json();
  return json.data[0];
};
