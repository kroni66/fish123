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


          </div>
        </section>

        {/* Advanced Search Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Search className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Inteligentní vyhledávání</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Najděte přesně to, co hledáte
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Použijte naše pokročilé vyhledávání s automatickým doplňováním pro rychlé nalezení produktů
              </p>
            </div>

            {/* Advanced Search Component */}
            <AdvancedProductSearch 
              onSearchChange={setSearchQuery}
              className="mb-8"
            />

            {/* Quick Search Suggestions */}
            <div className="text-center">
              <p className="text-slate-500 text-sm mb-4">Oblíbená vyhledávání:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Bunda', 'Kalhoty', 'Kabát', 'Nepromokavé', 'Zimní'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    className="bg-slate-800/40 border-slate-600/30 text-slate-300 hover:bg-slate-700/60 hover:text-white rounded-full"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          {/* Underwater Background Effects */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>
            
            {/* Animated water ripples */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-float"></div>
              <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-float delay-300"></div>
              <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-cyan-400/40 rounded-full animate-float delay-700"></div>
              <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-300/40 rounded-full animate-float delay-1000"></div>
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2">
                  <span className="text-primary/90 text-sm font-medium tracking-wider uppercase">
                    Naše přednosti
                  </span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent leading-tight">
                Proč si vybrat naše produkty?
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Spojujeme vášeň pro rybaření s nejmodernějšími technologiemi a prémiovými materiály
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div className="group">
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    {/* Icon */}
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Package className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        Prémiová kvalita
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Každý kousek oblečení prochází důkladným testováním v reálných podmínkách profesionálními rybáři
                      </p>
                    </div>

                    {/* Bottom accent */}
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
                        Náš tým zkušených rybářů s více než 20letou praxí vám pomoże vybrat ideální oblečení pro každou situaci
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