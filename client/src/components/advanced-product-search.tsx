import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Tag, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Product, Category } from "@shared/schema";

interface AdvancedProductSearchProps {
  onSearchChange: (query: string) => void;
  onProductSelect?: (product: Product) => void;
  className?: string;
}

export function AdvancedProductSearch({ 
  onSearchChange, 
  onProductSelect,
  className = "" 
}: AdvancedProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse recent searches');
      }
    }
  }, []);

  // Search products with debouncing
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['/api/products/search', searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 1) return [];
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to search products');
      return response.json();
    },
    enabled: searchQuery.length >= 1,
  });

  // Get categories for suggestions
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Get popular products
  const { data: popularProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    select: (data: Product[]) => data.slice(0, 4), // Get first 4 as popular
  });

  const typedSearchResults = Array.isArray(searchResults) ? searchResults : [];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery.trim());
      setIsOpen(false);
      // Navigate to products page with search
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Add to recent searches
  const addToRecentSearches = (query: string) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    addToRecentSearches(product.name);
    setIsOpen(false);
    setSearchQuery("");
    onSearchChange("");
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = typedSearchResults.length + recentSearches.length + categories.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          // Handle selection based on index
          if (selectedIndex < typedSearchResults.length) {
            const product = typedSearchResults[selectedIndex];
            handleProductSelect(product);
          }
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    onSearchChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Generate category suggestions based on search
  const suggestedCategories = searchQuery.length > 0 
    ? categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center">
            <div className="absolute left-4 z-10">
              <Search className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors duration-300" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Začněte psát název produktu nebo kategorie..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-12 pr-12 py-4 text-lg bg-slate-800/60 border-slate-600/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary/70 rounded-2xl transition-all duration-300"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 h-8 w-8 p-0 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-primary/10 z-50 max-h-96 overflow-hidden">
          
          {/* Loading State */}
          {isLoading && searchQuery.length > 0 && (
            <div className="p-6 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-slate-400 text-sm">Vyhledávání produktů...</p>
            </div>
          )}

          {/* Product Results */}
          {!isLoading && searchQuery.length > 0 && typedSearchResults.length > 0 && (
            <div className="p-3">
              <div className="mb-3 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Produkty ({typedSearchResults.length})
                  </span>
                </div>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {typedSearchResults.slice(0, 6).map((product: Product, index) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug || product.id}`}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group border ${
                      selectedIndex === index
                        ? 'bg-primary/10 border-primary/20'
                        : 'border-transparent hover:bg-slate-800/60 hover:border-slate-600/30'
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="relative mr-3">
                      <img
                        src={product.imageUrl ?? ''}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium">
                        {product.price} Kč
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2" />
                  </Link>
                ))}
                
                {/* Show More Results */}
                {typedSearchResults.length > 6 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary hover:text-white hover:bg-primary/90 font-medium"
                      onClick={() => {
                        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                        setIsOpen(false);
                      }}
                    >
                      Zobrazit všechny výsledky ({typedSearchResults.length})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Category Suggestions */}
          {searchQuery.length > 0 && suggestedCategories.length > 0 && (
            <div className="border-t border-slate-700/30 p-3">
              <div className="mb-3 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Kategorie
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                {suggestedCategories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center p-3 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group text-left"
                    onClick={() => {
                      window.location.href = `/?category=${category.id}`;
                      setIsOpen(false);
                    }}
                  >
                    <Tag className="w-4 h-4 text-slate-400 mr-3 group-hover:text-primary transition-colors" />
                    <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && searchQuery.length > 0 && typedSearchResults.length === 0 && suggestedCategories.length === 0 && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-slate-300 text-sm font-medium mb-1">Žádné produkty nenalezeny</p>
              <p className="text-slate-400 text-xs">Zkuste jiné klíčové slovo nebo procházejte kategorie</p>
            </div>
          )}

          {/* Recent Searches & Popular Products */}
          {searchQuery.length === 0 && (
            <div className="p-3">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="mb-3 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Nedávná vyhledávání
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center p-3 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group text-left"
                        onClick={() => {
                          setSearchQuery(search);
                          onSearchChange(search);
                        }}
                      >
                        <Clock className="w-4 h-4 text-slate-400 mr-3 group-hover:text-primary transition-colors" />
                        <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Products */}
              {popularProducts.length > 0 && (
                <div>
                  <div className="mb-3 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Oblíbené produkty
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {popularProducts.map((product: Product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug || product.id}`}
                        className="flex items-center p-3 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group"
                        onClick={() => {
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <img
                          src={product.imageUrl ?? ''}
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded-lg mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {recentSearches.length === 0 && popularProducts.length === 0 && (
                <div className="p-6 text-center">
                  <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Začněte psát pro vyhledávání produktů...</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}