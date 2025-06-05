import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
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
    <section className="py-8 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
              onClick={() => 
                onCategoryChange(selectedCategory === category.id ? null : category.id)
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
