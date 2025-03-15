
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getRandomFact } from '../data/facts';

interface FactPopupProps {
  onClose: () => void;
  position: { x: number; y: number };
}

const FactPopup: React.FC<FactPopupProps> = ({ onClose, position }) => {
  const [fact] = useState(getRandomFact());
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  return (
    <div 
      className="windows-dialog fixed z-50 w-80 opacity-0 animate-windows-popup-in shadow-xl"
      style={{ 
        left: `${pos.x}px`, 
        top: `${pos.y}px`,
      }}
    >
      <div 
        className="windows-title-bar cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold">GAB FACT ALERT</span>
        <button 
          onClick={onClose}
          className="h-5 w-5 flex items-center justify-center rounded hover:bg-red-700"
        >
          <X size={14} />
        </button>
      </div>
      <div className="windows-content">
        <div className="flex mb-3">
          <div className="mr-3 text-3xl">ℹ️</div>
          <div className="comic-text">{fact}</div>
        </div>
        <div className="flex justify-center mt-2">
          <button 
            className="windows-button text-sm mr-2"
            onClick={onClose}
          >
            OK
          </button>
          <button 
            className="windows-button text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactPopup;
