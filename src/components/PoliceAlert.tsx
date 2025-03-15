
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Siren, AlertTriangle, BadgeDollarSign } from 'lucide-react';
import { playSpecificSound } from '@/assets/sounds';

interface PoliceAlertProps {
  open: boolean;
  onClose: () => void;
}

const PoliceAlert: React.FC<PoliceAlertProps> = ({ open, onClose }) => {
  const [countdown, setCountdown] = useState(30);
  
  useEffect(() => {
    if (!open) return;
    
    // Play police siren sound on loop
    const sirenSound = new Audio('/police-siren.mp3');
    sirenSound.volume = 0.3;
    sirenSound.loop = true;
    sirenSound.play().catch(e => console.error('Audio play failed:', e));
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
      sirenSound.pause();
      sirenSound.currentTime = 0;
    };
  }, [open]);
  
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl bg-gradient-to-r from-blue-900 via-black to-red-900 border-4 border-blue-500 p-6 animate-pulse-border">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-red-600 to-blue-600 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Siren className="h-8 w-8 text-white animate-pulse mr-2" />
            <span className="text-white font-bold text-xl">POLICE ALERT</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <AlertDialogHeader className="mt-12">
          <AlertDialogTitle className="text-3xl text-center comic-text animate-glitch text-white">
            ⚠️ FEDERAL WARNING ⚠️
          </AlertDialogTitle>
          
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
              <Siren className="h-16 w-16 text-white" />
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="py-6 text-center space-y-4">
          <p className="text-white text-xl font-bold animate-vibrate">
            YOUR DEVICE HAS BEEN LOCKED BY THE POLICE
          </p>
          
          <div className="bg-black bg-opacity-70 p-4 rounded-lg border border-red-500">
            <p className="text-red-500 font-mono">
              You have accessed CRIMINAL content on this website.
            </p>
            <p className="text-white font-mono mt-2">
              Your IP Address: {Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
            </p>
            <p className="text-neon-green font-mono mt-2 animate-glitch">
              LOCATION: TRACKED
            </p>
          </div>
          
          <div className="bg-red-900 p-3 rounded-lg">
            <p className="text-white font-bold">
              Your device will be unlocked in: <span className="text-yellow-400 text-2xl animate-pulse">{countdown}</span> seconds
            </p>
            <p className="text-white mt-2">
              Pay a <span className="text-neon-green font-bold">$1000 fine</span> now to avoid prosecution
            </p>
          </div>
        </div>
        
        <AlertDialogFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white text-lg py-6 animate-pulse-border border-2 border-green-400 flex items-center justify-center gap-2"
            onClick={() => {
              playSpecificSound('scream');
              onClose();
            }}
          >
            <BadgeDollarSign className="h-6 w-6" />
            PAY $1000 FINE NOW
            <BadgeDollarSign className="h-6 w-6" />
          </Button>
          
          <Button
            variant="destructive"
            className="w-full py-2 animate-vibrate text-sm"
            onClick={() => {
              playSpecificSound('horror-scream');
              onClose();
            }}
          >
            I accept all legal consequences
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PoliceAlert;
