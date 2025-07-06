export const mockSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '3:20',
    genre: 'Pop',
    timestamp: '2 min ago',
    popularity: 95
  }
];

export const getSimilarSongs = (currentSong) => {
  return mockSongs
    .filter(song => song.id !== currentSong.id && song.genre === currentSong.genre)
    .slice(0, 4);
};