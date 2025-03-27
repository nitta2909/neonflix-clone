
import React, { useState, useEffect } from 'react';
import { Play, Info, VolumeX, Volume2 } from 'lucide-react';
import type { Movie } from '../data/movies';

interface HeroProps {
  movies: Movie[];
  onInfoClick: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movies, onInfoClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentMovie = movies[currentIndex];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };
  
  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      {/* Background image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${currentMovie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="container mx-auto px-4 md:px-8 pb-24">
          <div className="max-w-2xl">
            <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <div className="flex items-center space-x-3 mb-4">
                {currentMovie.isNew && (
                  <span className="bg-neon-red text-white text-xs font-medium px-2.5 py-1 rounded">NEW</span>
                )}
                {currentMovie.isTrending && (
                  <span className="bg-neon-blue text-white text-xs font-medium px-2.5 py-1 rounded">TRENDING</span>
                )}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{currentMovie.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-white/80 mb-6">
                <span>{currentMovie.year}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{currentMovie.duration}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <div className="flex items-center">
                  {currentMovie.rating.toFixed(1)} Rating
                </div>
              </div>
              
              <p className="text-white/70 mb-8 line-clamp-3 md:line-clamp-none">
                {currentMovie.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-red rounded-md font-medium text-white hover:bg-neon-red/80 transition-colors">
                  <Play className="w-5 h-5 fill-white" />
                  Play Now
                </button>
                
                <button 
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-md font-medium text-white border border-white/20 hover:border-neon-blue hover:bg-white/20 transition-colors"
                  onClick={() => onInfoClick(currentMovie)}
                >
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4">
        <button 
          className="p-2 bg-dark-bg/50 backdrop-blur-sm rounded-full hover:bg-neon-red/20 transition-colors"
          onClick={toggleMute}
        >
          {isMuted 
            ? <VolumeX className="w-5 h-5 text-white" />
            : <Volume2 className="w-5 h-5 text-white" />
          }
        </button>
        
        <div className="flex items-center space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-neon-red w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
