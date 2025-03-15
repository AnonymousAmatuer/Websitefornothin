
import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';

interface ToiletGreetingProps {
  onComplete: () => void;
}

const ToiletGreeting: React.FC<ToiletGreetingProps> = ({ onComplete }) => {
  const [open, setOpen] = useState(true);
  const [showToilet, setShowToilet] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);
  
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
    // Show jumpscare before closing
    setShowJumpscare(true);
    
    setTimeout(() => {
      setOpen(false);
      onComplete();
    }, 1500);
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
      
      // Schedule jumpscare
      const jumpscareTimer = setTimeout(() => {
        setShowJumpscare(true);
        
        // Play jumpscare sound
        const jumpscareAudio = new Audio('/jumpscare.mp3');
        jumpscareAudio.volume = 0.4;
        jumpscareAudio.play().catch(e => console.error('Jumpscare audio play failed:', e));
        
        // Hide jumpscare after a short time
        setTimeout(() => {
          setShowJumpscare(false);
        }, 500);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(jumpscareTimer);
      };
    }
  }, [playSound]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center gap-8 cursor-pointer" onClick={handleClose}>
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-red-700 to-red-900 text-transparent bg-clip-text animate-pulse">
            Welcome to Gab's World
          </h1>
          <p className="text-red-500 text-xl mt-4 comic-text">
            Abandon all hope ye who enter here
          </p>
        </div>
        
        {showToilet && (
          <div className="animate-rotate-toilet">
            <div className="text-8xl filter glow">
              <img src="/skibidi-toilet.png" alt="Skibidi Toilet" className="w-32 h-32 object-contain" />
            </div>
          </div>
        )}
        
        <div className="text-red-500 mt-4 animate-bounce comic-text">
          Click if you dare...
        </div>
        
        {/* Jumpscare overlay */}
        {showJumpscare && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black">
            <img 
              src="/jumpscare.jpg" 
              alt="Jumpscare" 
              className="w-full h-full object-cover animate-scary-flash"
            />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ToiletGreeting;
