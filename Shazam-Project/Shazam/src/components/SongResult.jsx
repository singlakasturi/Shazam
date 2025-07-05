import React, { useState } from 'react';
import { Play, Heart, Share2, X, Pause, Check } from 'lucide-react';
import SimilarSongs from './SimilarSongs';

const SongResult = ({ song, onClose, similarSongs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    console.log(`${isPlaying ? 'Pausing' : 'Playing'}: ${song.title} by ${song.artist}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(`${isLiked ? 'Unliked' : 'Liked'}: ${song.title}`);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${song.title} by ${song.artist}`,
      text: `Check out this song I discovered: ${song.title} by ${song.artist}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('Song shared successfully');
      } else {
        const shareText = `🎵 ${song.title} by ${song.artist} - ${song.album}`;
        await navigator.clipboard.writeText(shareText);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
        console.log('Song details copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      
      try {
        const shareText = `🎵 ${song.title} by ${song.artist} - ${song.album}`;
        await navigator.clipboard.writeText(shareText);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
    
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={song.artwork}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">{song.title}</h2>
          <p className="text-white/70 text-lg mb-1">{song.artist}</p>
          <p className="text-white/50 text-sm">{song.album}</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={handlePlay}
            className={`p-3 rounded-full transition-all ${
              isPlaying 
                ? 'bg-green-500/30 hover:bg-green-500/40 border border-green-400/50' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          
          <button 
            onClick={handleLike}
            className={`p-3 rounded-full transition-all ${
              isLiked 
                ? 'bg-red-500/30 hover:bg-red-500/40 border border-red-400/50' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'text-red-400 fill-current' : 'text-white'}`} />
          </button>
          
          <button 
            onClick={handleShare}
            className={`p-3 rounded-full transition-all ${
              isShared 
                ? 'bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/50' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title="Share"
          >
            {isShared ? (
              <Check className="w-6 h-6 text-blue-400" />
            ) : (
              <Share2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        <div className="flex justify-between text-white/60 text-sm mb-8">
          <span>{song.genre}</span>
          <span>{song.duration}</span>
        </div>

        <SimilarSongs songs={similarSongs} />

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all mt-6"
        >
          Listen Again
        </button>
      </div>
    </div>
  );
};

export default SongResult;