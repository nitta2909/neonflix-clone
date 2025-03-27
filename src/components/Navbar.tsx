
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, LogIn, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const { toast } = useToast();
  
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

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo de volta ao NEONFLIX!",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta. Até logo!",
      duration: 3000,
    });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && notificationsCount > 0) {
      setNotificationsCount(0);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMyListModal = () => {
    const event = new CustomEvent('openMyListModal');
    window.dispatchEvent(event);
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
            <a 
              href="#series-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('series-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors"
            >
              Series
            </a>
            <a 
              href="#movies-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('movies-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors"
            >
              Movies
            </a>
            <a 
              href="#trending-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('trending-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors"
            >
              New & Popular
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openMyListModal();
              }}
              className="text-white/80 hover:text-neon-red transition-colors"
            >
              My List
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-5">
          <button 
            onClick={toggleSearch}
            className="text-white hover:text-neon-red transition-colors"
          >
            <Search className={`w-5 h-5 ${showSearch ? 'text-neon-red' : ''}`} />
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="text-white hover:text-neon-red transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-red rounded-full flex items-center justify-center text-[10px]">
                  {notificationsCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-dark-bg/95 backdrop-blur-sm rounded-md shadow-lg border border-white/10 p-3 z-50 transform origin-top-right transition-all duration-200 animate-scale-in">
                <h3 className="text-white font-medium mb-2 pb-2 border-b border-white/10">Notificações</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  <div className="flex gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                    <div className="w-10 h-10 bg-neon-blue/20 rounded flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm">Novo filme adicionado: "Matrix Resurrections"</p>
                      <p className="text-white/50 text-xs mt-1">2 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                    <div className="w-10 h-10 bg-neon-red/20 rounded flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm">Série em destaque: "Stranger Things"</p>
                      <p className="text-white/50 text-xs mt-1">1 dia atrás</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                    <div className="w-10 h-10 bg-neon-blue/20 rounded flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm">Nova temporada: "The Witcher"</p>
                      <p className="text-white/50 text-xs mt-1">3 dias atrás</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 cursor-pointer group relative">
              <div className="w-8 h-8 rounded-md bg-neon-red/20 flex items-center justify-center">
                <User className="w-5 h-5 text-neon-red" />
              </div>
              <ChevronDown className="w-4 h-4 text-white group-hover:text-neon-red transition-colors group-hover:rotate-180 transition-transform duration-300" />
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-dark-bg/95 backdrop-blur-sm rounded-md shadow-lg border border-white/10 hidden group-hover:block z-50 transform origin-top-right transition-all duration-200 animate-scale-in">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">Perfil</a>
                  <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">Configurações</a>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-1 text-white hover:text-neon-red transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}
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
