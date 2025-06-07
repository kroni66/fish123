import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { CategoryFilter } from "./category-filter";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  categoryId?: number | null;
  searchQuery?: string;
  onCategoryChange?: (categoryId: number | null) => void;
}

export function ProductGrid({ categoryId, searchQuery, onCategoryChange }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayCount, setDisplayCount] = useState(8);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: searchQuery 
      ? ["/api/products/search", { q: searchQuery }]
      : ["/api/products", categoryId ? { categoryId } : {}],
    enabled: true,
  });

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = products.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  if (isLoading) {
    return (
      <section className="py-16" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse mb-4 w-3/4" />
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-muted rounded animate-pulse w-20" />
                    <div className="h-10 bg-muted rounded animate-pulse w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {searchQuery ? "Nebyly nalezeny žádné produkty" : "Žádné produkty nejsou k dispozici"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `Nebyly nalezeny žádné produkty odpovídající vašemu hledání "${searchQuery}"`
                : "Zkuste to znovu později, až budou k dispozici nové produkty"
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 bg-background" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Introduction */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              Objevte naše<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">pečlivě vybrané</span> produkty
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Každý produkt v naší kolekci prošel důkladným testováním na rybách a byl vybrán 
              pro svou kvalitu, spolehlivost a schopnost přinést úspěch u vody.
            </p>
          </div>



          {/* Category Filter */}
          {onCategoryChange && (
            <div className="mb-16">
              <CategoryFilter 
                selectedCategory={categoryId ?? null}
                onCategoryChange={onCategoryChange}
              />
            </div>
          )}

          {/* Core Values Section */}
          <div className="mb-24 relative">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Naše hodnoty</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tři pilíře, na kterých stavíme každý produkt v našem sortimentu
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Prémiová kvalita */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-amber-900/95 to-amber-800/95 backdrop-blur-sm rounded-3xl p-10 text-center border border-amber-700/30 hover:border-amber-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/25 group-hover:-translate-y-2">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-300/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-amber-200/30 to-amber-300/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-amber-400/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-amber-100 mb-6 tracking-tight">Prémiová kvalita</h3>
                    <p className="text-amber-200/90 leading-relaxed text-lg">
                      Vybíráme pouze ty nejlepší materiály a komponenty, které prošly důkladným testováním v nejnáročnějších podmínkách.
                    </p>
                    <div className="mt-8 pt-6 border-t border-amber-600/30">
                      <div className="flex items-center justify-center space-x-2 text-amber-300/80">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-sm font-medium">Ověřeno našimi experty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Přesnost */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-500/20 to-stone-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-stone-800/95 to-stone-700/95 backdrop-blur-sm rounded-3xl p-10 text-center border border-stone-600/30 hover:border-stone-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-900/25 group-hover:-translate-y-2">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-stone-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-stone-300/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-stone-200/30 to-stone-300/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-stone-400/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-stone-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-stone-100 mb-6 tracking-tight">Přesnost</h3>
                    <p className="text-stone-200/90 leading-relaxed text-lg">
                      Každý detail je pečlivě promyšlen a vyladěn pro maximální účinnost. Preciznost, která rozhoduje o úspěchu.
                    </p>
                    <div className="mt-8 pt-6 border-t border-stone-600/30">
                      <div className="flex items-center justify-center space-x-2 text-stone-300/80">
                        <div className="w-2 h-2 bg-stone-400 rounded-full"></div>
                        <span className="text-sm font-medium">Vyladěno do detailu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tradice */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-emerald-900/95 to-emerald-800/95 backdrop-blur-sm rounded-3xl p-10 text-center border border-emerald-700/30 hover:border-emerald-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/25 group-hover:-translate-y-2">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-300/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-emerald-200/30 to-emerald-300/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-emerald-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H9V3H15L19,7V9H21M5,7V9H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19V19H5V7M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-emerald-100 mb-6 tracking-tight">Tradice</h3>
                    <p className="text-emerald-200/90 leading-relaxed text-lg">
                      Respektujeme osvědčené metody předávané generacemi rybářů a spojujeme je s moderními inovacemi.
                    </p>
                    <div className="mt-8 pt-6 border-t border-emerald-600/30">
                      <div className="flex items-center justify-center space-x-2 text-emerald-300/80">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-sm font-medium">Generace zkušeností</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={setSelectedProduct}
              />
            ))}
          </div>

          {/* Editorial Content Block */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Proč si vybrat naše produkty?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Jsme vášniví rybáři, kteří rozumí potřebám moderního rybaření i tradičním technikám. 
                Každý produkt testujeme na vlastních výlovech, abychom vám mohli garantovat jeho kvalitu a úspěšnost.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔬</div>
                  <h4 className="font-semibold text-gray-800 mb-1">Testováno</h4>
                  <p className="text-gray-600 text-sm">V reálných podmínkách</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌱</div>
                  <h4 className="font-semibold text-gray-800 mb-1">Ekologické</h4>
                  <p className="text-gray-600 text-sm">Šetrné k prostředí</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💝</div>
                  <h4 className="font-semibold text-gray-800 mb-1">S láskou</h4>
                  <p className="text-gray-600 text-sm">Vybráno s péčí</p>
                </div>
              </div>
            </div>
          </div>

          {hasMore && (
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="px-12 py-4 font-medium rounded-full border-2 hover:bg-primary hover:text-white transition-all"
              >
                Objevit další produkty
              </Button>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
