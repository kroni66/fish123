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
import waterVideoPath from "@assets/1181911-uhd_4096_2160_24fps (1)_1749502748130.mp4";
import greyLogoPath from "@assets/Grevy logo_1749525153995.png";

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
          : 'bg-background/95 backdrop-blur-sm'
      }`}>
        {/* Water Video Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Video Background */}
          <video 
            autoPlay 
            muted 
            loop 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ filter: 'blur(1px) hue-rotate(10deg)' }}
          >
            <source src={waterVideoPath} type="video/mp4" />
          </video>
          
          {/* Overlay gradient to blend with content */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/30 via-teal-500/20 to-blue-600/15"></div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Animated wave shapes that form the navbar border */}
          <svg className="absolute bottom-0 left-0 w-full h-4 animate-wave-motion" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path 
              d="M0,20 C300,5 600,35 900,15 C1050,5 1150,25 1200,20 L1200,40 L0,40 Z" 
              fill="url(#waveGradient1)"
              className="animate-wave-flow-1"
            />
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6"/>
                <stop offset="50%" stopColor="#1fb89a" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Second wave layer for depth */}
          <svg className="absolute bottom-0 left-0 w-full h-3 animate-wave-motion-delayed" viewBox="0 0 1200 30" preserveAspectRatio="none">
            <path 
              d="M0,15 C200,25 400,5 600,18 C800,30 1000,8 1200,15 L1200,30 L0,30 Z" 
              fill="url(#waveGradient2)"
              className="animate-wave-flow-2"
            />
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1fb89a" stopOpacity="0.4"/>
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#1fb89a" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Flowing water bubbles */}
          <div className="absolute top-2 left-1/4 w-1 h-1 rounded-full bg-cyan-300/60 animate-bubble-float animation-delay-0"></div>
          <div className="absolute top-3 left-1/2 w-0.5 h-0.5 rounded-full bg-teal-200/70 animate-bubble-float animation-delay-800"></div>
          <div className="absolute top-1 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-bubble-float animation-delay-1600"></div>
          <div className="absolute top-4 right-1/4 w-0.5 h-0.5 rounded-full bg-teal-300/60 animate-bubble-float animation-delay-2400"></div>
          
          {/* Water current lines */}
          <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400/40 animate-current-flow animation-delay-0"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent to-teal-400/50 animate-current-flow animation-delay-1000"></div>
          <div className="absolute top-2/3 right-1/3 w-10 h-0.5 bg-gradient-to-l from-transparent to-cyan-300/45 animate-current-flow-reverse animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src={greyLogoPath}
                  alt="Grevy Logo"
                  className="h-10 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                />
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
                      ? 'text-white bg-primary/20 border border-primary/50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
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
                  className={`text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors ${
                    isSearchOpen ? 'text-white bg-primary/20' : ''
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
                  className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg relative"
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
                          className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
                          title="Můj účet"
                        >
                          <User className="w-5 h-5" />
                        </Button>
                      </Link>
                      <span className="text-white/90 text-sm">
                        {user?.firstName || user?.email}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
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
                          className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
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
    </>
  );
}