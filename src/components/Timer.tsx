
import React, { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
      
      // Every 30 seconds, flash the timer
      if ((seconds + 1) % 30 === 0) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 2000);
        
        // Play a scary sound
        const audio = new Audio('/evil-laugh.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.error('Audio play failed:', e));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [seconds]);
  
  return (
    <div className={`fixed bottom-0 right-0 p-4 z-50 rounded-tl-lg ${isFlashing ? 'bg-red-900 animate-pulse' : 'glass-panel'}`}>
      <div className="flex flex-col items-center comic-text">
        <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text flex items-center gap-1">
          <Skull className="h-5 w-5 text-red-500" />
          <span>You have wasted</span>
        </div>
        <div className={`text-3xl font-bold ${isFlashing ? 'text-white animate-glitch' : 'text-neon-green'}`}>
          {seconds} seconds
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 text-transparent bg-clip-text">
          of your life!
        </div>
        <div className={`mt-1 text-md font-bold ${isFlashing ? 'text-white animate-vibrate' : 'text-red-500'}`}>
          {isFlashing ? 'YOU WILL NEVER GET THEM BACK!' : 'Congratulations!'}
        </div>
      </div>
    </div>
  );
};

export default Timer;
