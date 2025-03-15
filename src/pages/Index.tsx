
import React, { useState, useEffect, useRef } from 'react';
import Timer from '@/components/Timer';
import FlyingAlien from '@/components/FlyingAlien';
import FactPopup from '@/components/FactPopup';
import ScaryPopup from '@/components/ScaryPopup';
import Meme from '@/components/Meme';
import { memes } from '@/data/memes';
import { playRandomSound, playSpecificSound } from '@/assets/sounds';
import ToiletGreeting from '@/components/ToiletGreeting';
import SkibidiToilet from '@/components/SkibidiToilet';
import HackerScreen from '@/components/HackerScreen';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skull, Zap, Shield } from 'lucide-react';

interface Popup {
  id: number;
  position: { x: number; y: number };
  type: 'fact' | 'scary';
}

const Index: React.FC = () => {
  const [aliens, setAliens] = useState<number[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [skibidiToilets, setSkibidiToilets] = useState<number[]>([]);
  const [showHackerScreen, setShowHackerScreen] = useState(false);
  const [colorTheme, setColorTheme] = useState(0);
  
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const alienTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const soundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toiletTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [popupCounter, setPopupCounter] = useState(0);
  
  // Array of background themes
  const backgroundThemes = [
    'bg-[url("/bg-pattern.png")]',
    'bg-[url("/bg-pattern-red.png")]',
    'bg-gradient-to-r from-red-900 via-black to-red-900',
    'bg-gradient-to-r from-purple-900 via-black to-purple-900',
    'bg-[url("/creepy-bg.jpg")]'
  ];
  
  // Handle alien spawning
  useEffect(() => {
    const spawnAlien = () => {
      const delay = Math.random() * 3000 + 2000;
      alienTimeoutRef.current = setTimeout(() => {
        setAliens(prev => [...prev, Date.now()]);
        if (aliens.length < 20) {
          spawnAlien();
        }
      }, delay);
    };
    
    if (!showGreeting && aliens.length < 15) {
      spawnAlien();
    }
    
    return () => {
      if (alienTimeoutRef.current) {
        clearTimeout(alienTimeoutRef.current);
      }
    };
  }, [aliens, showGreeting]);
  
  // Handle skibidi toilet spawning
  useEffect(() => {
    const spawnToilet = () => {
      const delay = Math.random() * 5000 + 3000;
      toiletTimeoutRef.current = setTimeout(() => {
        setSkibidiToilets(prev => [...prev, Date.now()]);
        if (skibidiToilets.length < 8) {
          spawnToilet();
        }
      }, delay);
    };
    
    if (!showGreeting && skibidiToilets.length < 5) {
      spawnToilet();
    }
    
    return () => {
      if (toiletTimeoutRef.current) {
        clearTimeout(toiletTimeoutRef.current);
      }
    };
  }, [skibidiToilets, showGreeting]);
  
  // Handle fact popup spawning
  useEffect(() => {
    const spawnPopup = () => {
      const delay = Math.random() * 10000 + 5000;
      popupTimeoutRef.current = setTimeout(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        const maxX = screenWidth - 320;
        const maxY = screenHeight - 200;
        
        const x = Math.max(10, Math.floor(Math.random() * maxX));
        const y = Math.max(10, Math.floor(Math.random() * maxY));
        
        // Randomly choose between fact and scary popup
        const popupType = Math.random() > 0.6 ? 'scary' : 'fact';
        
        setPopups(prev => [...prev, { id: Date.now(), position: { x, y }, type: popupType }]);
        setPopupCounter(prev => prev + 1);
        spawnPopup();
      }, delay);
    };
    
    if (!showGreeting) {
      spawnPopup();
    }
    
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, [showGreeting]);
  
  // Change background color theme periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setColorTheme(prev => (prev + 1) % backgroundThemes.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check if we should show the final popup
  useEffect(() => {
    if (popupCounter >= 5 && !showFinalPopup) {
      setShowFinalPopup(true);
    }
  }, [popupCounter, showFinalPopup]);
  
  // Random sound player
  useEffect(() => {
    const playSound = () => {
      const delay = Math.random() * 15000 + 5000;
      soundTimeoutRef.current = setTimeout(() => {
        playRandomSound();
        playSound();
      }, delay);
    };
    
    if (!showGreeting) {
      // Initial delay before first sound
      const initialDelay = setTimeout(() => {
        playSound();
      }, 3000);
      
      return () => {
        clearTimeout(initialDelay);
        if (soundTimeoutRef.current) {
          clearTimeout(soundTimeoutRef.current);
        }
      };
    }
  }, [showGreeting]);
  
  // Clean up all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      if (alienTimeoutRef.current) clearTimeout(alienTimeoutRef.current);
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
      if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
      if (toiletTimeoutRef.current) clearTimeout(toiletTimeoutRef.current);
    };
  }, []);
  
  const handleClosePopup = (id: number) => {
    setPopups(prev => prev.filter(popup => popup.id !== id));
  };
  
  const handleHackerButtonClick = () => {
    setShowHackerScreen(true);
    playSpecificSound('jumpscare');
  };
  
  return (
    <div className={`min-h-screen ${backgroundThemes[colorTheme]} cursor-pointer transition-colors duration-1000`}>
      {showGreeting && (
        <ToiletGreeting onComplete={() => setShowGreeting(false)} />
      )}
      
      {/* Hacker Screen */}
      <HackerScreen open={showHackerScreen} onClose={() => setShowHackerScreen(false)} />
      
      {/* Timer */}
      <Timer />
      
      {/* Flying Aliens */}
      {aliens.map((id, index) => (
        <FlyingAlien 
          key={id} 
          direction={index % 2 === 0 ? 'ltr' : 'rtl'} 
          delay={index * 300}
        />
      ))}
      
      {/* Skibidi Toilets */}
      {skibidiToilets.map((id, index) => (
        <SkibidiToilet key={id} delay={index * 500} />
      ))}
      
      {/* Popups */}
      {popups.map(popup => 
        popup.type === 'fact' ? (
          <FactPopup 
            key={popup.id} 
            position={popup.position} 
            onClose={() => handleClosePopup(popup.id)} 
          />
        ) : (
          <ScaryPopup
            key={popup.id}
            position={popup.position}
            onClose={() => handleClosePopup(popup.id)}
          />
        )
      )}
      
      {/* Final "Are you fed up" Popup */}
      <AlertDialog open={showFinalPopup} onOpenChange={setShowFinalPopup}>
        <AlertDialogContent className="max-w-md bg-black border-2 border-red-500 text-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center comic-text animate-vibrate text-red-500">
              Aren't you fed up yet??
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-4 text-center">
            <p className="comic-text text-lg text-red-500">
              You've been here for a while now... 
              <br />
              <span className="text-red-500 font-bold animate-pulse">WHY ARE YOU STILL HERE?</span>
            </p>
            <div className="mt-4 flex justify-center">
              <span className="text-6xl animate-spin-slow">💀</span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="w-full comic-text bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white"
              onClick={() => {
                playRandomSound();
                setShowFinalPopup(false);
              }}
            >
              I LOVE THE INSANITY!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Hacker Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={handleHackerButtonClick}
          className="bg-black border-2 border-red-500 text-red-500 hover:bg-red-900 hover:text-white animate-pulse px-4 py-2 rounded font-mono flex items-center gap-2"
        >
          <Skull className="h-5 w-5" />
          HACK SYSTEM
          <Shield className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-20 px-4 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 text-center comic-text animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-500 border-4 border-dashed border-red-500 p-4">
          GAB's CRINGEY WORLD
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
          {/* Memes */}
          {memes.map(meme => (
            <div 
              key={meme.id} 
              className="flex justify-center hover-scale transition-transform duration-300 cursor-pointer animate-pulse"
              onClick={() => playRandomSound()}
            >
              <Meme meme={meme} />
            </div>
          ))}
          
          {/* Extra content */}
          <div className="p-6 bg-gradient-radial from-red-500 to-black rounded-lg shadow-lg transform rotate-3 hover-scale comic-text text-center border-2 border-red-500 animate-pulse">
            <h3 className="text-2xl font-bold mb-2 text-white">WARNING!</h3>
            <p className="text-lg text-white">Your computer will explode in 5 seconds.</p>
            <div className="mt-4 text-5xl">💥</div>
          </div>
          
          <div className="p-6 glass-panel rounded-lg transform -rotate-2 hover-scale comic-text text-center border-2 border-red-500 bg-black bg-opacity-70 text-red-500">
            <h3 className="text-2xl font-bold mb-2 animate-pulse">HORRIFIC FACT</h3>
            <p className="text-lg">This website is known to cause nightmares</p>
            <div className="mt-4 text-5xl">👹</div>
          </div>
        </div>
        
        <div className="mt-16 mb-24 p-8 bg-gradient-to-r from-red-900 via-purple-900 to-red-900 rounded-lg shadow-xl max-w-3xl text-center transform hover:scale-105 transition-transform duration-300 border-2 border-red-500">
          <h2 className="text-4xl font-bold text-white mb-4 comic-text animate-pulse">SUFFER MORE!</h2>
          <p className="text-xl text-white comic-text mb-6">
            You've reached the bottom of this horrific page!
          </p>
          <button 
            className="px-8 py-3 bg-black text-red-500 rounded-full text-xl font-bold hover:bg-red-900 hover:text-white transition-colors comic-text animate-bounce border-2 border-red-500"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playRandomSound();
              
              // Spawn additional toilets when scrolling back to top
              const newToilets = Array.from({ length: 3 }, () => Date.now() + Math.random() * 1000);
              setSkibidiToilets(prev => [...prev, ...newToilets]);
            }}
          >
            Go back to the top for more PAIN!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
