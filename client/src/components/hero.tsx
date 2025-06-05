import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Prémiové akvarijní doplňky
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Specializujeme se na kvalitní akvarijní techniku a doplňky. 
              Nabízíme široký sortiment pro sladkovodní i mořská akvária.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 py-3"
                onClick={() => setLocation("/#products")}
              >
                Prohlédnout produkty
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3"
              >
                Kontaktujte nás
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl text-primary mb-4">🐠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Odborné poradenství
              </h3>
              <p className="text-gray-600">
                Pomůžeme vám vybrat správné vybavení pro vaše akvárium
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
