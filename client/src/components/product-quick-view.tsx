import { useState } from "react";
import { X, ShoppingCart, Heart, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@shared/schema";

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [isRotated, setIsRotated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!isOpen) return null;

  const images = product.images ? JSON.parse(product.images as string) : [product.imageUrl];
  const validImages = images.filter(Boolean);
  const currentImage = validImages[currentImageIndex] || product.imageUrl || "/placeholder-product.jpg";

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      toast({
        title: "Přidáno do košíku",
        description: `${product.name} byl přidán do košíku`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se přidat produkt do košíku",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Rychlý náhled</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images with 3D Effect */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/50">
              <div
                className={`w-full h-full transition-transform duration-700 ease-in-out cursor-pointer ${
                  isRotated ? 'transform-gpu rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
                onClick={nextImage}
              >
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                />
              </div>
              
              {/* Rotation Control */}
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleRotation}
                className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              {/* Image Counter */}
              {validImages.length > 1 && (
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm"
                >
                  {currentImageIndex + 1} / {validImages.length}
                </Badge>
              )}
            </div>

            {/* Image Thumbnails */}
            {validImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {validImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(parseFloat(product.price))} Kč
                </span>
                {product.inStock ? (
                  <Badge className="bg-success/20 text-success">Skladem</Badge>
                ) : (
                  <Badge variant="destructive">Vyprodáno</Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div 
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Vlastnosti:</h3>
                <div className="flex flex-wrap gap-2">
                  {JSON.parse(product.features as string).map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Rozměry:</h3>
                <p className="text-muted-foreground">{product.dimensions}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Přidat do košíku' : 'Vyprodáno'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-primary/20 hover:bg-primary/10"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}