import { useState, useEffect } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SearchFilters {
  query: string;
  category: number | null;
  priceRange: [number, number];
  minRating: number;
  features: string[];
  inStockOnly: boolean;
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
  categories: Array<{ id: number; name: string; slug: string }>;
}

const AVAILABLE_FEATURES = [
  "Vodotěsné",
  "LED osvětlení", 
  "Bluetooth",
  "Solární napájení",
  "Mobilní aplikace",
  "GPS tracking",
  "Automatické",
  "Přenosné",
  "Bezdrátové"
];

export function AdvancedSearch({ onFiltersChange, currentFilters, categories }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = localFilters.features;
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    handleFilterChange('features', newFeatures);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: "",
      category: null,
      priceRange: [0, 10000],
      minRating: 0,
      features: [],
      inStockOnly: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = [
    localFilters.category !== null,
    localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 10000,
    localFilters.minRating > 0,
    localFilters.features.length > 0,
    localFilters.inStockOnly
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Hledat produkty..."
          value={localFilters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtry
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtry produktů</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Vymazat vše
                </Button>
              </div>

              <Separator />

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Kategorie</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={localFilters.category === null}
                      onCheckedChange={(checked) => {
                        if (checked) handleFilterChange('category', null);
                      }}
                    />
                    <Label>Všechny kategorie</Label>
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={localFilters.category === category.id}
                        onCheckedChange={(checked) => {
                          if (checked) handleFilterChange('category', category.id);
                        }}
                      />
                      <Label>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Cenové rozpětí</Label>
                <div className="px-2">
                  <Slider
                    value={localFilters.priceRange}
                    onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{localFilters.priceRange[0]} Kč</span>
                    <span>{localFilters.priceRange[1]} Kč</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label>Minimální hodnocení</Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={localFilters.minRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange('minRating', rating)}
                    >
                      {rating === 0 ? "Vše" : `${rating}+`}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Features Filter */}
              <div className="space-y-2">
                <Label>Vlastnosti</Label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        checked={localFilters.features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <Label className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Stock Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={localFilters.inStockOnly}
                  onCheckedChange={(checked) => handleFilterChange('inStockOnly', checked)}
                />
                <Label>Pouze skladem</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear All Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Vymazat filtry
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {localFilters.category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.id === localFilters.category)?.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => handleFilterChange('category', null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 10000) && (
            <Badge variant="secondary" className="gap-1">
              {localFilters.priceRange[0]} - {localFilters.priceRange[1]} Kč
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => handleFilterChange('priceRange', [0, 10000])}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {localFilters.minRating > 0 && (
            <Badge variant="secondary" className="gap-1">
              {localFilters.minRating}+ hvězd
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => handleFilterChange('minRating', 0)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {localFilters.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="gap-1">
              {feature}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => handleFeatureToggle(feature)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {localFilters.inStockOnly && (
            <Badge variant="secondary" className="gap-1">
              Skladem
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={() => handleFilterChange('inStockOnly', false)}
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