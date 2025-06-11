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

  const typedSearchResults = Array.isArray(searchResults) ? searchResults : [];

  const navigation = [
    { name: "Domů", href: "/" },
    { name: "Produkty", href: "/products", scrollTo: "products" },
    { name: "Inspirace", href: "/inspiration" },
    { name: "O nás", href: "/about" },
    { name: "Kontakt", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavClick = (item: any, e: React.MouseEvent) => {
    // If we're on the homepage and clicking "Produkty", scroll to products section
    if (location === "/" && item.scrollTo) {
      e.preventDefault();
      const element = document.getElementById(item.scrollTo);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // Otherwise, let the normal navigation happen
  };

  return (
    <>
      <nav className={`fixed left-4 right-4 z-50 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl ${
        isScrolled 
          ? 'top-2 backdrop-blur-lg bg-black/80' 
          : 'top-4 backdrop-blur-md bg-black/60'
      }`}>
        {/* Video Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <video 
            autoPlay 
            muted 
            loop 
            className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-2xl"
            style={{ filter: 'blur(1px)' }}
          >
            <source src={waterVideoPath} type="video/mp4" />
          </video>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  onClick={(e) => handleNavClick(item, e)}
                  className={`text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white border-b-2 border-primary'
                      : 'text-white/90 hover:text-white hover:border-b-2 hover:border-white/30'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                {/* Search Button */}
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

                {/* Search Box - Positioned absolutely */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 z-50">
                    <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl shadow-primary/10">
                      <form onSubmit={handleSearchSubmit} className="p-4">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Input
                            type="text"
                            placeholder="Vyhledat rybářské oblečení..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full bg-slate-800/60 border-slate-600/50 text-white placeholder-slate-300 focus:ring-2 focus:ring-primary/50 focus:border-primary/70 rounded-lg h-11 pl-4 pr-12 font-medium transition-all duration-300"
                            autoFocus
                          />
                          <Button
                            type="submit"
                            size="sm"
                            className="absolute right-2 top-2 h-7 w-7 p-0 bg-primary/80 hover:bg-primary text-white rounded-md transition-all duration-200 hover:scale-105"
                          >
                            <Search className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </form>

                      {/* Search Results */}
                      {searchQuery.length > 0 && (
                        <div className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900/98 via-slate-800/98 to-slate-900/98 rounded-b-xl">
                          {searchQuery.length > 2 && typedSearchResults.length > 0 && (
                            <div className="p-2 max-h-72 overflow-y-auto">
                              <div className="space-y-1">
                                {typedSearchResults.slice(0, 5).map((product: any) => (
                                  <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    className="flex items-center p-3 rounded-lg hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-200 group"
                                    onClick={() => {
                                      setIsSearchOpen(false);
                                      setSearchQuery("");
                                    }}
                                  >
                                    <div className="relative">
                                      <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg mr-4 group-hover:scale-105 transition-transform duration-200"
                                      />
                                      <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-white text-sm font-semibold group-hover:text-primary transition-colors">{product.name}</h4>
                                      <p className="text-slate-300 text-xs font-medium">{product.price} Kč</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              {typedSearchResults.length > 5 && (
                                <div className="mt-3 pt-3 border-t border-slate-700/30">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full text-primary hover:text-white hover:bg-primary/90 font-medium transition-all duration-200"
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

                          {searchQuery.length > 2 && typedSearchResults.length === 0 && (
                            <div className="p-6 text-center">
                              <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="w-5 h-5 text-slate-400" />
                              </div>
                              <p className="text-slate-300 text-sm font-medium">Žádné produkty nenalezeny</p>
                              <p className="text-slate-400 text-xs mt-1">Zkuste jiné klíčové slovo</p>
                            </div>
                          )}

                          {searchQuery.length > 0 && searchQuery.length <= 2 && (
                            <div className="p-4 text-center">
                              <p className="text-slate-400 text-sm">Pokračujte v psaní pro vyhledávání...</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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
                        >
                          <User className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
                        onClick={logout}
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
                          className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium"
                        >
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
                className="relative text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
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
                className="md:hidden text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
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
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/20 shadow-2xl z-50 rounded-2xl">
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                      isActive(item.href)
                        ? 'text-white bg-primary/20 border border-primary/50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={(e) => {
                      handleNavClick(item, e);
                      setIsMobileMenuOpen(false);
                    }}
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
                          <div className="px-4 py-2 text-white/90 text-sm">
                            Přihlášen jako: {user?.firstName || user?.email}
                          </div>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
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
                              className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Přihlásit se
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

      <CartOverlay />
    </>
  );
}