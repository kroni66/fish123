import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Fish, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { CartOverlay } from "@/components/cart-overlay";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Domů', href: '/' },
    { name: 'O nás', href: '/about' },
    { name: 'Inspirace', href: '/inspiration' },
    { name: 'Kontakt', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location === '/';
    }
    return location.startsWith(path);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <svg 
                  width="44" 
                  height="32" 
                  viewBox="0 0 44 32" 
                  className="group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                >
                  <defs>
                    <linearGradient id="fishBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="40%" stopColor="#06b6d4" />
                      <stop offset="80%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                    <linearGradient id="fishFinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e7490" />
                      <stop offset="50%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#e0f2fe" />
                      <stop offset="100%" stopColor="#bae6fd" />
                    </radialGradient>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Main fish body */}
                  <ellipse 
                    cx="24" 
                    cy="16" 
                    rx="15" 
                    ry="9" 
                    fill="url(#fishBodyGradient)" 
                    filter="url(#softGlow)"
                    className="group-hover:brightness-110 transition-all duration-300"
                  />
                  
                  {/* Fish tail - elegant curved design */}
                  <path 
                    d="M 9 16 Q 4 8 2 12 Q 4 16 2 20 Q 4 24 9 16" 
                    fill="url(#fishFinGradient)"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    opacity="0.9"
                  />
                  
                  {/* Dorsal fin - flowing design */}
                  <path 
                    d="M 22 7 Q 26 3 32 7 Q 28 9 26 11 Q 24 9 22 7" 
                    fill="url(#fishFinGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Ventral fin */}
                  <path 
                    d="M 22 25 Q 26 29 32 25 Q 28 23 26 21 Q 24 23 22 25" 
                    fill="url(#fishFinGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Pectoral fin */}
                  <ellipse 
                    cx="18" 
                    cy="20" 
                    rx="3" 
                    ry="6" 
                    fill="url(#fishFinGradient)" 
                    opacity="0.6"
                    transform="rotate(25 18 20)"
                  />
                  
                  {/* Eye with detailed design */}
                  <circle 
                    cx="30" 
                    cy="14" 
                    r="3" 
                    fill="url(#eyeGradient)"
                    stroke="#0891b2"
                    strokeWidth="0.5"
                  />
                  <circle 
                    cx="31" 
                    cy="14" 
                    r="2" 
                    fill="#1e40af"
                  />
                  <circle 
                    cx="31.5" 
                    cy="13.5" 
                    r="0.8" 
                    fill="white"
                  />
                  <circle 
                    cx="31.2" 
                    cy="13.8" 
                    r="0.3" 
                    fill="white"
                    opacity="0.7"
                  />
                  
                  {/* Elegant scale pattern */}
                  <g opacity="0.25">
                    <circle cx="16" cy="13" r="1.2" fill="white" />
                    <circle cx="20" cy="11" r="1" fill="white" />
                    <circle cx="20" cy="19" r="1" fill="white" />
                    <circle cx="24" cy="16" r="1.2" fill="white" />
                    <circle cx="27" cy="18" r="0.8" fill="white" />
                  </g>
                  
                  {/* Mouth detail */}
                  <ellipse 
                    cx="36.5" 
                    cy="16" 
                    rx="1.5" 
                    ry="0.8" 
                    fill="#0e7490"
                    opacity="0.6"
                  />
                  
                  {/* Animated water bubbles on hover */}
                  <g className="group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                    <circle cx="38" cy="10" r="1" fill="#67e8f9" opacity="0.6">
                      <animate attributeName="cy" values="10;6;10" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="40" cy="14" r="0.7" fill="#22d3ee" opacity="0.5">
                      <animate attributeName="cy" values="14;10;14" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="42" cy="18" r="0.5" fill="#67e8f9" opacity="0.4">
                      <animate attributeName="cy" values="18;14;18" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                onClick={() => {
                  const searchInput = document.querySelector('input[placeholder*="Vyhledejte"]') as HTMLInputElement;
                  if (searchInput) {
                    searchInput.focus();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                onClick={openCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl">
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Overlay */}
      <CartOverlay />

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}