import { Search, Fish, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center fishing-gradient overflow-hidden">
      {/* Hero Background Image Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Atmospheric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 animate-pulse">
          <Fish className="h-12 w-12 text-primary/40 transform rotate-12" />
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse delay-1000">
          <Target className="h-8 w-8 text-accent/30 transform -rotate-45" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-pulse delay-500">
          <Award className="h-10 w-10 text-primary/30 transform rotate-45" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Brand */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight font-poppins tracking-tight">
              <span className="block text-primary drop-shadow-lg">RIG OF DEATH</span>
              <span className="block text-3xl md:text-4xl text-muted-foreground font-light mt-4 tracking-wide">
                STAY IN STYLE
              </span>
            </h1>
          </div>
          
          {/* Tagline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed">
              Autentické rybářské vybavení pro moderní rybáře
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Objevte naši pečlivě vybranou kolekci prémiového vybavení. 
              Od profesionálních prutů po speciální návnady – vše pro váš úspěch na vodě.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input 
                placeholder="Vyhledejte rybářské vybavení..."
                className="pl-16 pr-6 py-8 text-lg rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 focus:border-primary shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Prohlédnout kolekci
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-primary px-12 py-8 text-xl rounded-2xl backdrop-blur-sm transition-all duration-300"
            >
              Naše příběhy
            </Button>
          </div>
          
          
        </div>
      </div>
    </section>
  );
}
