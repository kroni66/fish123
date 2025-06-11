import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Tag, Filter } from "lucide-react";
import type { Category } from "@shared/schema";

interface CategoryFilterProps {
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-sm" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Filtrace podle kategorií</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Vyberte kategorii produktů</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Procházejte naše produkty podle kategorií pro snadnější vyhledávání toho, co potřebujete
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {/* All Categories Button */}
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
              selectedCategory === null
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 scale-105"
                : "bg-slate-800/60 border-slate-600/50 text-slate-300 hover:bg-slate-700/60 hover:border-primary/30 hover:text-white"
            }`}
            onClick={() => onCategoryChange(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Všechny produkty</span>
            </div>
          </Button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 scale-105"
                  : "bg-slate-800/60 border-slate-600/50 text-slate-300 hover:bg-slate-700/60 hover:border-primary/30 hover:text-white"
              }`}
              onClick={() => 
                onCategoryChange(selectedCategory === category.id ? null : category.id)
              }
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs">
                    Aktivní
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Selected Category Info */}
        {selectedCategory && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm text-slate-300">Zobrazuji produkty z kategorie:</span>
              <Badge className="bg-primary text-white">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
