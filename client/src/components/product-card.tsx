import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
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
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se přidat položku do košíku. Zkuste to prosím znovu.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group product-card-hover cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow ${
            isLiked ? "text-red-500" : "text-foreground"
          }`}
          onClick={handleLikeToggle}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        </Button>
        {product.inStock && (
          <Badge className="absolute top-4 left-4 bg-success text-white">
            Skladem
          </Badge>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 px-4 py-2 font-medium"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Přidávám...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Do košíku</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
