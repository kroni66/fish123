import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { WishlistItem, InsertWishlistItem } from "@shared/schema";

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

export function useWishlist() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const {
    data: wishlistItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/wishlist", sessionId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/wishlist/${sessionId}`);
      return Array.isArray(response) ? response : [];
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: number) => {
      const wishlistItem: InsertWishlistItem = {
        sessionId,
        productId,
      };
      return apiRequest("POST", "/api/wishlist", wishlistItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist", sessionId] });
      toast({
        title: "Přidáno do seznamu přání",
        description: "Produkt byl úspěšně přidán do vašeho seznamu přání.",
      });
    },
    onError: (error: any) => {
      if (error.message?.includes("401") || error.message?.includes("requireAuth")) {
        toast({
          title: "Ověření vyžadováno",
          description: "Pro přidání do seznamu přání musíte být ověřeni pomocí tokenu.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Chyba",
          description: "Nepodařilo se přidat produkt do seznamu přání.",
          variant: "destructive",
        });
      }
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (wishlistItemId: number) =>
      apiRequest("DELETE", `/api/wishlist/${wishlistItemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist", sessionId] });
      toast({
        title: "Odebráno ze seznamu přání",
        description: "Produkt byl úspěšně odebrán z vašeho seznamu přání.",
      });
    },
    onError: (error: any) => {
      if (error.message?.includes("401") || error.message?.includes("requireAuth")) {
        toast({
          title: "Ověření vyžadováno",
          description: "Pro správu seznamu přání musíte být ověřeni pomocí tokenu.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Chyba",
          description: "Nepodařilo se odebrat produkt ze seznamu přání.",
          variant: "destructive",
        });
      }
    },
  });

  const checkWishlistMutation = useMutation({
    mutationFn: (productId: number) =>
      apiRequest("GET", `/api/wishlist/${sessionId}/check/${productId}`),
  });

  const addToWishlist = (productId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Ověření vyžadováno",
        description: "Pro přidání do seznamu přání musíte být ověřeni pomocí tokenu.",
        variant: "destructive",
      });
      return;
    }
    addToWishlistMutation.mutate(productId);
  };

  const removeFromWishlist = (wishlistItemId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Ověření vyžadováno",
        description: "Pro správu seznamu přání musíte být ověřeni pomocí tokenu.",
        variant: "destructive",
      });
      return;
    }
    removeFromWishlistMutation.mutate(wishlistItemId);
  };

  const isInWishlist = (productId: number) => {
    return Array.isArray(wishlistItems) && wishlistItems.some((item: any) => item.productId === productId);
  };

  const getWishlistItem = (productId: number) => {
    return Array.isArray(wishlistItems) ? wishlistItems.find((item: any) => item.productId === productId) : undefined;
  };

  return {
    wishlistItems,
    isLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItem,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
  };
}