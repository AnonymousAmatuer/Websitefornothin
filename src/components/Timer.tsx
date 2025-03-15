
import React, { useState, useEffect } from 'react';
import { Skull, Crosshair } from 'lucide-react';
import { playSpecificSound } from '../assets/sounds';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
      
      // Every 15 seconds (more frequent), flash the timer
      if ((seconds + 1) % 15 === 0) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 3000);
        
        // Play a scary sound with more variety
        const scarySound = Math.random() > 0.5 ? 'evil-laugh' : 'horror-scream';
        playSpecificSound(scarySound);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [seconds]);
  
  return (
    <div className={`fixed bottom-0 right-0 p-4 z-50 rounded-tl-lg ${isFlashing ? 'bg-red-900 animate-pulse border-2 border-neon-pink' : 'glass-panel'}`}>
      <div className="flex flex-col items-center comic-text">
        <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text flex items-center gap-1 animate-pulse">
          <Skull className="h-5 w-5 text-red-500 animate-vibrate" />
          <span>TIME WASTED:</span>
          <Crosshair className="h-5 w-5 text-red-500 animate-vibrate" />
        </div>
        <div className={`text-3xl font-bold ${isFlashing ? 'text-white animate-glitch' : 'text-neon-green'}`}>
          {seconds} seconds
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 text-transparent bg-clip-text animate-vibrate">
          OF YOUR LIFE!
        </div>
        <div className={`mt-1 text-md font-bold ${isFlashing ? 'text-white animate-vibrate' : 'text-red-500'}`}>
          {isFlashing ? 'YOU WILL NEVER GET THEM BACK!' : 'MUHAHAHA!'}
        </div>
      </div>
    </div>
  );
};

export default Timer;
