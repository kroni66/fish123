import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center group mb-6">
              <div className="relative mr-3">
                <svg 
                  width="44" 
                  height="32" 
                  viewBox="0 0 44 32" 
                  className="group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                >
                  <defs>
                    <linearGradient id="footerFishBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="40%" stopColor="#06b6d4" />
                      <stop offset="80%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                    <linearGradient id="footerFishFinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e7490" />
                      <stop offset="50%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <radialGradient id="footerEyeGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#e0f2fe" />
                      <stop offset="100%" stopColor="#bae6fd" />
                    </radialGradient>
                    <filter id="footerSoftGlow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Main fish body */}
                  <ellipse 
                    cx="24" 
                    cy="16" 
                    rx="15" 
                    ry="9" 
                    fill="url(#footerFishBodyGradient)" 
                    filter="url(#footerSoftGlow)"
                    className="group-hover:brightness-110 transition-all duration-300"
                  />
                  
                  {/* Fish tail */}
                  <path 
                    d="M 9 16 Q 4 8 2 12 Q 4 16 2 20 Q 4 24 9 16" 
                    fill="url(#footerFishFinGradient)"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    opacity="0.9"
                  />
                  
                  {/* Dorsal fin */}
                  <path 
                    d="M 22 7 Q 26 3 32 7 Q 28 9 26 11 Q 24 9 22 7" 
                    fill="url(#footerFishFinGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Ventral fin */}
                  <path 
                    d="M 22 25 Q 26 29 32 25 Q 28 23 26 21 Q 24 23 22 25" 
                    fill="url(#footerFishFinGradient)"
                    opacity="0.8"
                  />
                  
                  {/* Pectoral fin */}
                  <ellipse 
                    cx="18" 
                    cy="20" 
                    rx="3" 
                    ry="6" 
                    fill="url(#footerFishFinGradient)" 
                    opacity="0.6"
                    transform="rotate(25 18 20)"
                  />
                  
                  {/* Eye */}
                  <circle 
                    cx="30" 
                    cy="14" 
                    r="3" 
                    fill="url(#footerEyeGradient)"
                    stroke="#0891b2"
                    strokeWidth="0.5"
                  />
                  <circle 
                    cx="31" 
                    cy="14" 
                    r="2" 
                    fill="#1e40af"
                  />
                  <circle 
                    cx="31.5" 
                    cy="13.5" 
                    r="0.8" 
                    fill="white"
                  />
                  <circle 
                    cx="31.2" 
                    cy="13.8" 
                    r="0.3" 
                    fill="white"
                    opacity="0.7"
                  />
                  
                  {/* Scale pattern */}
                  <g opacity="0.25">
                    <circle cx="16" cy="13" r="1.2" fill="white" />
                    <circle cx="20" cy="11" r="1" fill="white" />
                    <circle cx="20" cy="19" r="1" fill="white" />
                    <circle cx="24" cy="16" r="1.2" fill="white" />
                    <circle cx="27" cy="18" r="0.8" fill="white" />
                  </g>
                  
                  {/* Mouth detail */}
                  <ellipse 
                    cx="36.5" 
                    cy="16" 
                    rx="1.5" 
                    ry="0.8" 
                    fill="#0e7490"
                    opacity="0.6"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AquaStore.cz
              </span>
            </Link>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Specializujeme se na kvalitní rybářské vybavení a doplňky. 
              Váš spolehlivý partner pro úspěšné rybaření s více než 10letou tradicí.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Kategorie
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Všechny produkty
                </Link>
              </li>
              <li>
                <Link href="/?category=1" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pruty a vybavení
                </Link>
              </li>
              <li>
                <Link href="/?category=2" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Návnady a nástrahy
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Naše příběhy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Zákaznický servis
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Seznam přání
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Objednávka
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Kontaktní údaje
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-slate-300">
                <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <a href="mailto:info@aquastore.cz" className="text-sm hover:text-cyan-400 transition-colors">
                    info@aquastore.cz
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-slate-300">
                <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Telefon</p>
                  <a href="tel:+420123456789" className="text-sm hover:text-cyan-400 transition-colors">
                    +420 123 456 789
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-slate-300">
                <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Otevírací doba</p>
                  <p className="text-sm">Po-Pá: 9:00 - 17:00</p>
                  <p className="text-sm">So: 9:00 - 14:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-slate-300">
                <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-3 w-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Adresa</p>
                  <p className="text-sm">Praha, Česká republika</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              &copy; 2024 AquaStore.cz - Kvalitní rybářské vybavení a doplňky. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center space-x-6 text-slate-400 text-xs">
              <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                Ochrana údajů
              </Link>
              <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                Obchodní podmínky
              </Link>
              <Link href="/cookies" className="hover:text-cyan-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </footer>
  );
}
