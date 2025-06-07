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

          {/* Featured Product Story */}
          {displayedProducts.length > 0 && (
            <div className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Produkt měsíce
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-3">
                    {displayedProducts[0].name}
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {displayedProducts[0].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          {onCategoryChange && (
            <div className="mb-16">
              <CategoryFilter 
                selectedCategory={categoryId ?? null}
                onCategoryChange={onCategoryChange}
              />
            </div>
          )}

          {/* Blog-style Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedProducts.map((product, index) => (
              <div key={product.id} className={index === 0 ? "md:col-span-2 lg:col-span-3" : ""}>
                <ProductCard
                  product={product}
                  onProductClick={setSelectedProduct}
                />
              </div>
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
