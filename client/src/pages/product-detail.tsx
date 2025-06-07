import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartOverlay } from "@/components/cart-overlay";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/slug/${params.slug}`],
    enabled: !!params.slug,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-xl animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded animate-pulse" />
              <div className="h-6 bg-muted rounded animate-pulse w-32" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        </div>
        <CartOverlay />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
        <CartOverlay />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl || "/placeholder-product.jpg"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            <h1 className="text-3xl font-bold text-foreground font-poppins mb-4">
              {product.name}
            </h1>

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

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Features</h3>
                  <ul className="text-muted-foreground space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.dimensions && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Dimensions</h3>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
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
                  disabled={!product.inStock}
                >
                  Add to Cart
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
      <Footer />
      <CartOverlay />
    </div>
  );
}
