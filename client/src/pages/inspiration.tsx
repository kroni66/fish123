import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, Fish, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Article, ArticleCategory } from "@shared/schema";

interface BlogPost extends Article {
  date: string;
  image: string;
}

export default function Inspiration() {
  const [selectedCategory, setSelectedCategory] = useState("Všechny");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Fetch articles from Directus
  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["/api/articles", selectedCategory === "Všechny" ? undefined : selectedCategory],
    retry: false,
  });

  // Fetch article categories from Directus
  const { data: articleCategories = [] } = useQuery({
    queryKey: ["/api/article-categories"],
    retry: false,
  });

  // Transform articles to blog posts format
  const blogPosts: BlogPost[] = (articles as Article[]).map((article: Article) => ({
    ...article,
    date: article.createdAt ? new Date(article.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    image: article.imageUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Create categories list including "Všechny" and categories from Directus
  const categories = ["Všechny", ...(articleCategories as ArticleCategory[]).map((cat: ArticleCategory) => cat.name)];

  const filteredPosts = selectedCategory === "Všechny" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Show loading state while articles are being fetched
  if (articlesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              className="mb-8 text-muted-foreground hover:text-foreground"
            >
              ← Zpět na články
            </Button>
            
            <article className="space-y-8">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary">{selectedPost.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins leading-tight">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedPost.date).toLocaleDateString('cs-CZ')}</span>
                  </div>
                  <span>{selectedPost.readTime} min čtení</span>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {selectedPost.excerpt}
                </p>
                <div 
                  className="text-muted-foreground leading-relaxed space-y-4 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-em:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 fishing-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground font-poppins tracking-tight">
              <span className="block text-primary drop-shadow-lg">INSPIRACE</span>
              <span className="block text-2xl md:text-3xl text-muted-foreground font-light mt-4 tracking-wide">
                FISHING STORIES
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed">
              Články, tipy a příběhy od zkušených rybářů
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : "border-border text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Featured Article */}
            {filteredPosts.length > 0 && (
              <Card className="mb-16 bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto">
                    <img 
                      src={filteredPosts[0].image} 
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="bg-primary/20 text-primary mb-4 w-fit">
                      Doporučujeme
                    </Badge>
                    <h2 className="text-3xl font-bold text-foreground font-poppins mb-4 leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{filteredPosts[0].author}</span>
                        <span>•</span>
                        <span>{filteredPosts[0].readTime} min</span>
                      </div>
                      <Button 
                        onClick={() => setSelectedPost(filteredPosts[0])}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Číst článek
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <Badge className="bg-primary/20 text-primary text-xs">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime} min</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Tips Section */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-foreground font-poppins text-center mb-12">
                Rychlé tipy pro lepší úlovky
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                  <CardContent className="p-8 space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-primary/20">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Přesné nahazování</h3>
                    <p className="text-muted-foreground text-sm">
                      Trénujte přesnost nahazování každý den. Označte si cíl a snažte se ho trefit z různých vzdáleností.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                  <CardContent className="p-8 space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-accent/20">
                      <Fish className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Studium ryb</h3>
                    <p className="text-muted-foreground text-sm">
                      Pozorujte chování ryb v různých ročních obdobích a přizpůsobte tomu svou taktiku.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                  <CardContent className="p-8 space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-primary/20">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Kvalitní vybavení</h3>
                    <p className="text-muted-foreground text-sm">
                      Investujte do kvalitního vybavení. Dobré nástroje vám ušetří čas a zvýší šance na úspěch.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}