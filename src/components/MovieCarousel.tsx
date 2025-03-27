
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../data/movies';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, onMovieClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
        
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Check if we can scroll in either direction after scrolling
      setTimeout(() => {
        if (carouselRef.current) {
          setShowLeftArrow(carouselRef.current.scrollLeft > 0);
          setShowRightArrow(
            carouselRef.current.scrollLeft + carouselRef.current.clientWidth < 
            carouselRef.current.scrollWidth - 10
          );
        }
      }, 300);
    }
  };
  
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };
  
  return (
    <div className="relative py-6 group">
      <h2 className="text-xl font-bold text-white mb-4 px-4 md:px-8">
        {title}
      </h2>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-none gap-4 px-4 md:px-8 pb-4"
        onScroll={handleScroll}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[200px]">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
      
      {showLeftArrow && (
        <button 
          className="absolute top-1/2 left-1 -translate-y-1/2 bg-dark-bg/80 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-red/20 z-10"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {showRightArrow && (
        <button 
          className="absolute top-1/2 right-1 -translate-y-1/2 bg-dark-bg/80 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-red/20 z-10"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default MovieCarousel;
