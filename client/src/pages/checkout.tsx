import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Zadejte prosím platnou e-mailovou adresu"),
  address: z.string().min(5, "Adresa musí mít alespoň 5 znaků"),
  city: z.string().min(2, "Město musí mít alespoň 2 znaky"),
  postalCode: z.string().min(5, "PSČ musí mít alespoň 5 znaků"),
  cardNumber: z.string().min(16, "Číslo karty musí mít 16 číslic"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Datum platnosti musí být ve formátu MM/RR"),
  cvv: z.string().min(3, "CVV musí mít alespoň 3 číslice"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      clearCart();
      toast({
        title: "Objednávka byla úspěšně odeslána!",
        description: `Vaše objednávka č. ${order.id} byla potvrzena.`,
      });
      setLocation(`/order-confirmation/${order.id}`);
    },
    onError: () => {
      toast({
        title: "Chyba",
        description: "Nepodařilo se odeslat objednávku. Zkuste to prosím znovu.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Košík je prázdný",
        description: "Před dokončením objednávky přidejte položky do košíku.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get session ID
      const sessionId = localStorage.getItem("cart_session_id") || "anonymous";

      // Prepare order data
      const orderItems = items.map(item => ({
        productId: item.productId!,
        name: item.product?.name || "Unknown Product",
        price: item.product?.price || "0",
        quantity: item.quantity,
      }));

      const orderData = {
        sessionId,
        total: formatPrice(total),
        items: orderItems,
        customerInfo: {
          name: data.name,
          email: data.email,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
        },
        status: "potvrzeno",
      };

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      await createOrderMutation.mutateAsync(orderData);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Váš košík je prázdný</h1>
            <p className="text-muted-foreground mb-8">
              Před dokončením objednávky přidejte produkty do košíku.
            </p>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Pokračovat v nákupu
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zpět na produkty
        </Button>

        <h1 className="text-3xl font-bold text-foreground font-poppins mb-8">
          Pokladna
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Doručovací údaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Celé jméno</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-destructive" : ""}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">E-mailová adresa</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className={form.formState.errors.email ? "border-destructive" : ""}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Adresa</Label>
                  <Input
                    id="address"
                    {...form.register("address")}
                    className={form.formState.errors.address ? "border-destructive" : ""}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Město</Label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      className={form.formState.errors.city ? "border-destructive" : ""}
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">PSČ</Label>
                    <Input
                      id="postalCode"
                      {...form.register("postalCode")}
                      className={form.formState.errors.postalCode ? "border-destructive" : ""}
                    />
                    {form.formState.errors.postalCode && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Platební údaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Číslo karty</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    {...form.register("cardNumber")}
                    className={form.formState.errors.cardNumber ? "border-destructive" : ""}
                  />
                  {form.formState.errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.cardNumber.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Datum platnosti</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/RR"
                      {...form.register("expiryDate")}
                      className={form.formState.errors.expiryDate ? "border-destructive" : ""}
                    />
                    {form.formState.errors.expiryDate && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      {...form.register("cvv")}
                      className={form.formState.errors.cvv ? "border-destructive" : ""}
                    />
                    {form.formState.errors.cvv && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  Vaše platební údaje jsou zabezpečené a šifrované
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shrnutí objednávky</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                          Množství: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-foreground">
                        {formatPrice((parseFloat(item.product?.price || "0")) * item.quantity)} Kč
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mezisouhrn</span>
                    <span>{formatPrice(total)} Kč</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Doprava</span>
                    <span className="text-success">ZDARMA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>DPH</span>
                    <span>{formatPrice(total * 0.21)} Kč</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Celkem</span>
                    <span className="text-primary">{formatPrice(total * 1.21)} Kč</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-6 bg-primary text-white hover:bg-primary/90"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Zpracovávám...</span>
                    </div>
                  ) : (
                    `Dokončit objednávku - ${formatPrice(total * 1.21)} Kč`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
