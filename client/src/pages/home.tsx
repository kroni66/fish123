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
        
        {/* Large Hero Fish - Main Feature */}
        <div className="absolute top-1/2 -left-32 opacity-30 animate-[swim-lr_60s_linear_infinite] z-5">
          <svg width="200" height="120" viewBox="0 0 200 120" className="text-cyan-400 drop-shadow-2xl">
            {/* Main body */}
            <ellipse cx="80" cy="60" rx="45" ry="25" fill="currentColor" opacity="0.7"/>
            {/* Body gradient overlay */}
            <ellipse cx="80" cy="55" rx="35" ry="18" fill="rgb(34, 211, 238)" opacity="0.4"/>
            {/* Tail fin */}
            <path d="M25 60 Q5 40 15 30 Q10 50 5 60 Q10 70 15 90 Q5 80 25 60 Z" fill="currentColor" opacity="0.6" />
            {/* Dorsal fin */}
            <path d="M60 35 Q70 20 85 25 Q90 30 85 35 Q75 40 60 35 Z" fill="currentColor" opacity="0.5" />
            {/* Ventral fin */}
            <path d="M60 85 Q70 100 85 95 Q90 90 85 85 Q75 80 60 85 Z" fill="currentColor" opacity="0.5" />
            {/* Pectoral fins */}
            <ellipse cx="100" cy="50" rx="12" ry="8" fill="currentColor" opacity="0.4" transform="rotate(-30 100 50)"/>
            <ellipse cx="100" cy="70" rx="12" ry="8" fill="currentColor" opacity="0.4" transform="rotate(30 100 70)"/>
            {/* Eye */}
            <circle cx="110" cy="60" r="8" fill="rgb(30, 64, 175)" opacity="0.9" />
            <circle cx="113" cy="57" r="3" fill="white" opacity="0.8" />
            {/* Gill */}
            <path d="M125 55 Q130 60 125 65" stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none"/>
            {/* Body stripes */}
            <path d="M90 45 Q95 60 90 75" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="none"/>
            <path d="M75 40 Q80 60 75 80" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="none"/>
          </svg>
        </div>

        {/* Medium Fish Swimming Opposite Direction */}
        <div className="absolute top-1/3 -right-24 opacity-25 animate-[swim-rl_45s_linear_infinite_15s] scale-x-[-1] z-4">
          <svg width="120" height="80" viewBox="0 0 120 80" className="text-blue-300 drop-shadow-lg">
            {/* Main body */}
            <ellipse cx="60" cy="40" rx="30" ry="18" fill="currentColor" opacity="0.6"/>
            {/* Body highlight */}
            <ellipse cx="60" cy="38" rx="22" ry="12" fill="rgb(147, 197, 253)" opacity="0.3"/>
            {/* Tail */}
            <path d="M30 40 Q15 30 20 25 Q12 35 8 40 Q12 45 20 55 Q15 50 30 40 Z" fill="currentColor" opacity="0.5" />
            {/* Fins */}
            <path d="M50 25 Q55 15 65 20 Q67 25 65 28 Q58 32 50 25 Z" fill="currentColor" opacity="0.4" />
            <path d="M50 55 Q55 65 65 60 Q67 55 65 52 Q58 48 50 55 Z" fill="currentColor" opacity="0.4" />
            {/* Eye */}
            <circle cx="75" cy="40" r="5" fill="rgb(30, 64, 175)" opacity="0.8" />
            <circle cx="77" cy="38" r="2" fill="white" opacity="0.7" />
          </svg>
        </div>

        {/* Small Schooling Fish */}
        <div className="absolute top-2/3 -left-16 opacity-20 animate-[swim-lr_35s_linear_infinite_5s]">
          <svg width="80" height="50" viewBox="0 0 80 50" className="text-teal-300">
            <path d="M20 25 Q35 15 55 25 Q35 35 20 25 Z" fill="currentColor" opacity="0.6" />
            <circle cx="45" cy="25" r="2" fill="#1e40af" />
            <path d="M15 25 Q8 20 5 25 Q8 30 15 25 Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        <div className="absolute bottom-1/4 -right-20 opacity-15 animate-[swim-rl_40s_linear_infinite_20s] scale-x-[-1]">
          <svg width="60" height="40" viewBox="0 0 60 40" className="text-cyan-200">
            <path d="M15 20 Q25 12 40 20 Q25 28 15 20 Z" fill="currentColor" opacity="0.5" />
            <circle cx="32" cy="20" r="1.5" fill="#1e40af" />
            <path d="M10 20 Q5 17 3 20 Q5 23 10 20 Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* School of Small Fish */}
        <div className="absolute top-1/4 -left-20 opacity-18 animate-[swim-school_55s_linear_infinite_10s]">
          <div className="relative">
            <svg width="40" height="25" viewBox="0 0 40 25" className="text-teal-400 absolute">
              <path d="M10 12 Q18 8 28 12 Q18 16 10 12 Z" fill="currentColor" opacity="0.6" />
              <circle cx="22" cy="12" r="1" fill="#1e40af" />
            </svg>
            <svg width="35" height="20" viewBox="0 0 35 20" className="text-cyan-300 absolute top-2 left-3">
              <path d="M8 10 Q15 7 24 10 Q15 13 8 10 Z" fill="currentColor" opacity="0.5" />
              <circle cx="18" cy="10" r="0.8" fill="#1e40af" />
            </svg>
            <svg width="38" height="22" viewBox="0 0 38 22" className="text-blue-300 absolute top-1 left-6">
              <path d="M9 11 Q16 8 26 11 Q16 14 9 11 Z" fill="currentColor" opacity="0.4" />
              <circle cx="20" cy="11" r="0.9" fill="#1e40af" />
            </svg>
          </div>
        </div>

        {/* Deep Sea Fish - Larger and More Mysterious */}
        <div className="absolute top-3/4 -right-28 opacity-20 animate-[swim-wave_70s_linear_infinite_25s] scale-x-[-1]">
          <svg width="160" height="100" viewBox="0 0 160 100" className="text-blue-400 drop-shadow-xl">
            {/* Main body - more elongated */}
            <ellipse cx="70" cy="50" rx="40" ry="20" fill="currentColor" opacity="0.5"/>
            {/* Body highlight */}
            <ellipse cx="70" cy="47" rx="30" ry="14" fill="rgb(59, 130, 246)" opacity="0.3"/>
            {/* Large tail */}
            <path d="M30 50 Q10 35 18 25 Q8 40 3 50 Q8 60 18 75 Q10 65 30 50 Z" fill="currentColor" opacity="0.4" />
            {/* Dorsal fin */}
            <path d="M55 30 Q65 18 80 22 Q85 28 80 32 Q70 38 55 30 Z" fill="currentColor" opacity="0.3" />
            {/* Large eye */}
            <circle cx="90" cy="50" r="6" fill="rgb(30, 64, 175)" opacity="0.7" />
            <circle cx="92" cy="48" r="2.5" fill="white" opacity="0.6" />
            {/* Bioluminescent spots */}
            <circle cx="65" cy="45" r="1.5" fill="rgb(34, 211, 238)" opacity="0.8" className="animate-pulse" />
            <circle cx="75" cy="52" r="1" fill="rgb(34, 211, 238)" opacity="0.6" className="animate-pulse delay-500" />
            <circle cx="80" cy="46" r="1.2" fill="rgb(34, 211, 238)" opacity="0.7" className="animate-pulse delay-1000" />
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
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            {/* Premium animated badge */}
            <div className="relative group">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/25 to-teal-500/20 blur-xl rounded-full scale-110 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Main badge */}
              <div className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800/90 via-slate-700/80 to-slate-800/90 border border-cyan-400/40 rounded-full backdrop-blur-lg shadow-2xl hover:shadow-cyan-400/20 transition-all duration-300 group-hover:scale-105">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Content */}
                <div className="relative flex items-center space-x-3">
                  {/* Animated fish icon */}
                  <div className="w-5 h-5 relative">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      <path d="M12 2C8.5 2 5.5 4.5 5.5 8c0 2 1 4 2.5 5.5L12 18l4-4.5c1.5-1.5 2.5-3.5 2.5-5.5 0-3.5-3-6-6.5-6z" fill="currentColor" opacity="0.7"/>
                      <circle cx="12" cy="8" r="2" fill="currentColor"/>
                      <path d="M2 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3z" fill="currentColor" opacity="0.5"/>
                      <path d="M18 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3z" fill="currentColor" opacity="0.5"/>
                    </svg>
                    {/* Subtle pulse animation */}
                    <div className="absolute inset-0 bg-cyan-400/30 rounded-full animate-ping opacity-20"></div>
                  </div>
                  
                  {/* Enhanced text */}
                  <span className="bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                    Nová kolekce rybářského vybavení
                  </span>
                  
                  {/* Subtle arrow indicator */}
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Inner highlight */}
                <div className="absolute inset-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-1 left-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-blue-400/50 rounded-full animate-pulse delay-1500"></div>
            </div>

            {/* Main Heading with enhanced effects */}
            <div className="space-y-6 relative">
              {/* Glow effects behind text */}
              <div className="absolute inset-0 blur-3xl opacity-30">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
                  <span className="block text-cyan-400">RIG OF DEATH</span>
                  <span className="block text-white mt-2">je nový způsob</span>
                  <span className="block text-blue-400">jak lovit ryby.</span>
                </h1>
              </div>
              
              {/* Main text */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter relative">
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent relative">
                  <span className="animate-gradient-x bg-gradient-to-r from-cyan-200 via-blue-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
                    RIG OF DEATH
                  </span>
                </span>
                <span className="block bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent mt-2 drop-shadow-lg">
                  je nový způsob
                </span>
                <span className="block bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                  jak lovit ryby.
                </span>
              </h1>
            </div>
              
            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
              Prémiové rybářské vybavení, které kombinuje moderní technologie 
              s tradicí hlubinného rybolovu. Každý kus je pečlivě vybrán pro maximální úspěch.
            </p>

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
        <section className="py-32 px-4 relative overflow-hidden">
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

            {/* Enhanced feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <Card className="relative bg-gradient-to-br from-slate-800/80 via-slate-850/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 group overflow-hidden">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 text-center relative">
                  {/* Enhanced icon container */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-cyan-400/30">
                      <Package className="h-10 w-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    {/* Floating particles around icon */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse delay-1000"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">Prémiová kvalita</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    Každý produkt je testován v extrémních podmínkách hlubinného rybolovu
                  </p>
                </CardContent>
              </Card>

              <Card className="relative bg-gradient-to-br from-slate-800/80 via-slate-850/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 group overflow-hidden">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 text-center relative">
                  {/* Enhanced icon container */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500/25 to-cyan-500/25 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-teal-400/30">
                      <Users className="h-10 w-10 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
                    </div>
                    {/* Floating particles around icon */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-teal-400/40 rounded-full animate-pulse delay-700"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse delay-1200"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-100 transition-colors duration-300">Komunita rybářů</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    Připojte se k tisícům spokojených zákazníků z celého světa
                  </p>
                </CardContent>
              </Card>

              <Card className="relative bg-gradient-to-br from-slate-800/80 via-slate-850/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-500 group overflow-hidden">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 text-center relative">
                  {/* Enhanced icon container */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/25 to-cyan-500/25 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-blue-400/30">
                      <Award className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    {/* Floating particles around icon */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse delay-900"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse delay-1400"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">Expertní výběr</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    Vybráno profesionálními rybáři pro nejnáročnější podmínky
                  </p>
                </CardContent>
              </Card>
            </div>

            
          </div>
        </section>
      </div>

      {/* Enhanced Search Section */}
      <div className="relative z-10">
        <EnhancedSearch
          searchQuery={searchQuery}
          categoryId={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Products Section */}
      <div id="products" className="relative z-10">
        <ProductGrid 
          categoryId={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      {/* Footer Section */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
