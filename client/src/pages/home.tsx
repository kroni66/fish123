import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { EnhancedSearch } from "@/components/enhanced-search";
import { CartOverlay } from "@/components/cart-overlay";
import { Footer } from "@/components/footer";

export default function Home() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    } else {
      setSelectedCategory(null);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Enhanced Search Section */}
      <section className="py-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedSearch
            searchQuery={searchQuery}
            categoryId={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <ProductGrid 
        categoryId={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
      />
      <Footer />
      <CartOverlay />
    </div>
  );
}
