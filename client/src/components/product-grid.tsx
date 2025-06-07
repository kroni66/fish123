import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { CategoryFilter } from "./category-filter";
import { Button } from "./ui/button";
import { useMarineAnimations, marinePresets } from "@/hooks/use-marine-animations";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  categoryId?: number | null;
  searchQuery?: string;
  onCategoryChange?: (categoryId: number | null) => void;
}

export function ProductGrid({ categoryId, searchQuery, onCategoryChange }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayCount, setDisplayCount] = useState(8);
  
  // Marine-themed animations
  const { containerVariants, itemVariants, cardVariants } = useMarineAnimations(marinePresets.productGrid);

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
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,theme(colors.primary.500/5)_49%,theme(colors.primary.500/5)_51%,transparent_52%)] bg-[#1d1711]"></div>
        
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
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedProducts.map((product) => (
              <motion.div key={product.id} variants={cardVariants} whileHover="hover">
                <ProductCard
                  product={product}
                  onProductClick={setSelectedProduct}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Editorial Content Block */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-12 mb-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,theme(colors.primary.500/15),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,theme(colors.accent.500/10),transparent_70%)]"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <path d="M20 50 Q 30 30 50 40 Q 70 50 80 35 Q 85 45 75 55 Q 65 65 50 60 Q 35 55 20 50" 
                      fill="currentColor" className="animate-pulse"/>
              </svg>
            </div>
            
            <div className="relative max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h3 className="text-4xl font-bold text-foreground mb-4 font-poppins">
                  Proč si vybrat naše produkty?
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full"></div>
                <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
                  Jsme vášniví rybáři, kteří rozumí potřebám moderního rybaření i tradičním technikám. 
                  Každý produkt testujeme na vlastních výlovech, abychom vám mohli garantovat jeho kvalitu a úspěšnost.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative">
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-foreground mb-3 text-xl">Testováno v praxi</h4>
                    <p className="text-muted-foreground leading-relaxed">Každý produkt prošel důkladným testováním na skutečných výlovech</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-accent/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"/>
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-foreground mb-3 text-xl">Ekologické řešení</h4>
                    <p className="text-muted-foreground leading-relaxed">Vybíráme produkty šetrné k vodnímu prostředí a rybí populaci</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-foreground mb-3 text-xl">Vybráno s láskou</h4>
                    <p className="text-muted-foreground leading-relaxed">Každý kousek je pečlivě vybrán s ohledem na kvalitu a funkčnost</p>
                  </div>
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