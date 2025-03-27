
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div 
      className={`relative rounded-md transition-all duration-300 ${
        isFocused 
          ? 'bg-card-bg/90 shadow-neon-red' 
          : 'bg-card-bg/60'
      }`}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${isFocused ? 'text-neon-red' : 'text-white/50'}`} />
      </div>
      
      <input
        type="text"
        ref={inputRef}
        className="block w-full bg-transparent border-0 py-3 pl-10 pr-10 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
        placeholder="Procurar por filmes, TV shows,Series..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {searchTerm && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={handleClear}
        >
          <X className="h-5 w-5 text-white/50 hover:text-neon-red" />
        </button>
      )}
      
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-card-bg/95 backdrop-blur-lg rounded-md shadow-lg border border-white/10 z-10 p-2 animate-fade-in">
          <div className="text-sm text-white/50 p-2">
            {searchTerm ? 'Start typing to search...' : 'Populares,Comedias,Drama, etc.'}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
