
import React, { useEffect, useState } from 'react';
import { X, Play, Plus, Share2, Star } from 'lucide-react';
import type { Movie } from '../data/movies';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (movie) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [movie]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  
  if (!movie) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-card-bg rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 bg-dark-bg/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-neon-red/20 transition-colors"
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Hero image */}
        <div className="relative h-[300px]">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-4xl font-bold text-white mb-2">{movie.title}</h2>
            
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-neon-red fill-neon-red mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[400px]">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <p className="text-white/80 leading-relaxed">{movie.description}</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-red rounded-md font-medium text-white hover:bg-neon-red/80 transition-colors">
              <Play className="w-5 h-5 fill-white" />
              Play Now
            </button>
            
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-dark-bg border border-white/20 rounded-md font-medium text-white hover:border-neon-red transition-colors">
              <Plus className="w-5 h-5" />
              Add to List
            </button>
            
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-dark-bg border border-white/20 rounded-md font-medium text-white hover:border-neon-red transition-colors">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Related Content</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-md overflow-hidden shimmer">
                  <div className="bg-muted/20 h-36"></div>
                  <div className="p-2 space-y-2">
                    <div className="bg-muted/20 h-4 rounded-sm"></div>
                    <div className="bg-muted/20 h-3 w-2/3 rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
