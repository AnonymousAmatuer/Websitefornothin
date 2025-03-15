
import React, { useState, useEffect } from 'react';
import { Skull, Crosshair, Ghost, Bomb, Radiation } from 'lucide-react';
import { playSpecificSound } from '../assets/sounds';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showSkull, setShowSkull] = useState(false);
  const [icon, setIcon] = useState<'skull' | 'ghost' | 'radiation'>('skull');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
      
      // Every 10 seconds (more frequent), flash the timer
      if ((seconds + 1) % 10 === 0) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 3000);
        
        // Show skull animation
        setShowSkull(true);
        setTimeout(() => setShowSkull(false), 2000);
        
        // Change icon
        setIcon(['skull', 'ghost', 'radiation'][Math.floor(Math.random() * 3)] as 'skull' | 'ghost' | 'radiation');
        
        // Play a scary sound with more variety
        const scarySounds = ['evil-laugh', 'horror-scream', 'scream', 'witch-laugh', 'jumpscare'];
        const scarySound = scarySounds[Math.floor(Math.random() * scarySounds.length)];
        playSpecificSound(scarySound);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [seconds]);
  
  // Render the appropriate icon
  const renderIcon = () => {
    switch (icon) {
      case 'ghost':
        return <Ghost className="h-5 w-5 text-red-500 animate-vibrate" />;
      case 'radiation':
        return <Radiation className="h-5 w-5 text-red-500 animate-vibrate" />;
      default:
        return <Skull className="h-5 w-5 text-red-500 animate-vibrate" />;
    }
  };
  
  return (
    <div className={`fixed bottom-0 right-0 p-4 z-50 rounded-tl-lg ${isFlashing ? 'bg-red-900 animate-pulse border-2 border-neon-pink' : 'glass-panel'}`}>
      {showSkull && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <Skull className="h-40 w-40 text-red-500 animate-pulse" />
        </div>
      )}
      <div className="flex flex-col items-center comic-text">
        <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text flex items-center gap-1 animate-pulse">
          {renderIcon()}
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
        {isFlashing && (
          <div className="mt-2 font-bold text-neon-pink animate-glitch">
            YOUR SOUL IS MINE NOW!
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
