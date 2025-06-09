import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { CategoryFilter } from "./category-filter";
import { Button } from "./ui/button";
import { UnderwaterLoading, ProductCardSkeleton } from "./loading-animations";
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
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <UnderwaterLoading 
            isLoading={true} 
            message="Načítám produkty z hlubin..." 
            variant="default"
            size="lg"
          />
          
          {/* Skeleton placeholder grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-20 relative">
        {/* Unified radial gradient background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,_var(--tw-gradient-stops))] from-cyan-900/25 via-cyan-950/15 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,_var(--tw-gradient-stops))] from-teal-800/15 via-transparent to-transparent bg-[#fcf4d5]"></div>
        
        {/* Atmospheric depth effects */}
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse delay-500 bg-[#fcf4d5]"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-400/8 rounded-full blur-[80px] animate-pulse delay-1500"></div>
        
        <div className="container mx-auto px-4 relative">
          {/* Category Filter */}
          {onCategoryChange && (
            <div className="mb-12 flex justify-center bg-[#fcf4d5]">
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