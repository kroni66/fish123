import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import greyLogoPath from "@assets/Grevy logo.svg";

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
              <div className="relative">
                <img 
                  src={greyLogoPath}
                  alt="Grevy Logo"
                  className="h-10 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                />
              </div>
            </Link>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Specializujeme se na prémiové rybářské oblečení a funkční textil. 
              Kvalitní materiály a moderní technologie pro pohodlné rybaření za každého počasí.
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
                  <a href="mailto:info@grevy.cz" className="text-sm hover:text-cyan-400 transition-colors">
                    info@grevy.cz
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
              &copy; 2024 Grevy - Prémiové rybářské oblečení a funkční textil. Všechna práva vyhrazena.
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
