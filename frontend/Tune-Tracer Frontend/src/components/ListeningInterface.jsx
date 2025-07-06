import React from 'react';
import { Volume2 } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import ListeningButton from './ListeningButton';

const ListeningInterface = ({ isListening, onToggle }) => {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          {isListening ? 'Listening...' : 'Tap to identify music'}
        </h2>
        <p className="text-white/70 text-lg max-w-md">
          {isListening 
            ? 'Hold your device close to the music source'
            : 'Discover songs playing around you'
          }
        </p>
      </div>

      <AudioVisualizer isListening={isListening} />

      <ListeningButton isListening={isListening} onToggle={onToggle} />

      {isListening && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <Volume2 className="w-5 h-5 text-white/60" />
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningInterface;