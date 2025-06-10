import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Package, Award } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { EnhancedSearch } from "@/components/enhanced-search";
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
            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Prémiové rybářské oblečení</span>
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

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg">500+</div>
                <div className="text-sm text-white/80">Produktů</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg">2000+</div>
                <div className="text-sm text-white/80">Spokojených zákazníků</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg">4.8</div>
                <div className="text-sm text-white/80">Hodnocení</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow-lg">15+</div>
                <div className="text-sm text-white/80">Let zkušeností</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Proč si vybrat naše produkty?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nabízíme pouze nejkvalitnější rybářské oblečení od renomovaných výrobců
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Kvalitní produkty</h3>
                  <p className="text-muted-foreground">
                    Pečlivě vybíráme pouze nejlepší rybářské oblečení od ověřených značek
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Zkušené poradenství</h3>
                  <p className="text-muted-foreground">
                    Náš tým má více než 15 let zkušeností s rybařením a rád vám poradí
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Rychlé dodání</h3>
                  <p className="text-muted-foreground">
                    Expedujeme do 24 hodin a nabízíme bezplatné doručení nad 1000 Kč
                  </p>
                </CardContent>
              </Card>
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