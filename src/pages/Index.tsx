
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCarousel from '../components/MovieCarousel';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
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
      
      <Footer />
      
      <MovieModal movie={selectedMovie} onClose={closeModal} />
    </main>
  );
};

export default Index;
