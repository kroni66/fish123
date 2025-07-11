import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/wishlist-button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    try {
      await addToCart(product.id);
      toast({
        title: "Přidáno do košíku",
        description: `${product.name} byl přidán do vašeho košíku.`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se přidat položku do košíku. Zkuste to prosím znovu.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <article 
      className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group cursor-pointer border border-border/50 hover:border-primary/30 transform hover:-translate-y-2"
      onClick={() => onProductClick(product)}
    >
      <div className="relative">
        <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
          <img
            src={product.imageUrl || "https://via.placeholder.com/600x450?text=Product"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {product.inStock ? (
            <div className="absolute top-4 left-4">
              <span className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-emerald-400 transition-colors duration-200">
                Skladem
              </span>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                Nedostupné
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <WishlistButton 
              productId={product.id} 
              productName={product.name}
              variant="card"
            />
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <span className="text-primary font-bold text-lg">
                {formatPrice(product.price)} Kč
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <div 
            className="text-muted-foreground leading-relaxed text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Klikněte pro detail
          </div>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Přidávám</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>{product.inStock ? "Koupit" : "Nedostupné"}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
