import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartOverlay } from "@/components/cart-overlay";
import waterVideoPath from "@assets/1181911-uhd_4096_2160_24fps (1)_1749502748130.mp4";
import greyLogoPath from "@assets/Grevy logo.svg";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

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

    const handleResize = () => {
      // Close mobile menu on window resize or orientation change
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
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
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <nav className={`fixed left-2 right-2 sm:left-4 sm:right-4 z-50 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl ${
        isScrolled 
          ? 'top-1 sm:top-2 backdrop-blur-lg bg-black/80' 
          : 'top-2 sm:top-4 backdrop-blur-md bg-black/60'
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
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <img 
                    src={greyLogoPath}
                    alt="Grevy Logo"
                    className="h-8 sm:h-10 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Always visible */}
            <div className="hidden lg:flex items-center space-x-8">
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
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/90 hover:text-white hover:bg-white/10 rounded-lg w-10 h-10 sm:w-11 sm:h-11"
                onClick={openCart}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
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
                className="lg:hidden text-white/90 hover:text-white hover:bg-white/10 rounded-lg w-10 h-10 sm:w-11 sm:h-11 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 transition-all duration-300 ease-in-out transform z-50 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}>
            <div className="bg-black/95 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-6 py-4 text-lg font-medium transition-all duration-300 rounded-xl touch-manipulation ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-primary/30 to-accent/30 border border-primary/50 shadow-lg'
                        : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20'
                    }`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      minHeight: '56px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={(e) => {
                      handleNavClick(item, e);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartOverlay />
    </>
  );
}