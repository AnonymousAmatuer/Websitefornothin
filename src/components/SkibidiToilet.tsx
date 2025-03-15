
import React, { useEffect, useState } from 'react';

interface SkibidiToiletProps {
  delay?: number;
}

const SkibidiToilet: React.FC<SkibidiToiletProps> = ({ delay = 0 }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 80,
    y: Math.random() * 80,
    speedX: (Math.random() * 4) + 1,
    speedY: (Math.random() * 4) + 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() * 10) - 5,
    scale: Math.random() * 0.5 + 0.5,
  });
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Delay the appearance of the toilet
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    // Animation frame for bouncing movement
    let animationId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;
      
      setPosition(prev => {
        // Calculate new position
        let newX = prev.x + prev.speedX * (delta / 16);
        let newY = prev.y + prev.speedY * (delta / 16);
        let newSpeedX = prev.speedX;
        let newSpeedY = prev.speedY;
        
        // Bounce off walls
        if (newX <= 0 || newX >= 90) {
          newSpeedX = -prev.speedX;
          new Audio('/bonk.mp3').play().catch(e => console.error('Audio play failed:', e));
        }
        if (newY <= 0 || newY >= 90) {
          newSpeedY = -prev.speedY;
          new Audio('/bonk.mp3').play().catch(e => console.error('Audio play failed:', e));
        }
        
        // Update rotation
        const newRotation = (prev.rotation + prev.rotationSpeed) % 360;
        
        return {
          ...prev,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
          rotation: newRotation,
        };
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    if (visible) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      clearTimeout(showTimer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [delay, visible]);
  
  if (!visible) return null;
  
  return (
    <div 
      className="fixed z-30 pointer-events-none"
      style={{
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
        transition: 'transform 0.1s linear',
      }}
    >
      <div className="w-20 h-20 flex items-center justify-center">
        <img src="/skibidi-toilet.png" alt="Skibidi Toilet" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default SkibidiToilet;
