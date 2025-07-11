import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { UnderwaterPageTransition } from "@/components/loading-animations";
import { usePageTransitions } from "@/hooks/use-page-transitions";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Inspiration from "@/pages/inspiration";
import Wishlist from "@/pages/wishlist";
import Dashboard from "@/pages/dashboard";
import ProductDetail from "@/pages/product-detail";
import Checkout from "@/pages/checkout";
import OrderConfirmation from "@/pages/order-confirmation";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  const { isTransitioning } = usePageTransitions();
  
  return (
    <>
      <UnderwaterPageTransition isTransitioning={isTransitioning} />
      
      <AnimatePresence mode="wait">
        <PageTransition key={location}>
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/inspiration" component={Inspiration} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/product/:slug" component={ProductDetail} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order-confirmation" component={OrderConfirmation} />
            <Route path="/order-confirmation/:id" component={OrderConfirmation} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <CartProvider>
            <Navbar />
            <Router />
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
