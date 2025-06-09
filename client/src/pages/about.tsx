import { Target, Award, Fish, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/fishing-hero.jpg"
            alt="Fishing scene with underwater view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white font-poppins tracking-tight">
              <span className="block text-primary drop-shadow-lg">O NÁS</span>
              <span className="block text-2xl md:text-3xl text-white/80 font-light mt-4 tracking-wide">
                PASSION FOR FISHING
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-lg">
              Více než jen obchod s rybářským oblečením
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-foreground font-poppins">
                  Náš příběh
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Rig of Death vznikl z lásky k rybaření a touhy sdílet tu nejlepší výbavu 
                    s komunitou rybářů. Začínali jsme jako malý blog o rybářských technikách 
                    a postupně jsme se rozrostli v plnohodnotný e-shop.
                  </p>
                  <p>
                    Každý produkt v naší nabídce prošel důkladným testováním na vodě. 
                    Neverkujeme nic, co bychom sami nepoužívali při svých vlastních 
                    rybářských výpravách.
                  </p>
                  <p>
                    Naše mise je jednoduchá: pomoct každému rybáři najít to pravé vybavení 
                    pro jeho styl rybolovu a sdílet vášeň pro tento úžasný sport.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Rybář u vody"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/30">
                  <Fish className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground font-poppins mb-6">
                Naše hodnoty
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Principy, které nás vedou v každodenní práci
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-primary/20 backdrop-blur-sm">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Kvalita</h3>
                  <p className="text-muted-foreground text-sm">
                    Pouze prověřené značky a materiály nejvyšší kvality
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-accent/20 backdrop-blur-sm">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Přesnost</h3>
                  <p className="text-muted-foreground text-sm">
                    Detailní popisy a technické specifikace každého produktu
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-primary/20 backdrop-blur-sm">
                    <Fish className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Tradice</h3>
                  <p className="text-muted-foreground text-sm">
                    Respekt k rybářské kultuře a tradičním technikám
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-accent/20 backdrop-blur-sm">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Vášeň</h3>
                  <p className="text-muted-foreground text-sm">
                    Láska k rybaření je základem všeho, co děláme
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 fishing-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-foreground font-poppins">
              Připojte se k naší komunitě
            </h2>
            <p className="text-xl text-muted-foreground">
              Sdílejte s námi svou vášeň pro rybaření a objevte nové možnosti
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-2xl shadow-2xl"
              >
                Prohlédnout produkty
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 px-12 py-6 text-lg rounded-2xl"
              >
                Kontaktujte nás
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}