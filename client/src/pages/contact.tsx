import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe, Fish, Users, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Zpráva odeslána",
      description: "Děkujeme za vaši zprávu. Ozveme se vám co nejdříve.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/a709df9b-ef08-437a-9d37-fc888e437c5e_1749500116955.jpg"
            alt="Fishing scene with underwater view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white font-poppins tracking-tight">
              <span className="block text-blue-400 drop-shadow-lg">KONTAKT</span>
              <span className="block text-2xl md:text-3xl text-white/80 font-light mt-4 tracking-wide">
                GET IN TOUCH
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-lg">
              Máte otázky? Rádi vám poradíme s výběrem vybavení
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground font-poppins">
                      Napište nám
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Vyplňte formulář a my se vám ozveme do 24 hodin
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Jméno *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-background/50 border-border"
                            placeholder="Vaše jméno"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-background/50 border-border"
                            placeholder="vas@email.cz"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Předmět *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="bg-background/50 border-border"
                          placeholder="Předmět vaší zprávy"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Zpráva *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-background/50 border-border resize-none"
                          placeholder="Vaše zpráva..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-2xl shadow-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Odesílám...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="h-5 w-5" />
                            <span>Odeslat zprávu</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground font-poppins mb-6">
                    Kontaktní údaje
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Jsme tu pro vás. Neváhejte se na nás obrátit s jakýmkoliv dotazem 
                    ohledně našich produktů nebo rybářských technik.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Fish className="w-3 h-3" />
                      Odborní poradci
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Ověřené produkty
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Rychlé dodání
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email kontakt */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          Email komunikace
                          <Badge variant="outline" className="text-xs">Preferováno</Badge>
                        </h3>
                        <div className="space-y-1">
                          <p className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            <a href="mailto:info@rigofdeath.cz">info@rigofdeath.cz</a>
                          </p>
                          <p className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                            <a href="mailto:obchod@rigofdeath.cz">obchod@rigofdeath.cz</a>
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-2">
                            Odpovídáme do 2 hodin v pracovní době
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Telefonní kontakt */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          Telefonní podpora
                          <Badge variant="outline" className="text-xs">Okamžitě</Badge>
                        </h3>
                        <div className="space-y-1">
                          <p className="text-muted-foreground hover:text-accent transition-colors cursor-pointer text-lg font-medium">
                            <a href="tel:+420777123456">+420 777 123 456</a>
                          </p>
                          <p className="text-sm text-muted-foreground">Po-Pá 8:00-17:00</p>
                          <p className="text-xs text-muted-foreground/70">
                            Technická podpora a poradenství
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* WhatsApp/Messenger */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                        <MessageCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          WhatsApp chat
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">Nové</Badge>
                        </h3>
                        <div className="space-y-1">
                          <p className="text-muted-foreground hover:text-green-500 transition-colors cursor-pointer">
                            <a href="https://wa.me/420777123456" target="_blank" rel="noopener noreferrer">
                              +420 777 123 456
                            </a>
                          </p>
                          <p className="text-sm text-muted-foreground">Rychlé dotazy a rady</p>
                          <p className="text-xs text-muted-foreground/70">
                            Dostupné 7 dní v týdnu
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fyzická pobočka */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          Prodejna a sklad
                          <Badge variant="outline" className="text-xs">Osobní odběr</Badge>
                        </h3>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Rybářská 123</p>
                          <p className="text-muted-foreground">110 00 Praha 1</p>
                          <p className="text-xs text-muted-foreground/70 mt-2">
                            Možnost vyzkoušení produktů
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Otevírací doba */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 sm:col-span-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex p-3 rounded-full bg-accent/20">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-4">Otevírací doba</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Prodejna</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Po-Pá: 8:00-17:00</p>
                                <p>So: 9:00-14:00</p>
                                <p>Ne: Zavřeno</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Telefonní podpora</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Po-Pá: 8:00-18:00</p>
                                <p>So: 9:00-15:00</p>
                                <p>Ne: Jen urgentní případy</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Online chat</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Po-Ne: 24/7</p>
                                <p className="text-xs text-green-600">● Právě online</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced FAQ Section */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Často kladené otázky
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Odpovědi na nejčastější dotazy našich zákazníků
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Truck className="w-4 h-4 text-primary" />
                            Jak dlouho trvá dodání?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Standardní dodání: 2-3 pracovní dny<br />
                            Expresní dodání: do 24 hodin<br />
                            <span className="text-xs text-primary">Sledování zásilky v reálném čase</span>
                          </p>
                        </div>
                        
                        <div className="border-l-4 border-accent pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-accent" />
                            Můžu vrátit zboží?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            14 dní na vrácení v původním stavu<br />
                            Bezplatné vrácení při vadě<br />
                            <span className="text-xs text-accent">Garančí servis až 3 roky</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Fish className="w-4 h-4 text-primary" />
                            Poskytujete rybářské poradenství?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Odborní poradci s 10+ lety praxe<br />
                            Konzultace výběru vybavení zdarma<br />
                            <span className="text-xs text-primary">Doporučení podle typu rybolovu</span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-green-500" />
                            Máte prodejna také online?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Kompletní sortiment online<br />
                            Rezervace na pobočce možná<br />
                            <span className="text-xs text-green-600">Osobní vyzkoušení před koupí</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-accent pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-accent" />
                            Jaké jsou způsoby platby?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Platba kartou, bankovní převod<br />
                            PayPal, Apple Pay, Google Pay<br />
                            <span className="text-xs text-accent">Platba při osobním odběru</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-primary" />
                            Jak rychle odpovídáte na dotazy?
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Email: do 2 hodin v pracovní době<br />
                            WhatsApp: okamžitě (7 dní v týdnu)<br />
                            <span className="text-xs text-primary">Telefon: přímé spojení s odborníkem</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Services Section */}
                    <div className="border-t border-border/50 pt-6 mt-6">
                      <h4 className="font-semibold text-foreground mb-4 text-center">
                        Další služby pro zákazníky
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">Záruka kvality</p>
                          <p className="text-xs text-muted-foreground">Až 3 roky</p>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">Doprava zdarma</p>
                          <p className="text-xs text-muted-foreground">Od 1500 Kč</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">Věrnostní program</p>
                          <p className="text-xs text-muted-foreground">Slevy až 15%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <Fish className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">Servis vybavení</p>
                          <p className="text-xs text-muted-foreground">Údržba a opravy</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}