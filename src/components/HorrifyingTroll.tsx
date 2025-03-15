
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { playSpecificSound } from '@/assets/sounds';
import { Skull, Ghost, BugPlay } from 'lucide-react';

interface HorrifyingTrollProps {
  open: boolean;
  onClose: () => void;
}

const HorrifyingTroll: React.FC<HorrifyingTrollProps> = ({ open, onClose }) => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    if (!open) {
      setPhase(0);
      return;
    }
    
    // Play jumpscare sound
    playSpecificSound('jumpscare');
    
    // Sequence of horrifying phases
    const phaseTimeouts = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(() => setPhase(5), 4500),
      setTimeout(() => {
        playSpecificSound('scream');
        setPhase(6);
      }, 5500),
      setTimeout(() => onClose(), 6800)
    ];
    
    return () => {
      phaseTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [open, onClose]);
  
  // Get random scary image
  const getRandomScaryImage = () => {
    const images = [
      "/scary1.jpg",
      "/scary2.jpg",
      "/scary3.jpg",
      "/jumpscare.jpg",
      "/creepy-clown.jpg",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };
  
  // Render different horrifying content based on phase
  const renderHorrifyingContent = () => {
    switch (phase) {
      case 0:
        return (
          <div className="text-red-500 text-4xl font-bold animate-pulse text-center">
            PREPARING SOMETHING HORRIFYING...
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-4xl font-bold animate-glitch text-center mb-4">
              YOU SHOULDN'T HAVE CLICKED THAT
            </div>
            <Ghost className="w-32 h-32 text-white animate-pulse" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <div className="text-white text-5xl font-bold animate-vibrate text-center mb-4">
              TOO LATE TO ESCAPE
            </div>
            <BugPlay className="w-40 h-40 text-red-500 animate-spin-slow" />
          </div>
        );
      case 3:
        return (
          <div className="text-neon-green text-6xl font-bold animate-glitch text-center">
            YOUR DEVICE IS COMPROMISED
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center">
            <div className="text-white text-4xl font-bold animate-pulse text-center mb-4">
              DELETING ALL FILES...
            </div>
            <div className="w-4/5 bg-gray-900 border border-red-500 rounded-lg overflow-hidden mt-8">
              <div 
                className="bg-gradient-to-r from-red-500 via-red-700 to-red-500 h-6 animate-pulse"
                style={{ width: '75%' }}
              ></div>
            </div>
            <div className="text-red-500 font-mono mt-4">
              75% COMPLETE
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center">
            <div className="text-white text-5xl font-bold animate-glitch text-center mb-8">
              UPLOADING YOUR DATA TO DARK WEB
            </div>
            <Skull className="w-48 h-48 text-red-500 animate-pulse" />
          </div>
        );
      case 6:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={getRandomScaryImage()} 
              alt="JUMPSCARE" 
              className="max-w-full max-h-full object-contain animate-vibrate"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-white animate-glitch text-center bg-black bg-opacity-70 p-4">
                GOT YOU!!
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent 
        className={`max-w-screen max-h-screen w-screen h-screen p-0 m-0 overflow-hidden flex flex-col items-center justify-center ${
          phase === 6 ? 'bg-black' : 'bg-gradient-to-r from-black via-red-900 to-black animate-pulse-border'
        }`}
      >
        {renderHorrifyingContent()}
        
        {/* Random flickering elements */}
        {phase < 6 && (
          <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-4 h-4 rounded-full bg-red-500 animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HorrifyingTroll;
