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
                      <svg className="w-12 h-12 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L14.5 7.5L20 8L15.5 12L17 18L12 15L7 18L8.5 12L4 8L9.5 7.5L12 2Z"/>
                        <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.8"/>
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
                      <svg className="w-12 h-12 text-stone-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3"/>
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                        <path strokeLinecap="round" d="m9 9 3 3m3-3-3 3"/>
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
                      <svg className="w-12 h-12 text-emerald-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582 8 8z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M7 16h10"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6L18 18M18 6L6 18" opacity="0.3"/>
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
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-5.069 5.069A2.25 2.25 0 0113.5 21.25H8.25a2.25 2.25 0 01-2.122-1.5L5.5 17M19.8 14.5l1.45 1.45a2.25 2.25 0 010 3.182l-4.088 4.088A2.25 2.25 0 0115.75 24H8.25a2.25 2.25 0 01-2.25-2.25V19.5"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Testováno</h4>
                  <p className="text-gray-600 text-sm">V reálných podmínkách</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Ekologické</h4>
                  <p className="text-gray-600 text-sm">Šetrné k prostředí</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                  </div>
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
