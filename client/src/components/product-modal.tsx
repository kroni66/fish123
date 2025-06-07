import { useState, useEffect } from "react";
import { X, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { ProductReviews } from "@/components/product-reviews";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl || "/placeholder-product.jpg"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 modal-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-card backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-4">
                <img
                  src={images[selectedImageIndex]}
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-border"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-foreground font-poppins">
                  {product.name}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)} Kč
                </span>
                {product.inStock && (
                  <Badge className="bg-success text-white">
                    Skladem
                  </Badge>
                )}
              </div>

              <Tabs defaultValue="details" className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Popis produktu</TabsTrigger>
                  <TabsTrigger value="reviews">Hodnocení</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Popis</h3>
                    <div 
                      className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.description || '' }}
                    />
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Vlastnosti</h3>
                      <ul className="text-muted-foreground space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.dimensions && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Rozměry</h3>
                      <p className="text-muted-foreground">{product.dimensions}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-4">
                  <ProductReviews productId={product.id} />
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-foreground">Množství:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center text-foreground">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      className="w-10 h-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </div>
                    ) : (
                      "Přidat do košíku"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`px-6 ${isLiked ? "text-red-500 border-red-500" : ""}`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
