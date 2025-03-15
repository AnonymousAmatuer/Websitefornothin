
import React, { useState, useEffect } from 'react';
import { X, Skull, AlertTriangle, Bug, Virus, Siren } from 'lucide-react';
import { playSpecificSound } from '../assets/sounds';

interface ScaryPopupProps {
  onClose: () => void;
  position: { x: number; y: number };
}

const ScaryPopup: React.FC<ScaryPopupProps> = ({ onClose, position }) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scaryImage] = useState(() => {
    const images = [
      "/scary1.jpg",
      "/scary2.jpg",
      "/scary3.jpg",
      "/jumpscare.jpg",
      "/creepy-clown.jpg",
      "/demon.jpg",
      "/zombie.jpg",
      "/ghost-face.jpg",
    ];
    return images[Math.floor(Math.random() * images.length)];
  });
  
  const [alertType] = useState(() => {
    const types = [
      "VIRUS DETECTED",
      "POLICE ALERT",
      "SECURITY BREACH",
      "DATA STOLEN",
      "RANSOMWARE DETECTED",
      "WEBCAM ACTIVATED",
      "PERSONAL DATA LEAKED",
      "IDENTITY THEFT ALERT"
    ];
    return types[Math.floor(Math.random() * types.length)];
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // Play a scary sound when the popup appears
  useEffect(() => {
    const sounds = ['scream', 'horror-scream', 'jumpscare', 'witch-laugh', 'evil-laugh'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    playSpecificSound(randomSound);
  }, []);

  const randomIcon = () => {
    const icons = [
      <Skull className="h-5 w-5 text-red-500 animate-vibrate" />,
      <AlertTriangle className="h-5 w-5 text-yellow-500 animate-pulse" />,
      <Bug className="h-5 w-5 text-green-500 animate-spin-slow" />,
      <Virus className="h-5 w-5 text-purple-500 animate-pulse" />,
      <Siren className="h-5 w-5 text-blue-500 animate-pulse" />
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <div 
      className="windows-dialog fixed z-50 w-80 opacity-0 animate-windows-popup-in shadow-xl"
      style={{ 
        left: `${pos.x}px`, 
        top: `${pos.y}px`,
        background: '#000',
        borderColor: '#ff0000',
      }}
    >
      <div 
        className="windows-title-bar cursor-move bg-gradient-to-r from-red-700 to-red-900"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold animate-pulse flex items-center">
          {randomIcon()}
          <span className="ml-1">{alertType}</span>
        </span>
        <button 
          onClick={onClose}
          className="h-5 w-5 flex items-center justify-center rounded hover:bg-red-700"
        >
          <X size={14} />
        </button>
      </div>
      <div className="windows-content bg-black text-red-500 p-2">
        <div className="flex flex-col items-center mb-3">
          <img 
            src={scaryImage} 
            alt="Scary" 
            className="w-full h-40 object-cover mb-2 animate-pulse border border-red-500" 
          />
          <div className="comic-text text-center animate-glitch">
            {alertType === "POLICE ALERT" ? 
              "YOU ARE UNDER SURVEILLANCE! PAY $1000 NOW!" : 
              "YOUR COMPUTER IS INFECTED WITH DEADLY VIRUSES!"}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button 
            className="windows-button text-sm mr-2 bg-red-900 text-white hover:bg-red-700"
            onClick={onClose}
          >
            OK
          </button>
          <button 
            className="windows-button text-sm bg-red-900 text-white hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScaryPopup;
