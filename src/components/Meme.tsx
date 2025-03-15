
import React from 'react';
import { MemeData } from '../data/memes';

interface MemeProps {
  meme: MemeData;
}

const Meme: React.FC<MemeProps> = ({ meme }) => {
  return (
    <div 
      className={`relative ${meme.width} ${meme.height} ${meme.background} rounded-lg overflow-hidden shadow-lg`} 
      style={{ 
        transform: `rotate(${meme.rotation}deg)`,
      }}
    >
      {/* Top Text */}
      <div className="absolute top-2 w-full text-center px-2">
        <h2 className="meme-text text-2xl">{meme.topText}</h2>
      </div>
      
      {/* Bottom Text */}
      {meme.bottomText && (
        <div className="absolute bottom-2 w-full text-center px-2">
          <h2 className="meme-text text-2xl">{meme.bottomText}</h2>
        </div>
      )}
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white"></div>
      </div>
    </div>
  );
};

export default Meme;
