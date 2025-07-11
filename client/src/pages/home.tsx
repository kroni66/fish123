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
import greyLogoPath from "@assets/Grevy logo.svg";

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
        <section className="min-h-screen flex items-center justify-center px-4 pt-24 relative">
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
                className="h-48 w-auto drop-shadow-2xl"
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

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2">
                  <span className="text-primary/90 text-sm font-medium tracking-wider uppercase">
                    Naše přednosti
                  </span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent leading-tight">
                Proč si vybrat naše produkty?
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Spojujeme vášeň pro rybaření s nejmodernějšími technologiemi a prémiovými materiály
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div className="group">
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Package className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        Prémiová kvalita
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Každý kousek oblečení prochází důkladným testováním v reálných podmínkách profesionálními rybáři
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm border border-accent/30 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                        Expertní poradenství
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Náš tým zkušených rybářů s více než 20letou praxí vám pomůže vybrat ideální oblečení pro každou situaci
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-sm border border-teal-500/30 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-10 h-10 text-teal-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                        Rychlé dodání
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Expedice do 24 hodin, bezplatné doručení nad 1500 Kč a možnost vrácení do 30 dnů bez udání důvodu
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call-to-Action */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-8 py-4">
                <Waves className="w-6 h-6 text-primary" />
                <span className="text-white font-medium text-lg">
                  Objevte rozdíl, který dělají kvalitní materiály
                </span>
                <Waves className="w-6 h-6 text-accent rotate-180" />
              </div>
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
          
          <div className="max-w-7xl mx-auto relative z-1">

            
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