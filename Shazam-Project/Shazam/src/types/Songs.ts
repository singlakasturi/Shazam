export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: string;
  genre: string;
  timestamp: string;
  popularity?: number;
}