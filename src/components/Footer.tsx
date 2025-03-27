
import React, { useState } from 'react';
import { Mail, Phone, Instagram, Twitter, Facebook, ChevronUp, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const footerSections = [
    {
      id: 'about',
      title: 'Sobre a NeonFlix',
      links: [
        { text: 'Sobre nós', url: '#' },
        { text: 'Carreiras', url: '#' },
        { text: 'Imprensa', url: '#' },
        { text: 'Blog', url: '#' },
      ],
    },
    {
      id: 'help',
      title: 'Ajuda',
      links: [
        { text: 'Perguntas frequentes', url: '#' },
        { text: 'Suporte', url: '#' },
        { text: 'Contato', url: '#' },
        { text: 'Preferências de cookies', url: '#' },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { text: 'Termos de uso', url: '#' },
        { text: 'Privacidade', url: '#' },
        { text: 'Avisos legais', url: '#' },
        { text: 'Configurações de cookies', url: '#' },
      ],
    },
    {
      id: 'account',
      title: 'Conta',
      links: [
        { text: 'Minha conta', url: '#' },
        { text: 'Cancelar assinatura', url: '#' },
        { text: 'Redimir código', url: '#' },
        { text: 'Comprar cartão presente', url: '#' },
      ],
    },
  ];
  
  return (
    <footer className="bg-dark-bg border-t border-white/10 py-12 relative">
      {/* Voltar ao topo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-neon-red hover:bg-neon-red/80 text-white p-3 rounded-full shadow-neon-red transition-all duration-300 hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="text-3xl font-bold tracking-wider text-white relative">
            <span className="bg-clip-text text-transparent bg-logo-gradient bg-[length:200%_100%] animate-logo-shine px-4">
              NEONFLIX
            </span>
          </div>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.id} className="space-y-3">
              <button 
                className={`flex items-center justify-between w-full font-bold text-lg ${
                  expandedSection === section.id ? 'text-neon-red' : 'text-white'
                }`}
                onClick={() => isMobile && toggleSection(section.id)}
              >
                {section.title}
                {isMobile && (
                  <ChevronUp 
                    className={`h-5 w-5 transition-transform duration-300 ${
                      expandedSection === section.id ? 'rotate-0' : 'rotate-180'
                    }`} 
                  />
                )}
              </button>
              
              <div 
                className={`space-y-2 overflow-hidden transition-all duration-300 ${
                  isMobile && expandedSection !== section.id ? 'max-h-0' : 'max-h-60'
                }`}
              >
                {section.links.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url}
                    className="block text-white/70 hover:text-neon-red transition-colors duration-200 group"
                  >
                    <span className="inline-flex items-center gap-1">
                      {link.text}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Redes sociais */}
        <div className="flex justify-center space-x-6 mb-10">
          {[
            { Icon: Facebook, label: 'Facebook' },
            { Icon: Twitter, label: 'Twitter' },
            { Icon: Instagram, label: 'Instagram' },
            { Icon: Mail, label: 'Email' },
            { Icon: Phone, label: 'Telefone' },
          ].map(({ Icon, label }, index) => (
            <a 
              key={index}
              href="#"
              className="group relative"
              aria-label={label}
            >
              <div className="absolute inset-0 rounded-full bg-neon-red scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-20"></div>
              <div className="p-3 rounded-full bg-card-bg/40 backdrop-blur-sm border border-white/10 hover:border-neon-red transition-colors duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-red/0 before:via-neon-red/10 before:to-neon-red/0 before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-500">
                <Icon className="w-5 h-5 text-white/80 group-hover:text-neon-red transition-colors duration-300" />
              </div>
            </a>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="text-center text-white/50 text-sm space-y-3">
          <p>
            &copy; {new Date().getFullYear()} NeonFlix. Todos os direitos reservados.
          </p>
          <p>
            Criado com animações premium e efeitos neon para a melhor experiência de streaming.
          </p>
          <div className="flex justify-center space-x-2 text-xs mt-4">
            <a href="#" className="hover:text-neon-red transition-colors">Política de Privacidade</a>
            <span>•</span>
            <a href="#" className="hover:text-neon-red transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-neon-red transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      
      {/* Efeito neon no bottom */}
      <div className="h-1 w-full bg-gradient-to-r from-dark-bg via-neon-red/50 to-dark-bg absolute bottom-0 left-0"></div>
    </footer>
  );
};

export default Footer;
