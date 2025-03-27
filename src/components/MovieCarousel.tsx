
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../data/movies';
import { useToast } from '@/hooks/use-toast';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ 
  title, 
  movies, 
  onMovieClick,
  onAddToList
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftControl, setShowLeftControl] = useState(false);
  const [showRightControl, setShowRightControl] = useState(true);
  const { toast } = useToast();
  
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftControl(scrollLeft > 0);
      setShowRightControl(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleAddToList = (movie: Movie) => {
    if (onAddToList) {
      onAddToList(movie);
      toast({
        title: "Adicionado à sua lista",
        description: `${movie.title} foi adicionado à sua lista`,
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="relative py-8 px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">{title}</h2>
      
      <div className="relative group">
        {showLeftControl && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 text-white opacity-70 hover:opacity-100 transition-opacity transform -translate-x-1/2 group-hover:block hidden backdrop-blur-md"
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        <div 
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 scroll-smooth"
        >
          {movies.map(movie => (
            <div 
              key={movie.id} 
              className="flex-none w-[200px] md:w-[220px] cursor-pointer"
              onClick={() => onMovieClick(movie)}
            >
              <MovieCard 
                movie={movie} 
                onClick={onMovieClick}
                onAddToList={handleAddToList}
              />
            </div>
          ))}
        </div>
        
        {showRightControl && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 text-white opacity-70 hover:opacity-100 transition-opacity transform translate-x-1/2 group-hover:block hidden backdrop-blur-md"
            onClick={scrollRight}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;
