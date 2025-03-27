
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCarousel from '../components/MovieCarousel';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import MyListModal from '../components/MyListModal';
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
  const [myList, setMyList] = useState<Movie[]>([]);
  const [showMyListModal, setShowMyListModal] = useState(false);
  
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const closeModal = () => {
    setSelectedMovie(null);
  };

  const closeMyListModal = () => {
    setShowMyListModal(false);
  };

  const addToMyList = (movie: Movie) => {
    if (!myList.some(item => item.id === movie.id)) {
      setMyList([...myList, movie]);
    }
  };

  const removeFromMyList = (movieId: number) => {
    setMyList(myList.filter(movie => movie.id !== movieId));
  };

  useEffect(() => {
    const handleOpenMyListModal = () => {
      setShowMyListModal(true);
    };

    window.addEventListener('openMyListModal', handleOpenMyListModal);
    
    return () => {
      window.removeEventListener('openMyListModal', handleOpenMyListModal);
    };
  }, []);
  
  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <Loader />
      <Navbar />
      
      <Hero 
        movies={getTrendingMovies()} 
        onInfoClick={handleMovieClick} 
      />
      
      <div className="pb-16">
        <div id="trending-section">
          <MovieCarousel 
            title="Trending Now"
            movies={getTrendingMovies()}
            onMovieClick={handleMovieClick}
          />
        </div>
        
        <div id="series-section">
          <MovieCarousel 
            title="Series"
            movies={getNewMovies()}
            onMovieClick={handleMovieClick}
          />
        </div>
        
        <div id="movies-section">
          <MovieCarousel 
            title="Movies"
            movies={getActionMovies()}
            onMovieClick={handleMovieClick}
          />
        </div>
        
        <MovieCarousel 
          title="Sci-Fi Adventures"
          movies={getSciFiMovies()}
          onMovieClick={handleMovieClick}
        />
      </div>
      
      <Footer />
      
      <MovieModal 
        movie={selectedMovie} 
        onClose={closeModal} 
        onAddToList={addToMyList}
        isInMyList={selectedMovie ? myList.some(m => m.id === selectedMovie.id) : false}
      />

      <MyListModal 
        isOpen={showMyListModal}
        onClose={closeMyListModal}
        movies={myList}
        onMovieClick={handleMovieClick}
        onRemoveMovie={removeFromMyList}
      />
    </main>
  );
};

export default Index;
