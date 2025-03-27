
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-dark-bg/90 backdrop-blur-md py-3 shadow-md' : 'bg-gradient-to-b from-dark-bg to-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold tracking-wider text-white">
            <span className="bg-clip-text text-transparent bg-logo-gradient bg-[length:200%_100%] animate-logo-shine">
              NEONFLIX
            </span>
          </h1>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-neon-red transition-colors">Home</a>
            <a href="#" className="text-white/80 hover:text-neon-red transition-colors">Series</a>
            <a href="#" className="text-white/80 hover:text-neon-red transition-colors">Movies</a>
            <a href="#" className="text-white/80 hover:text-neon-red transition-colors">New & Popular</a>
            <a href="#" className="text-white/80 hover:text-neon-red transition-colors">My List</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-5">
          <button 
            onClick={toggleSearch}
            className="text-white hover:text-neon-red transition-colors"
          >
            <Search className={`w-5 h-5 ${showSearch ? 'text-neon-red' : ''}`} />
          </button>
          
          <button className="text-white hover:text-neon-red transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-red rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-md bg-neon-red/20 flex items-center justify-center">
              <User className="w-5 h-5 text-neon-red" />
            </div>
            <ChevronDown className="w-4 h-4 text-white group-hover:text-neon-red transition-colors group-hover:rotate-180 transition-transform duration-300" />
          </div>
        </div>
      </div>
      
      {showSearch && (
        <div className="container mx-auto px-4 md:px-8 mt-3">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Navbar;
