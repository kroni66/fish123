import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Package, Award, Waves, Search } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { AdvancedProductSearch } from "@/components/advanced-product-search";
import { Footer } from "@/components/footer";
import fishingEquipmentImage from "@assets/4d86ed98-0732-48e8-9613-fbbd288d0c70_1749500961436.jpg";
import greyLogoPath from "@assets/Grevy logo_1749525153995.png";

export default function Home() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    } else {
      setSelectedCategory(null);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Professional E-shop Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Clean gradient foundation */}
        <div className="absolute inset-0 bg-background"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
        
        {/* Professional gradient accents */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent/3 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/fishing-hero.jpg"
              alt="Fishing scene with underwater view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
          
          <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
            {/* Professional Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/90 via-primary to-primary/90 backdrop-blur-md border border-primary/30 rounded-full shadow-xl hover:shadow-primary/20 transition-all duration-300 group">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm font-medium text-white tracking-wide">Prémiové rybářské oblečení</span>
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src={greyLogoPath}
                alt="Grevy Logo"
                className="h-32 w-auto drop-shadow-2xl"
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                Profesionální rybářské
                <br />
                <span className="text-primary">oblečení</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Objevte naši širokou kolekci vysoce kvalitního rybářského oblečení. 
                Od funkčního prádla až po nepromokavé bundy - vše pro pohodlný rybolov.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-medium"
                onClick={scrollToProducts}
              >
                Prohlédnout produkty
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-medium"
              >
                Naše kategorie
              </Button>
            </div>

            {/* Search Component in Hero */}
            <div className="mt-12 max-w-2xl mx-auto">
              <AdvancedProductSearch 
                onSearchChange={setSearchQuery}
                className=""
              />
            </div>
          </div>
        </section>

        

        {/* Products Section */}
        <section id="products" className="py-24 px-4 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${fishingEquipmentImage}')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">

            
            <ProductGrid 
              categoryId={selectedCategory} 
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}