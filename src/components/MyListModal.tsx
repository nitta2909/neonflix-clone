
import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Movie } from '../data/movies';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface MyListModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onRemoveMovie: (movieId: number) => void;
}

const MyListModal: React.FC<MyListModalProps> = ({
  isOpen,
  onClose,
  movies,
  onMovieClick,
  onRemoveMovie
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleMovieClick = (movie: Movie) => {
    onMovieClick(movie);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card-bg border-white/10 text-white max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Minha Lista</DialogTitle>
          <DialogDescription className="text-white/60">
            Filmes e séries salvos para assistir mais tarde
          </DialogDescription>
        </DialogHeader>
        
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-neon-red/20 rounded-full p-6 mb-4">
              <Trash2 className="w-10 h-10 text-neon-red" />
            </div>
            <h3 className="text-xl font-medium mb-2">Sua lista está vazia</h3>
            <p className="text-white/60 max-w-md">
              Adicione filmes e séries à sua lista para assistir mais tarde.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="relative group rounded-md overflow-hidden bg-white/5 transition-all hover:bg-white/10"
                >
                  <div 
                    className="relative h-40 cursor-pointer"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 
                        className="font-medium text-white truncate cursor-pointer hover:text-neon-red transition-colors"
                        onClick={() => handleMovieClick(movie)}
                      >
                        {movie.title}
                      </h3>
                      <button 
                        onClick={() => onRemoveMovie(movie.id)}
                        className="text-white/60 hover:text-neon-red transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center text-xs text-white/60 mt-1">
                      <span>{movie.year}</span>
                      <span className="mx-2">•</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyListModal;
