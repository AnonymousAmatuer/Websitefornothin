
import React, { useState, useEffect, useRef } from 'react';
import Timer from '@/components/Timer';
import FlyingAlien from '@/components/FlyingAlien';
import FactPopup from '@/components/FactPopup';
import Meme from '@/components/Meme';
import { memes } from '@/data/memes';
import { playRandomSound } from '@/assets/sounds';
import ToiletGreeting from '@/components/ToiletGreeting';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Popup {
  id: number;
  position: { x: number; y: number };
}

const Index: React.FC = () => {
  const [aliens, setAliens] = useState<number[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const alienTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const soundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [popupCounter, setPopupCounter] = useState(0);
  
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
    
    if (!showGreeting && aliens.length < 10) {
      spawnAlien();
    }
    
    return () => {
      if (alienTimeoutRef.current) {
        clearTimeout(alienTimeoutRef.current);
      }
    };
  }, [aliens, showGreeting]);
  
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
        
        setPopups(prev => [...prev, { id: Date.now(), position: { x, y } }]);
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
    };
  }, []);
  
  const handleClosePopup = (id: number) => {
    setPopups(prev => prev.filter(popup => popup.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-[url('/bg-pattern.png')] cursor-pointer">
      {showGreeting && (
        <ToiletGreeting onComplete={() => setShowGreeting(false)} />
      )}
      
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
      
      {/* Popups */}
      {popups.map(popup => (
        <FactPopup 
          key={popup.id} 
          position={popup.position} 
          onClose={() => handleClosePopup(popup.id)} 
        />
      ))}
      
      {/* Final "Are you fed up" Popup */}
      <AlertDialog open={showFinalPopup} onOpenChange={setShowFinalPopup}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center comic-text animate-vibrate">
              Aren't you fed up yet??
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-4 text-center">
            <p className="comic-text text-lg">
              You've been here for a while now... 
              <br />
              <span className="text-red-500 font-bold">WHY ARE YOU STILL HERE?</span>
            </p>
            <div className="mt-4 flex justify-center">
              <span className="text-6xl animate-spin-slow">🤪</span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="w-full comic-text bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              onClick={() => {
                playRandomSound();
                setShowFinalPopup(false);
              }}
            >
              I'm enjoying the insanity!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Main Content */}
      <div className="container mx-auto py-20 px-4 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 text-center comic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse-border">
          GAB's CRINGEY WORLD
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
          {/* Memes */}
          {memes.map(meme => (
            <div 
              key={meme.id} 
              className="flex justify-center hover-scale transition-transform duration-300 cursor-pointer"
              onClick={() => playRandomSound()}
            >
              <Meme meme={meme} />
            </div>
          ))}
          
          {/* Extra content */}
          <div className="p-6 bg-gradient-radial from-yellow-300 to-orange-500 rounded-lg shadow-lg transform rotate-3 hover-scale comic-text text-center">
            <h3 className="text-2xl font-bold mb-2">BEHOLD!</h3>
            <p className="text-lg">The most beautiful website ever created.</p>
            <div className="mt-4 text-5xl">🔥</div>
          </div>
          
          <div className="p-6 glass-panel rounded-lg transform -rotate-2 hover-scale comic-text text-center">
            <h3 className="text-2xl font-bold mb-2">AMAZING FACT</h3>
            <p className="text-lg">This website lowered global productivity by 0.3%</p>
            <div className="mt-4 text-5xl">📉</div>
          </div>
        </div>
        
        <div className="mt-16 mb-24 p-8 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-lg shadow-xl max-w-3xl text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-bold text-white mb-4 comic-text">CONGRATULATIONS!</h2>
          <p className="text-xl text-white comic-text mb-6">
            You've reached the bottom of this page for absolutely no reason!
          </p>
          <button 
            className="px-8 py-3 bg-white text-purple-600 rounded-full text-xl font-bold hover:bg-yellow-200 transition-colors comic-text animate-bounce"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playRandomSound();
            }}
          >
            Go back to the top for more suffering!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
