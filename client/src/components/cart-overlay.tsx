import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";

export function CartOverlay() {
  const { 
    items, 
    total, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem 
  } = useCart();
  const [, setLocation] = useLocation();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  const handleCheckout = () => {
    closeCart();
    setLocation("/checkout");
  };

  const handleContinueShopping = () => {
    closeCart();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl cart-slide-in">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-foreground">
              Nákupní košík ({items.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              className="p-2 hover:bg-muted rounded-lg"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Váš košík je prázdný</p>
                <Button onClick={handleContinueShopping}>
                  Pokračovat v nákupu
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={item.product?.imageUrl || "/placeholder-product.jpg"}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {item.product?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.product?.price}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-foreground">Celkem:</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toFixed(2)} Kč
                </span>
              </div>
              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 mb-3"
                onClick={handleCheckout}
              >
                Přejít k pokladně
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleContinueShopping}
              >
                Pokračovat v nákupu
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
