import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { CheckCircle, ArrowLeft, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/page-transition";
import { Footer } from "@/components/footer";
import { useLocation } from "wouter";

export default function OrderConfirmation() {
  const [, params] = useRoute("/order-confirmation/:id");
  const [, setLocation] = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    // Get payment status from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntentStatus = urlParams.get('payment_intent_status');
    const paymentIntentId = urlParams.get('payment_intent');
    
    if (paymentIntentStatus) {
      setPaymentStatus(paymentIntentStatus);
    }

    // Clear URL parameters for cleaner URL
    if (paymentIntentStatus || paymentIntentId) {
      window.history.replaceState({}, '', '/order-confirmation');
    }
  }, []);

  const isSuccessful = paymentStatus === 'succeeded';

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-8">
          {isSuccessful ? (
            <>
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground font-poppins mb-4">
                Platba byla úspěšná!
              </h1>
              <p className="text-lg text-muted-foreground">
                Děkujeme za vaši objednávku. Brzy vám pošleme potvrzení na e-mail.
              </p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground font-poppins mb-4">
                Zpracováváme vaši objednávku
              </h1>
              <p className="text-lg text-muted-foreground">
                Vaše objednávka je v pořádku a zpracováváme ji.
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Co bude dál?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Potvrzení objednávky</p>
                  <p className="text-sm text-muted-foreground">
                    Brzy vám pošleme e-mail s potvrzením objednávky a sledovacím číslem.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Zpracování</p>
                  <p className="text-sm text-muted-foreground">
                    Vaše objednávka bude zpracována do 1-2 pracovních dnů.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Doručení</p>
                  <p className="text-sm text-muted-foreground">
                    Produkty vám doručíme do 3-5 pracovních dnů zdarma.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Potřebujete pomoc?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Máte-li jakékoli dotazy ohledně vaší objednávky, neváhejte nás kontaktovat.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>E-mail:</strong> objednavky@rybarskepotřeby.cz
                </p>
                <p className="text-sm">
                  <strong>Telefon:</strong> +420 123 456 789
                </p>
                <p className="text-sm">
                  <strong>Otevírací doba:</strong> Po-Pá 9:00-17:00
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLocation("/contact")}
              >
                Kontaktovat podporu
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Pokračovat v nákupu
          </Button>
        </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}