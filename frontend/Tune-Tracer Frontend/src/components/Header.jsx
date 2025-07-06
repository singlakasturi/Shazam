import React from 'react';
import { Clock, Search } from 'lucide-react';

const Header = ({ onShowHistory }) => {
  return (
    <div className="relative z-10 p-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <img
            src="/assets/shazam.webp"
            alt="Shazam Logo"
            className="w-10 h-10 object-cover"
          />
        </div>
      </div>

      <h1 className="text-white text-5xl font-bold absolute left-1/2 transform -translate-x-1/2">
        TUNE-Tracer
      </h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={onShowHistory}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
        >
          <Clock className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;
