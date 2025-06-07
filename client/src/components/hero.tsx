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
      
      {/* Animated Fish Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fish 1 - Large swimming left to right */}
        <div className="absolute top-1/4 -left-32 opacity-20 animate-[swim-lr_25s_linear_infinite]">
          <svg width="140" height="70" viewBox="0 0 140 70" className="text-slate-300">
            <path
              d="M15 35 Q25 20 45 25 Q70 30 95 25 Q110 27 120 35 Q110 43 95 45 Q70 40 45 45 Q25 50 15 35 Z M120 35 L135 30 L135 40 Z M20 33 Q10 30 10 35 Q10 40 20 37"
              fill="currentColor"
              opacity="0.6"
            />
            <circle cx="35" cy="33" r="2.5" fill="currentColor" opacity="0.8" />
            <path d="M40 30 Q50 25 60 30 Q50 35 40 30" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Fish 2 - Medium swimming right to left */}
        <div className="absolute top-2/3 -right-24 opacity-15 animate-[swim-rl_30s_linear_infinite_5s]">
          <svg width="100" height="50" viewBox="0 0 100 50" className="text-emerald-300 scale-x-[-1]">
            <path
              d="M85 25 Q75 15 55 18 Q35 22 15 18 Q8 20 5 25 Q8 30 15 32 Q35 28 55 32 Q75 35 85 25 Z M5 25 L-5 22 L-5 28 Z M80 23 Q87 20 87 25 Q87 30 80 27"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="70" cy="23" r="2" fill="currentColor" opacity="0.9" />
            <path d="M60 20 Q70 18 75 23 Q70 25 60 20" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        {/* Fish 3 - Small swimming diagonally up */}
        <div className="absolute bottom-1/4 left-1/4 opacity-25 animate-[swim-diagonal-up_20s_ease-in-out_infinite_3s]">
          <svg width="80" height="40" viewBox="0 0 80 40" className="text-amber-300">
            <path
              d="M8 20 Q16 12 32 14 Q48 16 65 14 Q70 15 75 20 Q70 25 65 26 Q48 24 32 26 Q16 28 8 20 Z M75 20 L85 17 L85 23 Z M12 19 Q5 17 5 20 Q5 23 12 21"
              fill="currentColor"
              opacity="0.8"
            />
            <circle cx="25" cy="19" r="1.5" fill="currentColor" />
            <path d="M30 16 Q38 14 45 19 Q38 21 30 16" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Fish 4 - Tiny fish schooling */}
        <div className="absolute top-1/2 right-1/3 opacity-20 animate-[swim-school_18s_ease-in-out_infinite_7s]">
          <div className="space-y-2">
            <svg width="50" height="25" viewBox="0 0 50 25" className="text-slate-400">
              <path
                d="M5 12 Q10 8 20 9 Q30 10 42 9 Q45 10 47 12 Q45 14 42 15 Q30 14 20 15 Q10 16 5 12 Z M47 12 L52 10 L52 14 Z"
                fill="currentColor"
                opacity="0.9"
              />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
            </svg>
            <svg width="45" height="22" viewBox="0 0 45 22" className="text-slate-400 ml-2">
              <path
                d="M4 11 Q9 8 18 9 Q27 10 38 9 Q41 10 43 11 Q41 13 38 14 Q27 13 18 14 Q9 15 4 11 Z M43 11 L48 9 L48 13 Z"
                fill="currentColor"
                opacity="0.8"
              />
              <circle cx="13" cy="10" r="0.8" fill="currentColor" />
            </svg>
            <svg width="40" height="20" viewBox="0 0 40 20" className="text-slate-400 ml-1">
              <path
                d="M3 10 Q7 7 15 8 Q23 9 32 8 Q34 9 36 10 Q34 12 32 13 Q23 12 15 13 Q7 14 3 10 Z M36 10 L41 8 L41 12 Z"
                fill="currentColor"
                opacity="0.7"
              />
              <circle cx="11" cy="9" r="0.7" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Fish 5 - Another swimming fish with wave motion */}
        <div className="absolute top-3/4 left-1/2 opacity-18 animate-[swim-wave_22s_ease-in-out_infinite_10s]">
          <svg width="90" height="45" viewBox="0 0 90 45" className="text-stone-300">
            <path
              d="M12 22 Q20 14 38 16 Q56 18 75 16 Q80 17 85 22 Q80 27 75 28 Q56 26 38 28 Q20 30 12 22 Z M85 22 L95 19 L95 25 Z M16 21 Q8 19 8 22 Q8 25 16 23"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="30" cy="21" r="1.8" fill="currentColor" opacity="0.8" />
            <path d="M35 18 Q45 16 55 21 Q45 24 35 18" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Bubbles rising */}
        <div className="absolute bottom-1/4 left-1/6 opacity-30">
          <div className="animate-[bubble-rise_12s_ease-in-out_infinite]">
            <svg width="30" height="80" viewBox="0 0 30 80" className="text-slate-200">
              <circle cx="8" cy="70" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="18" cy="55" r="2.5" fill="currentColor" opacity="0.4" />
              <circle cx="12" cy="40" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="22" cy="25" r="1.5" fill="currentColor" opacity="0.4" />
              <circle cx="6" cy="15" r="1" fill="currentColor" opacity="0.3" />
              <circle cx="16" cy="5" r="0.8" fill="currentColor" opacity="0.2" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/5 opacity-25">
          <div className="animate-[bubble-rise_15s_ease-in-out_infinite_4s]">
            <svg width="35" height="90" viewBox="0 0 35 90" className="text-slate-200">
              <circle cx="12" cy="80" r="3.5" fill="currentColor" opacity="0.2" />
              <circle cx="25" cy="65" r="2.8" fill="currentColor" opacity="0.3" />
              <circle cx="18" cy="48" r="2.2" fill="currentColor" opacity="0.4" />
              <circle cx="28" cy="32" r="1.8" fill="currentColor" opacity="0.3" />
              <circle cx="8" cy="20" r="1.2" fill="currentColor" opacity="0.3" />
              <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.2" />
            </svg>
          </div>
        </div>

        {/* Seaweed/kelp animation */}
        <div className="absolute bottom-0 left-1/3 opacity-15 animate-[sway_8s_ease-in-out_infinite]">
          <svg width="40" height="200" viewBox="0 0 40 200" className="text-green-800">
            <path
              d="M20 200 Q15 180 22 160 Q25 140 18 120 Q15 100 25 80 Q28 60 20 40 Q18 20 25 0"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M25 200 Q30 180 23 160 Q20 140 27 120 Q30 100 22 80 Q19 60 27 40 Q29 20 22 0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 right-1/4 opacity-12 animate-[sway_10s_ease-in-out_infinite_2s]">
          <svg width="35" height="180" viewBox="0 0 35 180" className="text-green-700">
            <path
              d="M18 180 Q12 165 20 145 Q24 125 16 105 Q13 85 23 65 Q26 45 18 25 Q16 10 23 0"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              opacity="0.5"
            />
          </svg>
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
