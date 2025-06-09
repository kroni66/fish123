import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Fish, Search, User, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/use-auth";
import { CartOverlay } from "@/components/cart-overlay";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, openCart } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  // Search products query
  const { data: searchResults = [] } = useQuery({
    queryKey: ['/api/products/search', searchQuery],
    enabled: searchQuery.length > 2,
  });

  // Type the search results
  const typedSearchResults = (searchResults as any[]) || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById('navbar-search');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navigation = [
    { name: 'Domů', href: '/' },
    { name: 'O nás', href: '/about' },
    { name: 'Naše příběhy', href: '/inspiration' },
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative overflow-hidden ${
        isScrolled 
          ? 'e-shop-header backdrop-blur-md shadow-2xl' 
          : 'bg-background/95 border-b border-border/20'
      }`}>
        {/* Animated Water Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Water Waves */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 animate-water-flow"></div>
          
          {/* Water Ripples */}
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-primary/5 animate-ripple animation-delay-0"></div>
          <div className="absolute top-0 right-1/3 w-24 h-24 rounded-full bg-primary/8 animate-ripple animation-delay-1000"></div>
          <div className="absolute top-0 left-2/3 w-20 h-20 rounded-full bg-primary/6 animate-ripple animation-delay-2000"></div>
          
          {/* Flowing Water Particles */}
          <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-primary/20 animate-water-particle animation-delay-0"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-primary/30 animate-water-particle animation-delay-500"></div>
          <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 rounded-full bg-primary/25 animate-water-particle animation-delay-1000"></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-primary/35 animate-water-particle animation-delay-1500"></div>
          
          {/* Subtle Water Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer-wave"></div>
        </div>
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
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <div className="relative" id="navbar-search">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors ${
                    isSearchOpen ? 'text-primary bg-primary/10' : ''
                  }`}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="w-5 h-5" />
                </Button>

                {/* Search Box */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-2xl z-50">
                    <form onSubmit={handleSearchSubmit} className="p-4">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Vyhledat produkty..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:ring-primary focus:border-primary"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                        >
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>

                    {/* Search Results */}
                    {searchQuery.length > 2 && typedSearchResults.length > 0 && (
                      <div className="border-t border-slate-700/50 max-h-64 overflow-y-auto">
                        {typedSearchResults.slice(0, 5).map((product: any) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="flex items-center p-3 hover:bg-slate-700/50 transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">{product.name}</h4>
                              <p className="text-slate-400 text-xs">{product.price} Kč</p>
                            </div>
                          </Link>
                        ))}
                        {typedSearchResults.length > 5 && (
                          <div className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80"
                              onClick={() => {
                                window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              Zobrazit všechny výsledky ({typedSearchResults.length})
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* No Results */}
                    {searchQuery.length > 2 && typedSearchResults.length === 0 && (
                      <div className="border-t border-slate-700/50 p-4 text-center text-slate-400 text-sm">
                        Žádné produkty nenalezeny
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Authentication Buttons */}
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <div className="hidden md:flex items-center space-x-2">
                      <Link href="/dashboard">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                          title="Můj účet"
                        >
                          <User className="w-5 h-5" />
                        </Button>
                      </Link>
                      <span className="text-slate-300 text-sm">
                        {user?.firstName || user?.email}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                        onClick={logout}
                        title="Odhlásit se"
                      >
                        <LogOut className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center space-x-2">
                      <Link href="/login">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Přihlásit se
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}

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
                
                {/* Mobile Authentication */}
                <div className="border-t border-slate-700/50 pt-4 mt-4">
                  {!isLoading && (
                    <>
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <div className="px-4 py-2 text-slate-300 text-sm">
                            Přihlášen jako: {user?.firstName || user?.email}
                          </div>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Odhlásit se
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/login">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Přihlásit se
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Registrovat se
                            </Button>
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
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