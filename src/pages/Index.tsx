
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCarousel from '../components/MovieCarousel';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import MyListModal from '../components/MyListModal';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  
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
      toast({
        title: "Adicionado à sua lista",
        description: `${movie.title} foi adicionado à sua lista`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Já na lista",
        description: `${movie.title} já está na sua lista`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const removeFromMyList = (movieId: number) => {
    setMyList(myList.filter(movie => movie.id !== movieId));
    toast({
      title: "Removido da sua lista",
      description: "Item removido da sua lista com sucesso",
      duration: 3000,
    });
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
            title="Populares"
            movies={getTrendingMovies()}
            onMovieClick={handleMovieClick}
            onAddToList={addToMyList}
          />
        </div>
        
        <div id="series-section">
          <MovieCarousel 
            title="Seriados"
            movies={getNewMovies()}
            onMovieClick={handleMovieClick}
            onAddToList={addToMyList}
          />
        </div>
        
        <div id="movies-section">
          <MovieCarousel 
            title="Filmes"
            movies={getActionMovies()}
            onMovieClick={handleMovieClick}
            onAddToList={addToMyList}
          />
        </div>
        
        <MovieCarousel 
          title="Ficção Científica"
          movies={getSciFiMovies()}
          onMovieClick={handleMovieClick}
          onAddToList={addToMyList}
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
