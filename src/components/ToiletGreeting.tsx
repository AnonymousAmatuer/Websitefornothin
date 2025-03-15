
import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';

interface ToiletGreetingProps {
  onComplete: () => void;
}

const ToiletGreeting: React.FC<ToiletGreetingProps> = ({ onComplete }) => {
  const [open, setOpen] = useState(true);
  const [showToilet, setShowToilet] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowToilet(true);
        setPlaySound(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  const handleClose = () => {
    setOpen(false);
    onComplete();
  };
  
  useEffect(() => {
    if (playSound) {
      // Play the sound
      const audio = new Audio('/toilet-flush.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.error('Audio play failed:', e));
      
      const screamAudio = new Audio('/scream.mp3');
      screamAudio.volume = 0.3;
      
      const timer = setTimeout(() => {
        screamAudio.play().catch(e => console.error('Scream audio play failed:', e));
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [playSound]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center gap-8 cursor-pointer" onClick={handleClose}>
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-pulse">
            Welcome to Gab's World
          </h1>
          <p className="text-white text-xl mt-4 comic-text">
            Where logic dies and nonsense thrives
          </p>
        </div>
        
        {showToilet && (
          <div className="animate-rotate-toilet">
            <div className="text-8xl filter glow">🚽</div>
          </div>
        )}
        
        <div className="text-white mt-4 animate-bounce">
          Click anywhere to continue...
        </div>
      </div>
    </Dialog>
  );
};

export default ToiletGreeting;
