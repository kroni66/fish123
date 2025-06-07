import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";
import { MarineBackground } from "@/components/marine-background";
import { WishlistButton } from "@/components/wishlist-button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistItems, isLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (productId: number, productName: string) => {
    try {
      await addToCart(productId);
      toast({
        title: "Přidáno do košíku",
        description: `${productName} byl přidán do košíku.`,
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se přidat produkt do košíku.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <PageTransition>
        <MarineBackground intensity="medium" theme="default" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Načítám seznam přání...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <MarineBackground intensity="medium" theme="default" />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Můj seznam přání
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Vaše oblíbené produkty uložené pro pozdější nákup
              </p>
            </div>

            {/* Wishlist Items */}
            {!Array.isArray(wishlistItems) || wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Váš seznam přání je prázdný
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Začněte procházet naše produkty a přidávejte své oblíbené položky pomocí ikony srdce.
                </p>
                <Link href="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Prohlédnout produkty
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 overflow-hidden group hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.product?.imageUrl || "/placeholder-product.jpg"}
                        alt={item.product?.name || "Produkt"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Wishlist button in top-right */}
                      <div className="absolute top-4 right-4">
                        <WishlistButton 
                          productId={item.product?.id} 
                          productName={item.product?.name}
                          variant="card"
                        />
                      </div>

                      {/* Price overlay */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <span className="text-primary font-bold text-lg">
                            {formatPrice(item.product?.price)} Kč
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                        {item.product?.name}
                      </h3>
                      <div 
                        className="text-muted-foreground text-sm mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: item.product?.description || '' 
                        }}
                      />

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => handleAddToCart(item.product?.id, item.product?.name)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                          disabled={!item.product?.inStock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {item.product?.inStock ? "Do košíku" : "Nedostupné"}
                        </Button>
                        
                        <Link href={`/product/${item.product?.slug || item.product?.id}`}>
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Back to shopping */}
            {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
              <div className="text-center mt-12">
                <Link href="/">
                  <Button variant="outline" size="lg">
                    Pokračovat v nákupu
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}