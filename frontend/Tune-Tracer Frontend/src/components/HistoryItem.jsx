import React from 'react';

const HistoryItem = ({ song, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
    >
      <img
        src={song.artwork}
        alt={song.title}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{song.title}</h3>
        <p className="text-white/60 text-sm truncate">{song.artist}</p>
      </div>
      <div className="text-right">
        <p className="text-white/40 text-xs">{song.timestamp}</p>
      </div>
    </div>
  );
};

export default HistoryItem;