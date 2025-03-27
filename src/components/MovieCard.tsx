
import React, { useState } from 'react';
import { Play, Info, Plus, Star } from 'lucide-react';
import type { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onAddToList }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          overflow-hidden rounded-lg card-hover relative
          ${isHovered ? 'shadow-neon-red transform -translate-y-2' : 'shadow-md'}
        `}
      >
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className={`
            w-full h-[300px] object-cover
            transition-transform duration-700 ease-in-out
            ${isHovered ? 'scale-110 brightness-50' : 'scale-100'}
          `}
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
        
        {/* Content */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4 transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-90'}
        `}>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{movie.title}</h3>
          
          <div className="flex items-center text-xs text-white/70 space-x-2 mb-1">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>{movie.duration}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center">
              <Star className="w-3 h-3 text-neon-red fill-neon-red mr-1" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span 
                key={index}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/10 text-white/80"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover actions */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 animate-fade-in">
            <button 
              className="w-11 h-11 rounded-full bg-neon-red flex items-center justify-center hover:bg-white group transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Play movie:', movie.title);
              }}
            >
              <Play className="w-5 h-5 text-white fill-white group-hover:text-neon-red group-hover:fill-neon-red transition-colors" />
            </button>
            
            <button 
              className="w-9 h-9 rounded-full bg-dark-bg/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-neon-red transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToList) {
                  onAddToList(movie);
                }
              }}
            >
              <Plus className="w-4 h-4 text-white group-hover:text-neon-red" />
            </button>
            
            <button 
              className="w-9 h-9 rounded-full bg-dark-bg/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-neon-red transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick(movie);
              }}
            >
              <Info className="w-4 h-4 text-white group-hover:text-neon-red" />
            </button>
          </div>
        )}
        
        {/* New badge */}
        {movie.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-neon-red rounded-md text-xs font-medium text-white animate-pulse-neon">
            NEW
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
