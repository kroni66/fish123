import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

interface EnhancedSearchProps {
  searchQuery: string;
  categoryId: number | null;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
}

export function EnhancedSearch({ 
  searchQuery, 
  categoryId, 
  onSearchChange, 
  onCategoryChange 
}: EnhancedSearchProps) {
  
  const [tempSearch, setTempSearch] = useState(searchQuery);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(tempSearch);
  };

  const clearSearch = () => {
    setTempSearch("");
    onSearchChange("");
  };

  const clearCategory = () => {
    onCategoryChange(null);
  };

  const hasActiveFilters = categoryId !== null || searchQuery;

  return (
    <div className="space-y-4">
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative">
          {/* Form structure maintained without input field */}
        </form>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                clearSearch();
                clearCategory();
              }}
              className="gap-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Vymazat vše
            </Button>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                Hledání: "{searchQuery}"
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="h-auto p-0 ml-1 text-xs hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {categoryId && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                {categories.find((c) => c.id === categoryId)?.name || 'Kategorie'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCategory}
                  className="h-auto p-0 ml-1 text-xs hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}

        
    </div>
  );
}