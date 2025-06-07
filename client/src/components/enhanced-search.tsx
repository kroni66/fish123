import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSearch, setTempSearch] = useState(searchQuery);

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: () => apiRequest("/api/categories"),
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Hledat produkty, značky, kategorie..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            className="pl-12 pr-12 h-12 text-lg border-gray-300 focus:border-primary"
          />
          {tempSearch && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </form>

        {/* Filter Toggle and Active Filters */}
        <div className="flex items-center justify-between">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtry
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {[categoryId !== null].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Filtry produktů</h3>
                
                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Kategorie</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={categoryId === null}
                        onCheckedChange={(checked) => {
                          if (checked) onCategoryChange(null);
                        }}
                      />
                      <Label className="text-sm">Všechny kategorie</Label>
                    </div>
                    {categories.map((category: any) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          checked={categoryId === category.id}
                          onCheckedChange={(checked) => {
                            if (checked) onCategoryChange(category.id);
                          }}
                        />
                        <Label className="text-sm">{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    onCategoryChange(null);
                    setIsFilterOpen(false);
                  }}
                  className="w-full"
                >
                  Vymazat všechny filtry
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear All Button */}
          {hasActiveFilters && (
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
          )}
        </div>

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
                {categories.find((c: any) => c.id === categoryId)?.name || 'Kategorie'}
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

        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500 mb-3">Oblíbená hledání:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['návnady', 'háčky', 'vlasce', 'pruty', 'navijáky'].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempSearch(term);
                    onSearchChange(term);
                  }}
                  className="text-xs px-3 py-1 h-auto rounded-full"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}