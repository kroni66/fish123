import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="ocean-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Premium Fish Accessories
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Transform your aquarium into an underwater paradise
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            onClick={() => setLocation("/#products")}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
