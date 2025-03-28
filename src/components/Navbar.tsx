
import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, ChevronDown, LogIn, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const notificationsRef = useRef<HTMLDivElement>(null);
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
  
  useEffect(() => {
    // Handle clicks outside the notifications dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo de volta ao Mauricio Nitta Dev.!",
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
          <h1 className="text-3xl md:text-4xl netflix-title">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-red via-neon-purple to-neon-blue bg-[length:400%_100%] animate-[logo-shine_4s_linear_infinite]">
              MauricioNitta Dev.
            </span>
          </h1>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-neon-red transition-colors text-lg font-medium">Home</a>
            <a 
              href="#series-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('series-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors text-lg font-medium"
            >
              Series
            </a>
            <a 
              href="#movies-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('movies-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors text-lg font-medium"
            >
              Filmes
            </a>
            <a 
              href="#trending-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('trending-section');
              }}
              className="text-white/80 hover:text-neon-red transition-colors text-lg font-medium"
            >
              New & Popular
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openMyListModal();
              }}
              className="text-white/80 hover:text-neon-red transition-colors text-lg font-medium"
            >
              Minha lista
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
          
          <div className="relative" ref={notificationsRef}>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-md bg-neon-red/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-neon-red" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-white transition-transform duration-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-dark-bg/95 backdrop-blur-md border-white/10 text-white min-w-[200px]"
              >
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  className="hover:bg-white/10 hover:text-neon-red focus:bg-white/10 focus:text-neon-red cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Perfil",
                      description: "Acessando configurações de perfil",
                    });
                  }}
                >
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-white/10 hover:text-neon-red focus:bg-white/10 focus:text-neon-red cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Configurações",
                      description: "Acessando configurações da conta",
                    });
                  }}
                >
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  className="hover:bg-white/10 hover:text-neon-red focus:bg-white/10 focus:text-neon-red cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
