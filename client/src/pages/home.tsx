import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Package, Award } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { EnhancedSearch } from "@/components/enhanced-search";
import { Footer } from "@/components/footer";

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
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
            {/* Professional Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-card border border-border rounded-full shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Prémiové rybářské potřeby</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Profesionální rybářské
                <br />
                <span className="text-primary">vybavení</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Objevte naši širokou kolekci vysoce kvalitních rybářských potřeb. 
                Od návnad až po prut - vše pro váš úspěšný lov.
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
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Produktů</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">2000+</div>
                <div className="text-sm text-muted-foreground">Spokojených zákazníků</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">4.8</div>
                <div className="text-sm text-muted-foreground">Hodnocení</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Let zkušeností</div>
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
                Nabízíme pouze nejkvalitnější rybářské vybavení od renomovaných výrobců
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Kvalitní produkty</h3>
                  <p className="text-muted-foreground">
                    Pečlivě vybíráme pouze nejlepší rybářské vybavení od ověřených značek
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
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
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-primary" />
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

        {/* Enhanced Search Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Najděte přesně to, co hledáte
              </h2>
              <p className="text-lg text-muted-foreground">
                Použijte naše pokročilé vyhledávání pro rychlé nalezení produktů
              </p>
            </div>
            <EnhancedSearch 
              searchQuery={searchQuery}
              categoryId={selectedCategory}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Naše produkty
              </h2>
              <p className="text-lg text-muted-foreground">
                Prohlédněte si naši širokou nabídku rybářského vybavení
              </p>
            </div>
            
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