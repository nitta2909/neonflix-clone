
import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      const fadeOutTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(fadeOutTimer);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  
  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${fadeOut ? 'animate-fade-out' : ''}`}>
      <div className="flex flex-col items-center">
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-red via-neon-purple to-neon-blue bg-[length:400%_100%] animate-[logo-shine_3s_ease-in-out_infinite]">
              NEONFLIX
            </span>
          </h1>
        </div>
        
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-3 rounded-full"
              style={{
                animation: `loader 1s ease-in-out ${i * 0.1}s infinite`,
                background: 'linear-gradient(to bottom, #FF0A54, #4CC9F0)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
