import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: number;
  productName?: string;
  className?: string;
  variant?: "default" | "floating" | "card";
}

export function WishlistButton({ 
  productId, 
  productName, 
  className,
  variant = "default" 
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistItem, isAddingToWishlist, isRemovingFromWishlist } = useWishlist();
  const { toast } = useToast();
  const isWished = isInWishlist(productId);
  const wishlistItem = getWishlistItem(productId);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWished && wishlistItem) {
      removeFromWishlist(wishlistItem.id);
      toast({
        title: "Odebráno ze seznamu přání",
        description: productName ? `${productName} byl odebrán ze seznamu přání` : "Produkt byl odebrán ze seznamu přání",
      });
    } else {
      addToWishlist(productId);
      toast({
        title: "Přidáno do seznamu přání",
        description: productName ? `${productName} byl přidán do seznamu přání` : "Produkt byl přidán do seznamu přání",
      });
    }
  };

  const baseClasses = "transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95";
  
  const variantClasses = {
    default: "p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg",
    floating: "fixed bottom-20 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-xl",
    card: "p-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80"
  };

  const iconClasses = {
    default: "w-5 h-5",
    floating: "w-6 h-6",
    card: "w-4 h-4"
  };

  const isLoading = isAddingToWishlist || isRemovingFromWishlist;

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        isWished && "text-red-500",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      title={isWished ? "Odebrat ze seznamu přání" : "Přidat do seznamu přání"}
    >
      <Heart
        className={cn(
          iconClasses[variant],
          isWished && "fill-current",
          isLoading && "animate-pulse"
        )}
      />
    </button>
  );
}