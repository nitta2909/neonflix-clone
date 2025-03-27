
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCarousel from '../components/MovieCarousel';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import { 
  movies, 
  getTrendingMovies, 
  getNewMovies, 
  getActionMovies, 
  getSciFiMovies,
  type Movie
} from '../data/movies';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const closeModal = () => {
    setSelectedMovie(null);
  };
  
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <Loader />
      <Navbar />
      
      <Hero 
        movies={getTrendingMovies()} 
        onInfoClick={handleMovieClick} 
      />
      
      <div className="pb-16">
        <MovieCarousel 
          title="Trending Now"
          movies={getTrendingMovies()}
          onMovieClick={handleMovieClick}
        />
        
        <MovieCarousel 
          title="New Releases"
          movies={getNewMovies()}
          onMovieClick={handleMovieClick}
        />
        
        <MovieCarousel 
          title="Action Movies"
          movies={getActionMovies()}
          onMovieClick={handleMovieClick}
        />
        
        <MovieCarousel 
          title="Sci-Fi Adventures"
          movies={getSciFiMovies()}
          onMovieClick={handleMovieClick}
        />
      </div>
      
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center text-white/50 text-sm">
            <p className="mb-2">
              &copy; {new Date().getFullYear()} NeonFlix. All rights reserved.
            </p>
            <p>
              Created with premium animations and neon effects for the ultimate streaming experience.
            </p>
          </div>
        </div>
      </footer>
      
      <MovieModal movie={selectedMovie} onClose={closeModal} />
    </main>
  );
};

export default Index;
