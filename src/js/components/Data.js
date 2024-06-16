import { settings } from '../settings.js';

const Data = async function() {
  const urls = {
    songs: settings.db.url1 + '/' + settings.db.songs,
    artists: settings.db.url1 + '/' + settings.db.artists,
  };
  
  try {
    const [songsResponse, artistsResponse] = await Promise.all([
      fetch(urls.songs),
      fetch(urls.artists),
    ]);
  
    const [songs, artists] = await Promise.all([
      songsResponse.json(),
      artistsResponse.json(),
    ]);
  
    return { songs, artists };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  
const parseData = function(songs, artists) {
  const songsData = [];
  
  for (let song of songs) {
    const author = artists.find(artist => artist.authorNr === song.author);
    const fullSongName = song.title + '-' + author.authorName;
  
    const songObj = {
      songId: song.id,
      songRanking: song.ranking,
      fullName: fullSongName,
      fileName: song.filename,
      songCategories: song.categories.join(', '),
      songCatForFilter: song.categories,
    };
  
    songsData.push(songObj);
  }
  
  return songsData;
};

const getCategories = function(songs) {
  const allCategories = new Set();
  
  for (let song of songs) {
    for (let category of song.categories){
      allCategories.add(category);
    }
  }
  console.log('all categories', allCategories);
  return Array.from(allCategories);
};
  
export { Data, parseData, getCategories};
  