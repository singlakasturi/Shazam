import React, { useState, useEffect } from 'react';

const AudioVisualizer = ({ isListening }) => {
  const [bars, setBars] = useState(Array(20).fill(0));

  useEffect(() => {
    if (!isListening) {
      setBars(Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(Array(20).fill(0).map(() => Math.random() * 100));
    }, 150);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="flex items-end justify-center space-x-1 h-16 mb-8">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-purple-400 to-pink-400 rounded-full transition-all duration-150 ease-out"
          style={{
            height: `${height}%`,
            minHeight: '4px',
            width: '4px',
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;