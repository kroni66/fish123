import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (wishlistItemId: number) =>
      apiRequest("DELETE", `/api/wishlist/${wishlistItemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist", sessionId] });
    },
  });

  const checkWishlistMutation = useMutation({
    mutationFn: (productId: number) =>
      apiRequest("GET", `/api/wishlist/${sessionId}/check/${productId}`),
  });

  const addToWishlist = (productId: number) => {
    addToWishlistMutation.mutate(productId);
  };

  const removeFromWishlist = (wishlistItemId: number) => {
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