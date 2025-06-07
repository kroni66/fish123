import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { CategoryFilter } from "./category-filter";
import { Button } from "./ui/button";
import type { Product } from "@/types";

interface ProductGridProps {
  categoryId?: number | null;
  searchQuery?: string;
  onCategoryChange?: (categoryId: number | null) => void;
}

export function ProductGrid({ categoryId, searchQuery, onCategoryChange }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayCount, setDisplayCount] = useState(8);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', categoryId],
    queryFn: async () => {
      const url = categoryId 
        ? `/api/products?categoryId=${categoryId}` 
        : '/api/products';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    !searchQuery || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayedProducts.length < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  // Reset display count when category or search changes
  useEffect(() => {
    setDisplayCount(8);
  }, [categoryId, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  return (
    <>
      <section id="products" className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.primary.500/10),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.accent.500/10),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,theme(colors.primary.500/5)_49%,theme(colors.primary.500/5)_51%,transparent_52%)]"></div>
        
        <div className="container mx-auto px-4 relative">
          {/* Category Filter */}
          {onCategoryChange && (
            <div className="mb-12 flex justify-center">
              <CategoryFilter
                selectedCategory={categoryId ?? null}
                onCategoryChange={onCategoryChange}
              />
            </div>
          )}

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