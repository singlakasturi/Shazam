import React from 'react';
import { Mic, MicOff } from 'lucide-react';

const ListeningButton = ({ isListening, onToggle }) => {
  return (
    <div className="relative">
      <div className={`absolute inset-0 rounded-full border-4 border-purple-400 ${isListening ? 'animate-ping' : ''}`} />
      
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
      
      <button
        onClick={onToggle}
        className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 
          shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95
          ${isListening ? 'shadow-purple-500/50' : 'shadow-purple-600/30'}`}
      >
        <div className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          {isListening ? (
            <MicOff className="w-12 h-12 text-white" />
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ListeningButton;