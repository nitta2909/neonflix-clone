
import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // Start fade out after 2.5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      // Complete removal after fade animation (1s)
      const fadeOutTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(fadeOutTimer);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If loading is complete, don't render anything
  if (!isLoading) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${
        fadeOut ? 'opacity-0 transition-opacity duration-1000' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-12">
          <h1 className="text-7xl font-extrabold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-red via-neon-purple to-neon-blue bg-[length:400%_100%] animate-[logo-shine_3s_ease-in-out_infinite]">
              NEONFLIX
            </span>
          </h1>
        </div>
        
        <div className="flex space-x-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 w-4 rounded-full"
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
