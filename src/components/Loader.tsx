
import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-dark-bg z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex space-x-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-2 bg-neon-red rounded-full"
              style={{ animation: `loader 1s ease-in-out ${i * 0.1}s infinite` }}
            />
          ))}
        </div>
        <div className="text-2xl font-bold tracking-wider text-white relative">
          <span className="bg-clip-text text-transparent bg-logo-gradient bg-[length:200%_100%] animate-logo-shine px-4">
            NEONFLIX
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
