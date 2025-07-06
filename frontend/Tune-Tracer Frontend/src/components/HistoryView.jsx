import React from 'react';
import { Music } from 'lucide-react';
import HistoryItem from './HistoryItem';

const HistoryView = ({ history, onClose, onSongClick }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Discoveries</h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">No songs identified yet</p>
            <p className="text-white/40 text-sm">Start listening to build your history</p>
          </div>
        ) : (
          history.map((song) => (
            <HistoryItem
              key={song.id}
              song={song}
              onClick={() => onSongClick(song)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;