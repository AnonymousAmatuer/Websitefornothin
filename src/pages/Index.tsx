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
import { Skull, Zap, Shield, Ghost, Bomb, Radiation } from 'lucide-react';

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
  
  const backgroundThemes = [
    'bg-[url("/bg-pattern.png")]',
    'bg-[url("/bg-pattern-red.png")]',
    'bg-gradient-to-r from-red-900 via-black to-red-900',
    'bg-gradient-to-r from-purple-900 via-black to-purple-900',
    'bg-[url("/creepy-bg.jpg")]',
    'bg-gradient-to-r from-red-800 via-black to-purple-800',
    'bg-gradient-to-r from-black via-red-900 to-black',
    'bg-[url("/skull-pattern.png")]'
  ];
  
  useEffect(() => {
    const spawnAlien = () => {
      const delay = Math.random() * 2000 + 1000;
      alienTimeoutRef.current = setTimeout(() => {
        setAliens(prev => [...prev, Date.now()]);
        if (aliens.length < 25) {
          spawnAlien();
        }
      }, delay);
    };
    
    if (!showGreeting && aliens.length < 20) {
      spawnAlien();
    }
    
    return () => {
      if (alienTimeoutRef.current) {
        clearTimeout(alienTimeoutRef.current);
      }
    };
  }, [aliens, showGreeting]);
  
  useEffect(() => {
    const spawnToilet = () => {
      const delay = Math.random() * 3000 + 2000;
      toiletTimeoutRef.current = setTimeout(() => {
        setSkibidiToilets(prev => [...prev, Date.now()]);
        if (skibidiToilets.length < 12) {
          spawnToilet();
        }
      }, delay);
    };
    
    if (!showGreeting && skibidiToilets.length < 8) {
      spawnToilet();
    }
    
    return () => {
      if (toiletTimeoutRef.current) {
        clearTimeout(toiletTimeoutRef.current);
      }
    };
  }, [skibidiToilets, showGreeting]);
  
  useEffect(() => {
    const spawnPopup = () => {
      const delay = Math.random() * 5000 + 2000;
      popupTimeoutRef.current = setTimeout(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        const maxX = screenWidth - 320;
        const maxY = screenHeight - 200;
        
        const x = Math.max(10, Math.floor(Math.random() * maxX));
        const y = Math.max(10, Math.floor(Math.random() * maxY));
        
        const popupType = Math.random() > 0.4 ? 'scary' : 'fact';
        
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setColorTheme(prev => (prev + 1) % backgroundThemes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (popupCounter >= 5 && !showFinalPopup) {
      setShowFinalPopup(true);
    }
  }, [popupCounter, showFinalPopup]);
  
  useEffect(() => {
    const playSound = () => {
      const delay = Math.random() * 8000 + 2000;
      soundTimeoutRef.current = setTimeout(() => {
        playRandomSound();
        playSound();
      }, delay);
    };
    
    if (!showGreeting) {
      const initialDelay = setTimeout(() => {
        playSound();
      }, 1500);
      
      return () => {
        clearTimeout(initialDelay);
        if (soundTimeoutRef.current) {
          clearTimeout(soundTimeoutRef.current);
        }
      };
    }
  }, [showGreeting]);
  
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
    
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const maxX = screenWidth - 320;
      const maxY = screenHeight - 200;
      
      const x = Math.max(10, Math.floor(Math.random() * maxX));
      const y = Math.max(10, Math.floor(Math.random() * maxY));
      
      const popupType = Math.random() > 0.5 ? 'scary' : 'fact';
      
      setPopups(prev => [...prev, { id: Date.now(), position: { x, y }, type: popupType }]);
    }, 500);
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
      
      <HackerScreen open={showHackerScreen} onClose={() => setShowHackerScreen(false)} />
      
      <Timer />
      
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
      
      <div className="fixed top-4 left-4 z-50">
        <Button 
          onClick={() => {
            playSpecificSound('jumpscare');
            setPopups(prev => {
              const newPopups = Array.from({ length: 3 }, () => {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                const maxX = screenWidth - 320;
                const maxY = screenHeight - 200;
                
                const x = Math.max(10, Math.floor(Math.random() * maxX));
                const y = Math.max(10, Math.floor(Math.random() * maxY));
                
                return { id: Date.now() + Math.random() * 1000, position: { x, y }, type: 'scary' as 'scary' };
              });
              
              return [...prev, ...newPopups];
            });
          }}
          className="bg-purple-900 border-2 border-neon-pink text-white hover:bg-black hover:text-neon-pink animate-vibrate px-4 py-2 rounded font-mono flex items-center gap-2"
        >
          <Ghost className="h-5 w-5" />
          SUMMON DEMONS
          <Radiation className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="fixed bottom-4 left-4 z-50">
        <Button 
          onClick={() => {
            const newToilets = Array.from({ length: 5 }, () => Date.now() + Math.random() * 1000);
            setSkibidiToilets(prev => [...prev, ...newToilets]);
            playSpecificSound('fart');
          }}
          className="bg-gradient-to-r from-yellow-600 to-red-600 text-white hover:from-red-600 hover:to-yellow-600 animate-pulse-border px-4 py-2 rounded font-mono flex items-center gap-2"
        >
          <Bomb className="h-5 w-5" />
          TOILET EXPLOSION
          <Zap className="h-5 w-5" />
        </Button>
      </div>
      
      {aliens.map((id, index) => (
        <FlyingAlien 
          key={id} 
          direction={index % 2 === 0 ? 'ltr' : 'rtl'} 
          delay={index * 300}
        />
      ))}
      
      {skibidiToilets.map((id, index) => (
        <SkibidiToilet key={id} delay={index * 500} />
      ))}
      
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
      
      <AlertDialog open={showFinalPopup} onOpenChange={setShowFinalPopup}>
        <AlertDialogContent className="max-w-md bg-black border-2 border-red-500 text-red-500 animate-pulse-border">
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
              <br />
              <span className="text-neon-green animate-glitch font-bold">YOUR DEVICE IS NOW INFECTED!</span>
            </p>
            <div className="mt-4 flex justify-center">
              <span className="text-6xl animate-spin-slow">💀</span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="w-full comic-text bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white animate-glitch"
              onClick={() => {
                playSpecificSound('jumpscare');
                setShowFinalPopup(false);
                
                const newToilets = Array.from({ length: 5 }, () => Date.now() + Math.random() * 1000);
                setSkibidiToilets(prev => [...prev, ...newToilets]);
                
                const newAliens = Array.from({ length: 5 }, () => Date.now() + Math.random() * 1000);
                setAliens(prev => [...prev, ...newAliens]);
              }}
            >
              I LOVE THE INSANITY!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="container mx-auto py-20 px-4 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 text-center comic-text animate-glitch text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-500 border-4 border-dashed border-red-500 p-4">
          GAB's CURSED WORLD
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
          {memes.map(meme => (
            <div 
              key={meme.id} 
              className="flex justify-center hover-scale transition-transform duration-300 cursor-pointer animate-pulse"
              onClick={() => {
                playRandomSound();
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                const maxX = screenWidth - 320;
                const maxY = screenHeight - 200;
                
                const x = Math.max(10, Math.floor(Math.random() * maxX));
                const y = Math.max(10, Math.floor(Math.random() * maxY));
                
                setPopups(prev => [...prev, { id: Date.now(), position: { x, y }, type: Math.random() > 0.5 ? 'scary' : 'fact' }]);
              }}
            >
              <Meme meme={meme} />
            </div>
          ))}
          
          <div className="p-6 bg-gradient-radial from-red-500 to-black rounded-lg shadow-lg transform rotate-3 hover-scale comic-text text-center border-2 border-red-500 animate-glitch">
            <h3 className="text-2xl font-bold mb-2 text-white">WARNING!</h3>
            <p className="text-lg text-white">Your computer will explode in 5 seconds.</p>
            <div className="mt-4 text-5xl">💥</div>
          </div>
          
          <div className="p-6 glass-panel rounded-lg transform -rotate-2 hover-scale comic-text text-center border-2 border-red-500 bg-black bg-opacity-70 text-red-500 animate-pulse-border">
            <h3 className="text-2xl font-bold mb-2 animate-vibrate">HORRIFIC FACT</h3>
            <p className="text-lg">This website is known to cause nightmares</p>
            <div className="mt-4 text-5xl animate-pulse">👹</div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-purple-900 to-black rounded-lg shadow-lg transform rotate-1 hover-scale comic-text text-center border-2 border-neon-pink animate-pulse">
            <h3 className="text-2xl font-bold mb-2 text-neon-pink">VIRUS ALERT</h3>
            <p className="text-lg text-white">Your personal data is being uploaded</p>
            <div className="mt-4 text-5xl animate-spin-slow">🦠</div>
          </div>
        </div>
        
        <div className="mt-16 mb-24 p-8 bg-gradient-to-r from-red-900 via-purple-900 to-red-900 rounded-lg shadow-xl max-w-3xl text-center transform hover:scale-105 transition-transform duration-300 border-2 border-red-500 animate-pulse-border">
          <h2 className="text-4xl font-bold text-white mb-4 comic-text animate-glitch">SUFFER MORE!</h2>
          <p className="text-xl text-white comic-text mb-6">
            You've reached the bottom of this horrific page!
          </p>
          <button 
            className="px-8 py-3 bg-black text-red-500 rounded-full text-xl font-bold hover:bg-red-900 hover:text-white transition-colors comic-text animate-bounce border-2 border-red-500"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playSpecificSound('witch-laugh');
              
              const newToilets = Array.from({ length: 5 }, () => Date.now() + Math.random() * 1000);
              setSkibidiToilets(prev => [...prev, ...newToilets]);
              
              const screenWidth = window.innerWidth;
              const screenHeight = window.innerHeight;
              
              const newPopups = Array.from({ length: 3 }, () => {
                const maxX = screenWidth - 320;
                const maxY = screenHeight - 200;
                
                const x = Math.max(10, Math.floor(Math.random() * maxX));
                const y = Math.max(10, Math.floor(Math.random() * maxY));
                
                return { id: Date.now() + Math.random() * 1000, position: { x, y }, type: Math.random() > 0.5 ? 'scary' : 'fact' };
              });
              
              setPopups(prev => [...prev, ...newPopups]);
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
