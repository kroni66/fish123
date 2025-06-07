import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, ThumbsUp, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatDistanceToNow } from "date-fns";
import { cs } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  productId: number;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customerName: "",
    customerEmail: "",
    rating: 5,
    title: "",
    comment: "",
  });

  // Log when component mounts
  useEffect(() => {
    console.log(`[REVIEW] ProductReviews component mounted for product ${productId}:`, {
      productId,
      timestamp: new Date().toISOString(),
      action: 'component_mount'
    });
  }, [productId]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/products", productId, "reviews"],
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      // Log review submission attempt
      console.log(`[REVIEW] Submitting review for product ${productId}:`, {
        customerName: reviewData.customerName,
        rating: reviewData.rating,
        titleLength: reviewData.title?.length || 0,
        commentLength: reviewData.comment?.length || 0,
        timestamp: new Date().toISOString(),
        productId
      });
      
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reviewData, productId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log(`[REVIEW] Successfully submitted review for product ${productId}:`, {
        reviewId: data?.id,
        customerName: reviewForm.customerName,
        rating: reviewForm.rating,
        timestamp: new Date().toISOString(),
        productId
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId, "reviews"] });
      setShowReviewForm(false);
      setReviewForm({
        customerName: "",
        customerEmail: "",
        rating: 5,
        title: "",
        comment: "",
      });
      toast({
        title: "Recenze byla přidána",
        description: "Děkujeme za vaši recenzi!",
      });
    },
    onError: (error) => {
      console.error(`[REVIEW] Failed to submit review for product ${productId}:`, {
        error: error?.message || 'Unknown error',
        customerName: reviewForm.customerName,
        rating: reviewForm.rating,
        timestamp: new Date().toISOString(),
        productId
      });
      
      toast({
        title: "Chyba",
        description: "Nepodařilo se přidat recenzi. Zkuste to prosím znovu.",
        variant: "destructive",
      });
    },
  });

  const markHelpfulMutation = useMutation({
    mutationFn: (reviewId: number) => {
      console.log(`[REVIEW] Marking review ${reviewId} as helpful:`, {
        reviewId,
        productId,
        timestamp: new Date().toISOString(),
        action: 'mark_helpful'
      });
      
      return apiRequest(`/api/reviews/${reviewId}/helpful`, "PATCH");
    },
    onSuccess: (data, reviewId) => {
      console.log(`[REVIEW] Successfully marked review ${reviewId} as helpful:`, {
        reviewId,
        productId,
        timestamp: new Date().toISOString(),
        newHelpfulCount: data?.helpful || 'unknown'
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId, "reviews"] });
    },
    onError: (error, reviewId) => {
      console.error(`[REVIEW] Failed to mark review ${reviewId} as helpful:`, {
        error: error?.message || 'Unknown error',
        reviewId,
        productId,
        timestamp: new Date().toISOString()
      });
    },
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(`[REVIEW] Form submission attempted for product ${productId}:`, {
      formData: {
        customerName: reviewForm.customerName,
        hasEmail: !!reviewForm.customerEmail,
        rating: reviewForm.rating,
        titleLength: reviewForm.title.length,
        commentLength: reviewForm.comment.length
      },
      validation: {
        isValid: reviewForm.customerName && reviewForm.customerEmail && reviewForm.title && reviewForm.comment,
        missingFields: [
          !reviewForm.customerName && 'customerName',
          !reviewForm.customerEmail && 'customerEmail', 
          !reviewForm.title && 'title',
          !reviewForm.comment && 'comment'
        ].filter(Boolean)
      },
      timestamp: new Date().toISOString(),
      productId
    });
    
    createReviewMutation.mutate(reviewForm);
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
              interactive && "cursor-pointer hover:text-yellow-400"
            )}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="h-32 bg-muted rounded animate-pulse" />
        <div className="h-32 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Hodnocení zákazníků</span>
            <Button
              onClick={() => {
                const newState = !showReviewForm;
                console.log(`[REVIEW] Review form toggle:`, {
                  productId,
                  action: newState ? 'open_form' : 'close_form',
                  previousState: showReviewForm,
                  newState,
                  timestamp: new Date().toISOString()
                });
                setShowReviewForm(newState);
              }}
              variant="outline"
              size="sm"
            >
              Napsat recenzi
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "recenze" : "recenzí"})
              </span>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Zatím žádné recenze</p>
              <p className="text-sm">Buďte první, kdo napíše recenzi!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Napsat recenzi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Jméno *</Label>
                  <Input
                    id="customerName"
                    value={reviewForm.customerName}
                    onChange={(e) => {
                      console.log(`[REVIEW] User input - customerName changed:`, {
                        productId,
                        field: 'customerName',
                        valueLength: e.target.value.length,
                        timestamp: new Date().toISOString()
                      });
                      setReviewForm(prev => ({ ...prev, customerName: e.target.value }));
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={reviewForm.customerEmail}
                    onChange={(e) => {
                      console.log(`[REVIEW] User input - customerEmail changed:`, {
                        productId,
                        field: 'customerEmail',
                        hasValue: !!e.target.value,
                        timestamp: new Date().toISOString()
                      });
                      setReviewForm(prev => ({ ...prev, customerEmail: e.target.value }));
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Hodnocení *</Label>
                {renderStars(reviewForm.rating, true, (rating) => {
                  console.log(`[REVIEW] Rating changed:`, {
                    productId,
                    previousRating: reviewForm.rating,
                    newRating: rating,
                    timestamp: new Date().toISOString(),
                    action: 'rating_change'
                  });
                  setReviewForm(prev => ({ ...prev, rating }));
                })}
              </div>

              <div>
                <Label htmlFor="title">Nadpis recenze *</Label>
                <Input
                  id="title"
                  value={reviewForm.title}
                  onChange={(e) => {
                    console.log(`[REVIEW] User input - title changed:`, {
                      productId,
                      field: 'title',
                      valueLength: e.target.value.length,
                      timestamp: new Date().toISOString()
                    });
                    setReviewForm(prev => ({ ...prev, title: e.target.value }));
                  }}
                  placeholder="Stručný nadpis vaší recenze"
                  required
                />
              </div>

              <div>
                <Label htmlFor="comment">Vaše hodnocení *</Label>
                <Textarea
                  id="comment"
                  value={reviewForm.comment}
                  onChange={(e) => {
                    console.log(`[REVIEW] User input - comment changed:`, {
                      productId,
                      field: 'comment',
                      valueLength: e.target.value.length,
                      wordCount: e.target.value.split(/\s+/).filter(word => word.length > 0).length,
                      timestamp: new Date().toISOString()
                    });
                    setReviewForm(prev => ({ ...prev, comment: e.target.value }));
                  }}
                  placeholder="Podělte se o své zkušenosti s tímto produktem..."
                  rows={4}
                  required
                  className="custom-scrollbar resize-y min-h-[100px] max-h-[300px]"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createReviewMutation.isPending}
                >
                  {createReviewMutation.isPending ? "Odesílám..." : "Odeslat recenzi"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Zrušit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.title}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Ověřený nákup
                        </Badge>
                      )}
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {review.customerName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                        locale: cs,
                      })}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{review.comment}</p>

                <Separator />

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markHelpfulMutation.mutate(review.id)}
                    disabled={markHelpfulMutation.isPending}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    Užitečné ({review.helpful || 0})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}