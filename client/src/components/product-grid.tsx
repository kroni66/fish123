import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  categoryId?: number | null;
  searchQuery?: string;
}

export function ProductGrid({ categoryId, searchQuery }: ProductGridProps) {
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
      <section className="py-16" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={setSelectedProduct}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="px-8 py-3 font-medium"
              >
                Načíst více produktů
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
