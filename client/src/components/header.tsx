import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { itemCount, toggleCart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigation = [
    { name: "Naše příběhy", href: "/" },
    { name: "Kolekce", href: "/#categories" },
    { name: "O nás", href: "/about" },
    { name: "Inspirace", href: "/inspiration" },
    { name: "Kontakt", href: "/contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <div className="flex items-center space-x-4">
                {/* Skull Icon with Enhanced Design */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 backdrop-blur-sm rounded-xl flex items-center justify-center border border-cyan-400/30 shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 rounded-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <span className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">💀</span>
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
                
                {/* Enhanced Title Design */}
                <div className="relative">
                  <h1 className="text-3xl font-bold tracking-tight leading-none relative group-hover:scale-105 transition-transform duration-300">
                    {/* Main title with gradient and shadow effects */}
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent font-black tracking-wider">
                      GREVY
                    </span>
                    
                    {/* Subtle text shadow effect */}
                    <div className="absolute inset-0 text-3xl font-bold tracking-tight leading-none">
                      <span className="text-white/5 font-black tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        GREVY
                      </span>
                    </div>
                  </h1>
                  
                  {/* Enhanced subtitle */}
                  <p className="text-xs text-cyan-300/70 font-medium tracking-[0.2em] uppercase mt-1 relative group-hover:text-cyan-300 transition-colors duration-300">
                    <span className="relative z-10">DEEP WATER FISHING</span>
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500"></div>
                  </p>
                  
                  {/* Atmospheric particles effect */}
                  <div className="absolute -inset-4 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse delay-700"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Hledat produkty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Hledat produkty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
