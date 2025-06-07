import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="py-24 fishing-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground font-poppins tracking-tight">
              <span className="block text-primary drop-shadow-lg">KONTAKT</span>
              <span className="block text-2xl md:text-3xl text-muted-foreground font-light mt-4 tracking-wide">
                GET IN TOUCH
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed">
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
                    Kontaktní informace
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Jsme tu pro vás. Neváhejte se na nás obrátit s jakýmkoliv dotazem 
                    ohledně našich produktů nebo rybářských technik.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-primary/20">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">info@rigofdeath.cz</p>
                        <p className="text-muted-foreground">obchod@rigofdeath.cz</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-accent/20">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                        <p className="text-muted-foreground">+420 777 123 456</p>
                        <p className="text-muted-foreground text-sm">Po-Pá 8:00-17:00</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-primary/20">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Adresa</h3>
                        <p className="text-muted-foreground">Rybářská 123</p>
                        <p className="text-muted-foreground">110 00 Praha 1</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-accent/20">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Otevírací doba</h3>
                        <p className="text-muted-foreground">Po-Pá: 8:00-17:00</p>
                        <p className="text-muted-foreground">So: 9:00-14:00</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Section */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Často kladené otázky
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Jak dlouho trvá dodání?</h4>
                      <p className="text-muted-foreground text-sm">
                        Standardní dodání trvá 2-3 pracovní dny. Expresní dodání do 24 hodin.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Můžu vrátit zboží?</h4>
                      <p className="text-muted-foreground text-sm">
                        Ano, máte 14 dní na vrácení zboží v původním stavu.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Poskytujete technickou podporu?</h4>
                      <p className="text-muted-foreground text-sm">
                        Samozřejmě! Naši experti vám rádi poradí s výběrem i použitím produktů.
                      </p>
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