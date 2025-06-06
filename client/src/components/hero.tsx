import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Vítejte v našem světě akvaristiky
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Každé akvárium<br />
            <span className="text-primary">vyprávělo příběh</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Objevte s námi kouzlo podvodního světa. Naše pečlivě vybrané produkty 
            pomohou vytvořit jedinečný ekosystém, který bude radost sledovat každý den.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
            <div className="text-3xl mb-3">🌊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Přírodní krása</h3>
            <p className="text-gray-600 text-sm">Produkty inspirované přírodou</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
            <div className="text-3xl mb-3">🐠</div>
            <h3 className="font-semibold text-gray-800 mb-2">Zdravé prostředí</h3>
            <p className="text-gray-600 text-sm">Pro spokojené a zdravé ryby</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="font-semibold text-gray-800 mb-2">Prémiová kvalita</h3>
            <p className="text-gray-600 text-sm">Výběr těch nejlepších materiálů</p>
          </div>
        </div>

        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={() => setLocation("/#products")}
        >
          Začít objevovat
        </Button>
      </div>
    </section>
  );
}
