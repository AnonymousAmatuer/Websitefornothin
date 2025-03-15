
import React, { useEffect, useState } from 'react';

interface FlyingAlienProps {
  direction: 'ltr' | 'rtl';
  delay: number;
}

const FlyingAlien: React.FC<FlyingAlienProps> = ({ direction, delay }) => {
  const [yPosition, setYPosition] = useState(`${Math.random() * 80 + 10}vh`);
  const [rotation, setRotation] = useState(`${Math.random() * 360}deg`);
  const [size, setSize] = useState(`${Math.random() * 0.5 + 0.5}`);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!visible) return null;
  
  return (
    <div 
      className={`fixed z-40 transform transition-transform ${direction === 'ltr' ? 'animate-fly-left-to-right' : 'animate-fly-right-to-left'}`}
      style={{
        '--y-pos': yPosition,
        '--rotation': rotation,
        transform: `scale(${size})`,
      } as React.CSSProperties}
      onAnimationEnd={() => {
        setYPosition(`${Math.random() * 80 + 10}vh`);
        setRotation(`${Math.random() * 360}deg`);
        setSize(`${Math.random() * 0.5 + 0.5}`);
      }}
    >
      <div className="w-24 h-24 flex items-center justify-center glow">
        <span className="text-5xl transform rotate-12 filter">👽</span>
      </div>
    </div>
  );
};

export default FlyingAlien;
