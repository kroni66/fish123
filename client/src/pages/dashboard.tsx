import { useState } from "react";
import { Link } from "wouter";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Package, 
  CreditCard,
  Bell,
  LogOut,
  Edit,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/page-transition";
import { MarineBackground } from "@/components/marine-background";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/useWishlist";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/lib/utils";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock order data - in real app this would come from API
  const recentOrders: any[] = [];

  const cartTotal = 0; // Will be calculated when we have access to cart items

  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  return (
    <PageTransition>
      <MarineBackground intensity="low" theme="default" />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Vítejte zpět, {user?.firstName || user?.email}!
                </h1>
                <p className="text-muted-foreground">
                  Spravujte svůj účet a sledujte své objednávky
                </p>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="mt-4 md:mt-0"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásit se
              </Button>
            </div>

            {/* Dashboard Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="overview">Přehled</TabsTrigger>
                <TabsTrigger value="orders">Objednávky</TabsTrigger>
                <TabsTrigger value="wishlist">Seznam přání</TabsTrigger>
                <TabsTrigger value="profile">Profil</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Košík</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatPrice(cartTotal)} Kč</div>
                      <p className="text-xs text-muted-foreground">
                        {itemCount} položek
                      </p>
                      <Link href="/checkout">
                        <Button size="sm" className="mt-2 w-full">
                          Dokončit nákup
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Seznam přání</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{wishlistCount}</div>
                      <p className="text-xs text-muted-foreground">
                        Uložených produktů
                      </p>
                      <Link href="/wishlist">
                        <Button size="sm" variant="outline" className="mt-2 w-full">
                          Zobrazit seznam
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Objednávky</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{recentOrders.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Celkem objednávek
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2 w-full"
                        onClick={() => setActiveTab("orders")}
                      >
                        Zobrazit historie
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Nedávná aktivita</CardTitle>
                    <CardDescription>
                      Vaše poslední aktivity v obchodě
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {itemCount > 0 ? (
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Položky v košíku</p>
                            <p className="text-xs text-muted-foreground">
                              {itemCount} položek připraveno k nákupu
                            </p>
                          </div>
                          <Link href="/checkout">
                            <Button size="sm" variant="outline">
                              Zobrazit
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Žádná nedávná aktivita</p>
                          <Link href="/">
                            <Button size="sm" className="mt-2">
                              Začít nakupovat
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Historie objednávek</CardTitle>
                    <CardDescription>
                      Přehled všech vašich objednávek
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Zatím žádné objednávky</h3>
                      <p className="text-muted-foreground mb-6">
                        Začněte nakupovat a vaše objednávky se zobrazí zde
                      </p>
                      <Link href="/">
                        <Button>Prohlédnout produkty</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Seznam přání</CardTitle>
                    <CardDescription>
                      Vaše oblíbené produkty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlistCount > 0 ? (
                      <div className="space-y-4">
                        {Array.isArray(wishlistItems) && wishlistItems.slice(0, 5).map((item: any) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img
                              src={item.product?.imageUrl || "/placeholder-product.jpg"}
                              alt={item.product?.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(item.product?.price)} Kč
                              </p>
                            </div>
                            <Link href={`/product/${item.product?.slug || item.product?.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Zobrazit
                              </Button>
                            </Link>
                          </div>
                        ))}
                        <Link href="/wishlist">
                          <Button variant="outline" className="w-full">
                            Zobrazit všechny ({wishlistCount})
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Prázdný seznam přání</h3>
                        <p className="text-muted-foreground mb-6">
                          Přidejte produkty do seznamu přání kliknutím na ikonu srdce
                        </p>
                        <Link href="/">
                          <Button>Prohlédnout produkty</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Profil uživatele</CardTitle>
                    <CardDescription>
                      Spravujte své osobní údaje
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {user?.firstName && user?.lastName 
                            ? `${user.firstName} ${user.lastName}`
                            : user?.email
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Jméno</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user?.firstName || "Neuvedeno"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Příjmení</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user?.lastName || "Neuvedeno"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user?.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Člen od</label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('cs-CZ') : "Neuvedeno"}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" disabled>
                        <Edit className="w-4 h-4 mr-2" />
                        Upravit profil
                      </Button>
                      <Button variant="outline" disabled>
                        <Settings className="w-4 h-4 mr-2" />
                        Nastavení
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}