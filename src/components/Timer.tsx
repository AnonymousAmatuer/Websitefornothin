
import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 glass-panel rounded-tl-lg">
      <div className="flex flex-col items-center comic-text">
        <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
          You have wasted
        </div>
        <div className="text-3xl font-bold text-neon-green">
          {seconds} seconds
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">
          of your life!
        </div>
        <div className="mt-1 text-md font-bold text-yellow-400">
          Congratulations!
        </div>
      </div>
    </div>
  );
};

export default Timer;
