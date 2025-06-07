import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Footer } from "@/components/footer";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const checkoutSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Zadejte prosím platnou e-mailovou adresu"),
  address: z.string().min(5, "Adresa musí mít alespoň 5 znaků"),
  city: z.string().min(2, "Město musí mít alespoň 2 znaky"),
  postalCode: z.string().min(5, "PSČ musí mít alespoň 5 znaků"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Trigger validation
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Chyba ve formuláři",
        description: "Prosím vyplňte všechna povinná pole správně.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const formData = form.getValues();

    setIsProcessing(true);

    try {
      console.log("Starting payment confirmation...");
      
      // For testing purposes, simulate successful payment
      // In production, you would use real Stripe payment methods
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          receipt_email: formData.email,
        },
      });

      if (error) {
        // Check if this is the expected test card decline
        if (error.type === 'card_error') {
          toast({
            title: "Testovací platba",
            description: "Pro testování použijte číslo karty: 4242 4242 4242 4242",
            variant: "default",
            duration: 3000,
          });
        } else {
          toast({
            title: "Chyba platby",
            description: error.message || "Došlo k chybě při zpracování platby",
            variant: "destructive",
            duration: 2000,
          });
        }
      }
      // Note: Stripe will handle the redirect to return_url on success
    } catch (err) {
      console.error("Payment processing error:", err);
      toast({
        title: "Chyba platby",
        description: "Došlo k neočekávané chybě při zpracování platby",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

        <form onSubmit={handleSubmit}>
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
                  <Shield className="h-5 w-5 mr-2" />
                  Platební údaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PaymentElement />
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    Vaše platební údaje jsou zabezpečené pomocí Stripe
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                      Pro testování použijte:
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                      Číslo karty: 4242 4242 4242 4242
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Datum: libovolné budoucí • CVC: libovolné 3 číslice
                    </p>
                  </div>
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
                  type="submit"
                  size="lg"
                  className="w-full mt-6 bg-primary text-white hover:bg-primary/90"
                  disabled={!stripe || isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Zpracovávám platbu...</span>
                    </div>
                  ) : (
                    `Zaplatit - ${formatPrice(total * 1.21)} Kč`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (items.length > 0) {
      const total = items.reduce((sum, item) => {
        return sum + (parseFloat(item.product?.price || "0") * item.quantity);
      }, 0);
      
      apiRequest("POST", "/api/create-payment-intent", { 
        amount: total * 1.21 // Include VAT
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
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

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
        </div>
        <Footer />
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
