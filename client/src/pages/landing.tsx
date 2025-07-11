import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Package, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Global unified radial gradient background system */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
        
        {/* Primary radial gradients - positioned for full page coverage */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,_var(--tw-gradient-stops))] from-cyan-900/40 via-cyan-950/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-stops))] from-blue-900/35 via-blue-950/15 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_var(--tw-gradient-stops))] from-teal-900/25 via-teal-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-cyan-900/30 via-cyan-950/15 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_90%,_var(--tw-gradient-stops))] from-blue-900/25 via-blue-950/12 to-transparent"></div>
        
        {/* Secondary depth gradients for enhanced layering */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_50%_0%,_var(--tw-gradient-stops))] from-cyan-800/15 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_0%_50%,_var(--tw-gradient-stops))] from-blue-800/12 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_80%,_var(--tw-gradient-stops))] from-teal-800/10 via-transparent to-transparent"></div>
        
        {/* Large atmospheric glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-400/6 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-400/8 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/4 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[100px] animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-cyan-900/15 to-transparent blur-2xl"></div>
        
        {/* Dynamic light rays spanning full height */}
        <div className="absolute top-0 left-1/5 w-1 h-full bg-gradient-to-b from-cyan-400/8 via-cyan-400/4 to-transparent transform rotate-12 blur-sm animate-pulse delay-700"></div>
        <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-blue-300/6 via-blue-300/3 to-transparent transform -rotate-8 blur-sm animate-pulse delay-1200"></div>
        <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gradient-to-b from-teal-400/5 via-teal-400/2 to-transparent transform rotate-5 blur-sm animate-pulse delay-1800"></div>
        
        {/* Floating atmospheric particles */}
        <div className="absolute top-1/6 right-1/3 w-40 h-40 bg-cyan-300/4 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-blue-300/6 rounded-full blur-2xl animate-pulse delay-1500"></div>
        <div className="absolute top-5/6 right-1/6 w-28 h-28 bg-teal-300/5 rounded-full blur-xl animate-pulse delay-2500"></div>
        
        {/* Animated bubble streams */}
        <div className="absolute bottom-0 left-1/6 opacity-40">
          <div className="animate-[bubble-rise_8s_ease-out_infinite]">
            <div className="w-3 h-3 bg-cyan-300 rounded-full mb-8 animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full mb-12 animate-pulse delay-500"></div>
            <div className="w-2.5 h-2.5 bg-teal-300 rounded-full mb-6 animate-pulse delay-1000"></div>
            <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse delay-1500"></div>
          </div>
        </div>

        <div className="absolute bottom-0 right-1/4 opacity-35">
          <div className="animate-[bubble-rise_6s_ease-out_infinite_2s]">
            <div className="w-2 h-2 bg-cyan-200 rounded-full mb-10 animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full mb-8 animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-teal-200 rounded-full mb-6 animate-pulse delay-800"></div>
            <div className="w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1200"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 opacity-30">
          <div className="animate-[bubble-rise_10s_ease-out_infinite_4s]">
            <div className="w-2.5 h-2.5 bg-blue-300 rounded-full mb-14 animate-pulse delay-200"></div>
            <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full mb-10 animate-pulse delay-700"></div>
            <div className="w-3 h-3 bg-teal-400 rounded-full mb-8 animate-pulse delay-1100"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse delay-1600"></div>
          </div>
        </div>

        <div className="absolute bottom-0 right-1/6 opacity-25">
          <div className="animate-[bubble-rise_7s_ease-out_infinite_1s]">
            <div className="w-1.5 h-1.5 bg-teal-200 rounded-full mb-12 animate-pulse delay-400"></div>
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full mb-9 animate-pulse delay-900"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full mb-7 animate-pulse delay-1300"></div>
            <div className="w-1 h-1 bg-cyan-200 rounded-full animate-pulse delay-1700"></div>
          </div>
        </div>
      </div>
      {/* Additional floating bubble particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Small floating bubbles with drift animation */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-[bubble-rise_12s_ease-out_infinite] opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/70 rounded-full animate-[bubble-rise_15s_ease-out_infinite_3s] opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-400/50 rounded-full animate-[bubble-rise_9s_ease-out_infinite_6s] opacity-30"></div>
        
        {/* Medium floating bubbles */}
        <div className="absolute top-1/5 right-1/5 w-2.5 h-2.5 bg-cyan-300/40 rounded-full animate-[bubble-rise_14s_ease-out_infinite_1s] opacity-35"></div>
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-blue-300/50 rounded-full animate-[bubble-rise_11s_ease-out_infinite_4s] opacity-45"></div>
        <div className="absolute top-1/2 right-2/3 w-1.5 h-1.5 bg-teal-300/60 rounded-full animate-[bubble-rise_13s_ease-out_infinite_7s] opacity-40"></div>
        
        {/* Large slow-moving bubbles */}
        <div className="absolute top-3/4 left-2/3 w-4 h-4 bg-cyan-400/30 rounded-full animate-[bubble-rise_18s_ease-out_infinite_2s] opacity-25"></div>
        <div className="absolute top-1/6 left-3/4 w-3.5 h-3.5 bg-blue-400/35 rounded-full animate-[bubble-rise_16s_ease-out_infinite_5s] opacity-30"></div>
        
        {/* Animated SVG Fish */}
        <div className="absolute top-1/5 -left-20 opacity-20 animate-[swim-lr_45s_linear_infinite]">
          <svg width="80" height="50" viewBox="0 0 80 50" className="text-cyan-300">
            <path d="M20 25 Q35 15 55 25 Q35 35 20 25 Z" fill="currentColor" opacity="0.6" />
            <circle cx="45" cy="25" r="2" fill="#1e40af" />
            <path d="M15 25 Q8 20 5 25 Q8 30 15 25 Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        <div className="absolute bottom-1/3 -right-20 opacity-15 animate-[swim-rl_35s_linear_infinite_8s] scale-x-[-1]">
          <svg width="60" height="40" viewBox="0 0 60 40" className="text-blue-200">
            <path d="M15 20 Q25 12 40 20 Q25 28 15 20 Z" fill="currentColor" opacity="0.5" />
            <circle cx="32" cy="20" r="1.5" fill="#1e40af" />
            <path d="M10 20 Q5 17 3 20 Q5 23 10 20 Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Bubble streams */}
        <div className="absolute bottom-0 left-1/6 opacity-30">
          <div className="animate-[bubble-rise_8s_ease-out_infinite]">
            <div className="w-2 h-2 bg-cyan-300 rounded-full mb-4 animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full mb-6 animate-pulse delay-500"></div>
            <div className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="absolute bottom-0 right-1/4 opacity-25">
          <div className="animate-[bubble-rise_6s_ease-out_infinite_2s]">
            <div className="w-1 h-1 bg-cyan-200 rounded-full mb-5 animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full mb-4 animate-pulse delay-300"></div>
            <div className="w-1 h-1 bg-teal-200 rounded-full animate-pulse delay-800"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-cyan-500/20 rounded-full backdrop-blur-sm">
              <span className="text-cyan-300 text-sm font-medium">🎣 Nová kolekce rybářského vybavení</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent relative">
                  <span className="animate-gradient-x bg-gradient-to-r from-cyan-200 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                    GREVY
                  </span>
                </span>
                <span className="block bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent mt-2">
                  je nový způsob
                </span>
                <span className="block bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  jak lovit ryby.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                Prémiové rybářské vybavení, které kombinuje moderní technologie 
                s tradicí hlubinného rybolovu. Každý kus je pečlivě vybrán pro maximální úspěch.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Button 
                size="lg" 
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Prohlédnout kolekci
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Equipment Section */}
        <section className="py-32 px-4 relative overflow-hidden z-10">
          {/* Enhanced atmospheric background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_var(--tw-gradient-stops))] from-cyan-900/40 via-cyan-950/20 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_var(--tw-gradient-stops))] from-blue-900/35 via-blue-950/18 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,_var(--tw-gradient-stops))] from-teal-900/25 via-transparent to-transparent"></div>
            
            {/* Underwater current effects */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-pulse delay-500"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/12 to-transparent animate-pulse delay-1500"></div>
            <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-teal-400/10 to-transparent animate-pulse delay-2500"></div>
            
            {/* Floating marine elements */}
            <div className="absolute top-16 right-16 w-24 h-24 opacity-8 animate-pulse delay-1000">
              <svg viewBox="0 0 80 80" className="w-full h-full text-cyan-400">
                <path d="M20 40 Q35 25 55 35 Q40 50 20 40 Z" fill="currentColor" opacity="0.4" />
                <circle cx="45" cy="35" r="2" fill="#0ea5e9" opacity="0.6" />
                <path d="M15 40 Q8 35 5 40 Q8 45 15 40 Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            
            <div className="absolute bottom-20 left-20 w-16 h-16 opacity-6 animate-pulse delay-3000">
              <svg viewBox="0 0 60 60" className="w-full h-full text-teal-400">
                <path d="M15 30 Q25 20 40 25 Q30 40 15 30 Z" fill="currentColor" opacity="0.5" />
                <circle cx="32" cy="26" r="1.5" fill="#14b8a6" opacity="0.7" />
              </svg>
            </div>
            
            {/* Bubble clusters */}
            <div className="absolute top-1/4 left-1/6 opacity-15">
              <div className="w-3 h-3 bg-cyan-300/50 rounded-full animate-pulse delay-2000"></div>
              <div className="w-2 h-2 bg-blue-300/60 rounded-full mt-2 ml-3 animate-pulse delay-2500"></div>
              <div className="w-4 h-4 bg-teal-300/40 rounded-full mt-1 ml-1 animate-pulse delay-3000"></div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/5 opacity-12">
              <div className="w-5 h-5 bg-cyan-400/40 rounded-full animate-pulse delay-3500"></div>
              <div className="w-2 h-2 bg-blue-400/50 rounded-full mt-2 ml-4 animate-pulse delay-4000"></div>
              <div className="w-3 h-3 bg-teal-400/45 rounded-full mt-1 ml-2 animate-pulse delay-4500"></div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              {/* Section badge */}
              <div className="inline-block mb-8">
                <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/25 to-accent/25 border border-primary/40 text-primary text-sm font-semibold tracking-wide uppercase">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Profesionální řada
                </span>
              </div>
              
              {/* Enhanced title */}
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-poppins leading-tight">
                Vybavení pro{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
                    profesionály
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-teal-400/50 rounded-full"></div>
                </span>
              </h2>
              
              {/* Decorative divider */}
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-6 animate-pulse"></div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
              
              {/* Enhanced description */}
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                Objevte naši pečlivě vybranou kolekci, která vás přivede k úspěchu na vodě
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Prémiová kvalita</h3>
                  <p className="text-slate-400">Každý produkt je testován v extrémních podmínkách</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Komunita rybářů</h3>
                  <p className="text-slate-400">Připojte se k tisícům spokojených zákazníků</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Expertní výběr</h3>
                  <p className="text-slate-400">Vybráno profesionálními rybáři pro rybáře</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-slate-700/50">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">10K+</div>
                <div className="text-slate-400">Spokojených rybářů</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-slate-400">Produktů</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-slate-400">Podpora</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">5.0</div>
                <div className="text-slate-400 flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  Hodnocení
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-slate-500 text-sm uppercase tracking-wider mb-8">
              Důvěřují nám profesdionálové z celého světa
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-40 grayscale">
              <div className="text-2xl font-bold text-slate-400">FISH PRO</div>
              <div className="text-2xl font-bold text-slate-400">ANGLER</div>
              <div className="text-2xl font-bold text-slate-400">DEEP SEA</div>
              <div className="text-2xl font-bold text-slate-400">TACKLE</div>
              <div className="text-2xl font-bold text-slate-400">MARINE</div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                Cenové balíčky
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Jednoduché ceny pro každého.
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Vyberte si balíček, který nejlépe vyhovuje vašemu stylu rybaření a rozpočtu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50 relative">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Začátečník</h3>
                    <p className="text-slate-400 mb-6">Pro ty, kteří začínají s rybařením</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">2 990</span>
                      <span className="text-slate-400 ml-2">Kč</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-6 bg-slate-700 hover:bg-slate-600 text-white">
                    Vybrat balíček
                  </Button>
                  
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Základní rybářský prut
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Naviják pro začátečníky
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Základní návnady
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Email podpora
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-gradient-to-b from-cyan-500/10 to-blue-500/5 backdrop-blur border-cyan-500/30 relative scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                    Nejoblíbenější
                  </Badge>
                </div>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Pokročilý</h3>
                    <p className="text-slate-300 mb-6">Pro zkušené rybáře</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">7 990</span>
                      <span className="text-slate-300 ml-2">Kč</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white">
                    Vybrat balíček
                  </Button>
                  
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-slate-200">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Profesionální rybářský prut
                    </li>
                    <li className="flex items-center text-slate-200">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Kvalitní naviják
                    </li>
                    <li className="flex items-center text-slate-200">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Prémiové návnady
                    </li>
                    <li className="flex items-center text-slate-200">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Rybářská taška
                    </li>
                    <li className="flex items-center text-slate-200">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      24/7 podpora
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50 relative">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Profesionál</h3>
                    <p className="text-slate-400 mb-6">Pro profesionální rybáře</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">15 990</span>
                      <span className="text-slate-400 ml-2">Kč</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-6 bg-slate-700 hover:bg-slate-600 text-white">
                    Vybrat balíček
                  </Button>
                  
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Kompletní rybářská sada
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Profesionální vybavení
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Exkluzivní návnady
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Osobní konzultace
                    </li>
                    <li className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      Prioritní podpora
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Přestaňte ztrácet čas při rybaření.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Začněte lovit ryby s profesionálním vybavením, které garantuje úspěch na vodě.
            </p>
            <Button 
              size="lg"
              onClick={() => setLocation('/products')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Začít nakupovat
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}