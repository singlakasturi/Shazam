import React, { useState } from 'react';
import { mockSongs, getSimilarSongs } from './data/mockData';
import Header from './components/Header';
import ListeningInterface from './components/ListeningInterface';
import HistoryView from './components/HistoryView';
import SongResult from './components/SongResult';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleListenToggle = () => {
    if (isListening) {
      setIsListening(false);
      setTimeout(() => {
        const randomSong = mockSongs[Math.floor(Math.random() * mockSongs.length)];
        setCurrentSong(randomSong);
        setHistory(prev => [randomSong, ...prev.filter(song => song.id !== randomSong.id)]);
      }, 1000);
    } else {
      setIsListening(true);
    }
  };

  const handleCloseResult = () => {
    setCurrentSong(null);
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  const similarSongs = currentSong ? getSimilarSongs(currentSong) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
      
      <Header onShowHistory={handleShowHistory} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6">
        {!showHistory ? (
          <ListeningInterface isListening={isListening} onToggle={handleListenToggle} />
        ) : (
          <HistoryView 
            history={history} 
            onClose={handleShowHistory} 
            onSongClick={handleSongClick}
          />
        )}
      </div>
+
      {currentSong && (
        <SongResult 
          song={currentSong} 
          onClose={handleCloseResult}
          similarSongs={similarSongs}
        />
      )}
    </div>
  );
};

export default App;