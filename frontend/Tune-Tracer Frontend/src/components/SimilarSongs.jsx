import React, { useState } from 'react';
import { Play, Music, Pause } from 'lucide-react';

const SimilarSongs = ({ songs }) => {
  const [playingSongId, setPlayingSongId] = useState(null);

  if (songs.length === 0) {
    return null;
  }

  const handleSongPlay = (songId, song) => {
    if (playingSongId === songId) {
      setPlayingSongId(null);
      console.log(`Paused: ${song.title} by ${song.artist}`);
    } else {
      setPlayingSongId(songId);
      console.log(`Playing: ${song.title} by ${song.artist}`);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Music className="w-5 h-5 mr-2" />
        Similar Songs
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {songs.map((song) => {
          const isPlaying = playingSongId === song.id;
          
          return (
            <div
              key={song.id}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10 group"
            >
              <div className="relative">
                <img
                  src={song.artwork}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <button
                  onClick={() => handleSongPlay(song.id, song)}
                  className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/60"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate text-sm ${
                  isPlaying ? 'text-green-400' : 'text-white'
                }`}>
                  {song.title}
                </h4>
                <p className="text-white/60 text-xs truncate">{song.artist}</p>
              </div>
              
              <div className="text-right">
                <p className="text-white/40 text-xs">{song.duration}</p>
                {song.popularity && (
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: `${song.popularity}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarSongs;